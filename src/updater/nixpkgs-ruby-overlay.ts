// see https://github.com/MarcWeber/nixpkgs-ruby-overlay
import { UpdateBlockFunction } from ".."
import spawn from "utils-spawn";
import { action } from "../utils"
import fs from "fs";

export type NixpkgsRubyOverlayJson = {

    "nixpkgs-ruby-overlay": string,

    // the packages you need eg ['
    deps: string[],

    // sometimes some dependencies are missing others. you can use deps_patches to add them
    // { :deps => [ ['unicode'], [ 'xapian-full'], ['sup'], ['gpgme'], ['rake'], ['syck'], ['gettext'], ['ncursesw'], ['curses'], ['iconv'] ], :deps_patches => {'sup' => ['xapian-ruby'], 'xapian-ruby' => ['rake']} }
    deps_patches: Record< string, string[]>
}

export const updater: UpdateBlockFunction<NixpkgsRubyOverlayJson> = async (o) => {
    const j = o.json

    if ('nixpkgs-ruby-overlay' in j) {
        const v = {name: j["nixpkgs-ruby-overlay"], deps: j.deps, deps_patches: j.deps_patches ?? {}}
        fs.writeFileSync("/tmp/ruby-deps-to-nix-json-deps", JSON.stringify(v), 'utf8')
        return action(`nixpkgs-ruby-overlay ${v} ${o.region.filename}`,
            () => spawn(['nix-shell', '-p', 'ruby', '--run', `ruby ruby-deps-to-nix.rb --cache-file /tmp/ruby2nix --json-deps-file /tmp/ruby-deps-to-nix-json-deps `], {
                'cwd': '/etc/nixos/nixpkgs-ruby-overlay',
            }).promise.then((x) => x.out))
    }


    if ('ruby_marc_key' in j){
        const v = j['ruby_marc_key']
        return action(`nixpkgs-ruby-overlay ${v} ${o.region.filename}`,
            () => spawn(['nix-shell', '-p', 'ruby', '--run', `ruby get.rb --as-env ${v}`], {
                'cwd': '/etc/nixos/nixpkgs-ruby-overlay',
            }).promise.then((x) => x.out))

    }

}
