import fs from "fs";

export type NixFileOptions = {
    contents: string
} | {
    filename: string
}

export const START = '# NIX_COMMENT_UPDATER_START'
export const END = '# NIX_COMMENT_UPDATER_END'

export const REGEX_START = new RegExp(`^([ \t]*)${START} (.*)( {{{)?$`)
export const REGEX_END = new RegExp(`^[ \t]*${END}( }}})?$`)

export type  UpdateBlockFunction<J> = (o: {
        region: {
            contents: string,
            lines: string[]
            s: string
            filename?: string,
        }
        json: J
    } & any) => Promise<string|void|"skip">

export class NixFile {

    public originalContents: string
    public split_contents: string[]
    public filename?: string

    constructor(public o: NixFileOptions) {
        if ('filename' in o){
            this.filename = o.filename
            this.originalContents = fs.readFileSync(this.filename, 'utf8')
        } else {
            this.originalContents = o.contents
        }

        const lines = this.originalContents.split("\n")

        this.split_contents = []

        let append: string[] = []
        const f = () => {
            this.split_contents.push(append.join("\n"))
            append = []
        }

        let phase: "outside" | "inside" = "outside"

        for (let v of lines) {
            // console.log("line", v);
            const a = () => append.push(v)
            if (phase == "outside" && REGEX_START.test(v)){
                f(); phase = "inside"
            }
            if (phase == "inside" && REGEX_END.test(v)){
                a(); f();
                phase = "outside"
                continue;
            }
            a()
        }
        f()

        if (phase == "inside") throw `missing ${END}`

        // console.log("split_contents", this.split_contents);
        // console.log("split_contents", this.split_contents.length);
    }

    public contents(){
        return this.split_contents.join("\n")
    }

    public write(){
        fs.writeFileSync(this.filename!, this.contents())
    }

    public async update_blocks(
        updaters: UpdateBlockFunction<any>[],
        preprocessors: Array<(s: string) => string>
    ){

        const promises = this.split_contents.map( async (s,i) => {
            if (i % 2 == 0){
            } else {
                for (let p of  preprocessors || []) {
                    s = p(s)
                }
                const lines = s.split("\n")
                const g = lines[0].match(REGEX_START)
                if (!g) throw 'unexpected'
                const indent = g[1]
                const json_str = g[2]

                // console.log("lines", lines);
                // console.log("json_str", json_str);


                let json
                try {
                    json = JSON.parse(json_str);
                } catch (e){
                    throw `bad json ${json_str} err: ${e}`
                }

                const contents = lines.slice(1, lines.length - 1)


                let new_contents: string | void | "skip"

                for (let updater of updaters) {
                    new_contents = await updater({
                        region: {
                            s,
                            lines,
                            indent,
                            contents,
                            filename: this.filename,
                        },
                        json
                    })
                    if (new_contents == "skip") break;
                    if (new_contents) break;
                }
                if (!new_contents || new_contents == "skip"){
                    new_contents = contents.join("\n")
                }

                this.split_contents[i] =
                    lines[0]
                    +"\n"+new_contents.split("\n").map((x) => `${indent}${x}`).join("\n")
                    +"\n"+lines[lines.length-1]
            }
        })
        await Promise.all(promises)
    }

}
