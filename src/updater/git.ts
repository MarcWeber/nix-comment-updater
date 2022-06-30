import { UpdateBlockFunction } from ".."
import spawn from "utils-spawn";
import { action } from "/utils"
import { NIX_PATH, to_nix} from "../utils-nix"
import { nix_prefetch_git, nix_prefetch_git_args } from "/utils-nix/nix-prefetch-git";
import { ExtraKeys, extra_keys } from ".";

export type GitJson =
{
    updater: "git",
    name?: string,
    extra_keys?: ExtraKeys
} & nix_prefetch_git_args

export const git_updater: UpdateBlockFunction<GitJson> = async (o) => {
     const j = o.json
    if (j.updater == 'git') {
        const r = await nix_prefetch_git(o.json)

        const name = j.name
            ? j.name
            : j.url.replace(/.*\//, '')

        const version =
            j.rev
            ? j.rev
            : (j['branch-name']
                ? `${j['branch-name']}-${r.rev}`
                : r.rev
              )


        const call = ['__call', 'fetchgit', {
                rev: r.rev,
                sha256: r.sha256,
                url: r.url
            }]

        if (j.fetch_only)
            return to_nix(call);

        return to_nix({
            __outer: true,
            src: call,
            ...extra_keys({name, version}, j)
        })
    }
}
