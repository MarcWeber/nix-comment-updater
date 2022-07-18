// see https://github.com/MarcWeber/nixpkgs-ruby-overlay
import { UpdateBlockFunction } from ".."
import spawn from "utils-spawn";
import { action } from "../utils"

export type RubyMarcJson = {
    ruby_marc_key: string
}

export const updater: UpdateBlockFunction<RubyMarcJson> = async (o) => {
    const j = o.json
    if ('nixpkgs-ruby-overlay' in j) {
        const v = j['nixpkgs-ruby-overlay']
        return action(`nixpkgs-ruby-overlay ${v} ${o.region.filename}`,
            () => spawn(['nix-shell', '-p', 'ruby', '--run', `ruby get.rb --as-env ${v}`], {
                'cwd': '/etc/nixos/nixpkgs-ruby-overlay',
            }).promise.then((x) => x.out))
    }


}
