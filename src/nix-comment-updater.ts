import { NixFile, UpdateBlockFunction } from "../src";
import { ArgumentParser } from "argparse";
import * as git from "./updater/git";
import * as github from "./updater/github";
import * as nixpkgs_ruby_overlay from "./updater/nixpkgs-ruby-overlay";
import * as vim_with_vam_executable from "./updater/vim-with-vam-executable";
import * as ruby_marc_key from "./updater/ruby-marc-key";
import * as pypi from "./updater/pypi";
import * as fetchurl from "./updater/fetchurl";
import * as pecl from "./updater/pecl";
import scalar_limiter from "u-scalar-limiter";


const main = async () => {

    const parser = new ArgumentParser({
        add_help: true,
        description: `nix-updater based using commented regions with simple JSON configuration`,
        // version: "0.0.1",
    });

    const sp = parser.add_subparsers({
        title: "sub commands",
        dest: "main_action",
    })


    const p = sp.add_parser("update", {add_help: true})
    p.add_argument('-f', '--filter',  {type: 'string', 'help': `only update those whose key matches regex r -f key=r or just r to match any value which is often good enough`})
    p.add_argument('-p', '--parallel', {type: 'int', 'help': `how many updaters to run in paraller`})
    p.add_argument("args", {nargs: "*"})

    const args = parser.parse_args();

    const filter_match: (j: {json: any}) => boolean =
        args.filter
        ?  (() => {
             const s = args.filter.split('=')
            console.log("splitted");
            console.log(s);
             if (s.length == 2){
                 const r = new RegExp(s[1])
                 return (j:any) => r.test((j.json[s[0]]))
             } else {
                 const r = new RegExp(s[0])
                 return (j:any) => !!(Object.values(j.json).find((x: any) => r.test(x) ))
             }
         })()
        : (j) => true

    if (args.main_action === "update") {
        const files = args.args

        const updaters: UpdateBlockFunction<any>[] = [
            // async (o) => filter_match(o) ? undefined : "skip",
            async (o) => {
                const r = filter_match(o) ? undefined : "skip"
                console.log(`fitted ${JSON.stringify(o, undefined, 2)} `);
                console.log(r);
                return r
            },
            git.updater,
            github.updater,
            nixpkgs_ruby_overlay.updater,
            vim_with_vam_executable.updater,
            ruby_marc_key.updater,
            pypi.updater,
            fetchurl.updater,
            pecl.updater,
        ]

        const limiter = scalar_limiter({available: args.parallel})

        const promises = files.map(async (filename: string) => {
            console.log("opening ", filename);
            const f = new NixFile({ filename })

            const do_work = () => f.update_blocks(updaters, [
                (s) => s.replace('ruby_marc_key', 'nixpkgs_ruby_overlay')
            ])

            if (args.parallel){
                await limiter.with_lock(do_work)
            } else {
                await do_work()
            }
            f.write()
        })


        await Promise.all(promises)
    } else {
        console.log("See --help");
    }
}
main().then(
    x => console.log(x),
    x => console.log(x)
)
