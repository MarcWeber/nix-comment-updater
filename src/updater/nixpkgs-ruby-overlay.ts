// see https://github.com/MarcWeber/nixpkgs-ruby-overlay
import { UpdateBlockFunction } from ".."
import spawn from "utils-spawn";
import { action } from "../utils"
import fs from "fs";
import {nixpkgs_executable, NIX_PATH} from "../utils-nix";

export type NixpkgsRubyOverlayJson = {

    "nixpkgs-ruby-overlay": string,

    // the packages you need eg ['
    deps: string[],

    // sometimes some dependencies are missing others. you can use deps_patches to add them
    // { :deps => [ ['unicode'], [ 'xapian-full'], ['sup'], ['gpgme'], ['rake'], ['syck'], ['gettext'], ['ncursesw'], ['curses'], ['iconv'] ], :deps_patches => {'sup' => ['xapian-ruby'], 'xapian-ruby' => ['rake']} }
    deps_patches: Record< string, string[]>
}

let ruby = undefined;

export const updater: UpdateBlockFunction<NixpkgsRubyOverlayJson> = async (o) => {
    const j = o.json

    const ruby = await nixpkgs_executable("ruby")

    if ('nixpkgs-ruby-overlay' in j) {
        const v = {name: j["nixpkgs-ruby-overlay"], deps: j.deps, deps_patches: j.deps_patches ?? {}}
        fs.writeFileSync("/tmp/ruby-deps-to-nix-json-deps", JSON.stringify(v), 'utf8')
        return action(`nixpkgs-ruby-overlay ${v} ${o.region.filename}`,
            () => spawn([ruby, 'ruby-deps-to-nix.rb', '--cache-file',  '/tmp/ruby2nix', '--json-deps-file', '/tmp/ruby-deps-to-nix-json-deps'], {
                'cwd': NIX_PATH['nixpkgs-ruby-overlay'] ?? '/etc/nixos/nixpkgs-ruby-overlay',
            }).promise.then((x) => x.out))
    }


}
