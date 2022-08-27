// mind /tmp/export-vim-plugin-for-nix-cache-file
//
//
// TODO: the viml code sucks.
// So reimplement vim-pi viml code using JS so that it's clean and can be used
// by all tools Vim, this and more
import fs from "fs";
import { UpdateBlockFunction } from ".."
import spawn from "utils-spawn";
import { action } from "../utils"
import { build_path } from "../utils-nix"
import { nix_prefetch_github, nix_prefetch_github_args } from "../utils-nix/nix-prefetch-github";
import * as cp from "child_process";

export type VimPlugins = {
    'vim-plugins': string // filepath
}

export type VimWithVamExecutableJSON = {
    'vim-with-vam-executable-name': string
} & VimPlugins

const get_nix_code_using_vim2nix = async (j: {"vim-plugins": string}) => {

                let set_vim_plugins: string
                if ('vim-plugins' in j){
                    set_vim_plugins = `let opts.plugin_dictionaries = map(readfile(expand(${JSON.stringify(j['vim-plugins'])})), 'eval(v:val)')`
                } else throw "no vim-plugins source"

                const out_file = '/tmp/vim2nix.out'
                const vimrc = `
        let opts = {}
        let opts.path_to_nixpkgs = '/etc/nixos/nixpkgs'
        let opts.cache_file = '/tmp/export-vim-plugin-for-nix-cache-file'
        ${set_vim_plugins}
        " add more files
        " let opts.plugin_dictionaries += map(.. other file )
        call feedkeys(repeat("<cr>", 2000), "m")
        call nix#ExportPluginsForNix(opts)
        silent! saveas! ${out_file}
        qa!
        `
                fs.writeFileSync('/tmp/tonix.vim',  vimrc, 'utf8')

                const vim_with_vim2nix = `${ await build_path('vimUtils.vim_with_vim2nix') }/bin/vim`

                console.log("while running this you might have to press space or return watch the green lines :-(");

                await new Promise((r,j) => {
                   const c = cp.spawn(vim_with_vim2nix, ['-c', `source /tmp/tonix.vim`], {'stdio': ['inherit', 'inherit', 'inherit']})
                    // const x = setInterval(() => c.stdin.write("\n"), 10)
                    c.on('close', (code, signal) => {
                        // clearInterval(x)
                        if (code == 0) r(undefined)
                        j(code)
                    })
                })
                    // spawn([vim_with_vim2nix, '-c', `source /tmp/tonix.vim`]).promise


                const l = fs.readFileSync(out_file, 'utf8').split("# vam.pluginDictionaries")

    if (0 > l[0].search(`"vim-addon-manager" =`)){
        l[0] += `\n${ await vimPluginFromGithub({owner: "MarcWeber", repo: "vim-addon-manager", rev: "master"})}`
    }

    return {
        knownPlugins: l[0],
        pluginDictionaries: l[1],
    }
}

export const vimPluginFromGithub = async (o:{repo: string, owner: string, rev: string}) => {
    const r = await nix_prefetch_github(o)
    return `
      "${o.repo}" = buildVimPluginFrom2Nix { # created by nix#NixDerivation
        name = "${o.repo}";
        src = fetchgit {
          url = "${r.url}";
          rev = "${r.rev}";
          sha256 = "${r.sha256}";
        };
        dependencies = [];
      };
    `
}

export const updater: UpdateBlockFunction<VimWithVamExecutableJSON> = async (o) => {
    const j = o.json
    if ('vim-with-vam-executable-name' in j) {

        const v = j['vim-with-vam-executable-name']
        return action(`nixpkgs_ruby_overlay ${v} ${o.region.filename}`,
            async () => {

                const r = await get_nix_code_using_vim2nix(j)

                return `
                vim_configurable.customize {
                    name = "vim-marc-weber";
                    vimrcConfig.vam.knownPlugins =
                        let
                        inherit (vimUtils.override {inherit vim;}) rtpPath addRtp buildVimPluginFrom2Nix vimHelpTags;
                        in rec {
                            ${r.knownPlugins}
                        };

                    vimrcConfig.vam.pluginDictionaries =
                        ${r.pluginDictionaries};
                };
                `
            }
        )

    }

}
