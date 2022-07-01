import { NixFile, UpdateBlockFunction } from "../src";
import { ArgumentParser } from "argparse";
import { git_updater } from "./updater/git";
import { github_updater } from "./updater/github";
import { ruby_marc_updater } from "./updater/ruby-marc";
import scalar_limiter from "utils-scalar-limiter";

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
    p.add_argument('-f', '--filter',  {type: 'string', 'help': `only update those whose key matches regex r -f key=r`})
    p.add_argument('-p', '--parallel', {type: 'int', 'help': `how many updaters to run in paraller`})
    p.add_argument("args", {nargs: "*"})

    const args = parser.parse_args();

    const filter_match =
        args.filter
        ? (j:any) => {
            const s = args.filter.split('=')
            return new RegExp(s[1]).test((j[s[0]]))
        }
        : (j: any) => true

    if (args.main_action === "update") {
        const files = args.args

        const updaters: UpdateBlockFunction<any>[] = [
            // async (o) => filter_match(o) ? "skip" : undefined,
            git_updater,
            github_updater,
            ruby_marc_updater
        ]

        const limiter = scalar_limiter({available: args.parallel})

        const promises = files.map(async (filename: string) => {
            const f = new NixFile({ filename })
            const do_work = () => f.update_blocks(updaters)
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
