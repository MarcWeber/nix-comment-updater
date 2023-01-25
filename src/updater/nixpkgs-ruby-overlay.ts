// see https://github.com/MarcWeber/nixpkgs-ruby-overlay
import { UpdateBlockFunction } from ".."
import spawn from "utils-spawn";
import { action } from "../utils"
import fs from "fs";
import {nixpkgs_executable, NIX_PATH} from "utils-nix";

export type NixpkgsRubyOverlayJson = {

    "nixpkgs-ruby-overlay": string,

    ruby_version?: string

    // the packages you need eg ['
    deps: string[],

    // sometimes some dependencies are missing others. you can use deps_patches to add them
    // { :deps => [ ['unicode'], [ 'xapian-full'], ['sup'], ['gpgme'], ['rake'], ['syck'], ['gettext'], ['ncursesw'], ['curses'], ['iconv'] ], :deps_patches => {'sup' => ['xapian-ruby'], 'xapian-ruby' => ['rake']} }
    deps_patches: Record< string, string[]>

    "add-dev-packages"?: true
}

let ruby = undefined;

export const updater: UpdateBlockFunction<NixpkgsRubyOverlayJson> = async (o) => {
    const j = o.json

    const ruby = await nixpkgs_executable("ruby")

    let deps = [...j.deps]

    if (j["add-dev-packages"])
        // some of the other tools eventually are more annoying then helpful ?
        deps = [...deps, "solargraph", "rubocop", "reek"]

    if ('nixpkgs-ruby-overlay' in j) {

        const ruby_version = 'ruby_version' in j ? ['--ruby-version', j.ruby_version] : []
        const v = {name: j["nixpkgs-ruby-overlay"], deps: deps, deps_patches: j.deps_patches ?? {}}
        fs.writeFileSync("/tmp/ruby-deps-to-nix-json-deps", JSON.stringify(v), 'utf8')
        return action(`nixpkgs-ruby-overlay ${v} ${o.region.filename}`,
            () => spawn([ruby, 'ruby-deps-to-nix.rb'] + ruby_version + [ '--cache-file',  '/tmp/ruby2nix', '--json-deps-file', '/tmp/ruby-deps-to-nix-json-deps'], {
                'cwd': NIX_PATH['nixpkgs-ruby-overlay'] ?? '/etc/nixos/nixpkgs-ruby-overlay',
            }).promise.then((x) => x.out))
    }


}
