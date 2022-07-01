import { UpdateBlockFunction } from ".."
import spawn from "utils-spawn";
import { action } from "/utils"
import { nix_prefetch_github, nix_prefetch_github_args } from "../utils-nix/nix-prefetch-github";
import { to_nix } from "/utils-nix";
import { extra_keys } from ".";

export type GithubJson =
{
    updater: "github",
    add_version?: true
} & nix_prefetch_github_args

export const github_updater: UpdateBlockFunction<GithubJson> = async (o) => {
    const j = o.json
    if (j.updater == 'github') {
        return action(`github ${JSON.stringify(j)} ${o.region.filename}`, async () => {

            const r = await nix_prefetch_github(j)

            const name = j.repo

            const version =
            j.rev
            ? j.rev
            : (j['branch-name']
                ? `${j['branch-name']}-${r.rev}`
                : r.rev
            )


            const call = ['__call', 'fetchFromGitHub', {
                rev: r.rev,
                sha256: r.sha256,
                repo: j.repo,
                owner: j.owner,
            }]

            if (j.fetch_only)
                return to_nix(call);

            return to_nix({
                __outer: true,
                src: call,
                ...extra_keys({name, version}, j)
            })
        })

    }
}
