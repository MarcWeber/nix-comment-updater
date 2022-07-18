import { NixFile, UpdateBlockFunction } from "../src";
import { ArgumentParser } from "argparse";
import * as git from "./updater/git";
import * as github from "./updater/github";
import * as nixpkgs_ruby_overlay from "./updater/nixpkgs-ruby-overlay";
import * as vim_with_vam_executable from "./updater/vim-with-vam-executable";
import * as ruby_marc_key from "./updater/ruby-marc-key";
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
            git.updater,
            github.updater,
            nixpkgs_ruby_overlay.updater,
            vim_with_vam_executable.updater,
            ruby_marc_key.updater,
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
