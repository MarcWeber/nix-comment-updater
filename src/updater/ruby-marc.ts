import { UpdateBlockFunction } from ".."
import spawn from "utils-spawn";
import { action } from "/utils"

export type RubyMarcJson = {
    ruby_marc_key: string
}

export const ruby_marc_updater: UpdateBlockFunction<RubyMarcJson> = async (o) => {
    const j = o.json
    if ('ruby_marc_key' in j) {
        return action(`ruby_marc_key ${j.ruby_marc_key}`,
            () => spawn(['nix-shell', '-p', 'ruby', '--run', `ruby get.rb --as-env ${j.ruby_marc_key}`], {
                'cwd': '/etc/nixos/nixpkgs-ruby-overlay',
            }).promise.then((x) => x.out))
    }
}
