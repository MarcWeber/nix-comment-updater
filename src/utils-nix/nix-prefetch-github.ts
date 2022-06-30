import spawn from "utils-spawn";
import { path_or_build } from "."
/*
usage: nix-prefetch-github [-h] [--fetch-submodules] [--no-fetch-submodules] [--leave-dot-git] [--no-leave-dot-git]
                           [--deep-clone] [--no-deep-clone] [--verbose] [--nix] [--json] [--version] [--rev REV]
                           owner repo

positional arguments:
  owner
  repo

optional arguments:
  -h, --help            show this help message and exit
  --fetch-submodules
  --no-fetch-submodules
  --leave-dot-git
  --no-leave-dot-git
  --deep-clone
  --no-deep-clone
  --verbose, -v
  --nix
  --json
  --version             show program's version number and exit
  --rev REV
 */


export type nix_prefetch_github_args = {
  owner: string,
  repo: string
  // '--fetch-submodules': true,
  // '--no-fetch-submodules': true,
  // '--leave-dot-git': true,
  // '--no-leave-dot-git': true,
  // '--deep-clone': true,
  // '--no-deep-clone': true,
  // '--verbose': true,
  // '--nix': true,
  // '--json': true,
  // '--version': true
  'rev': string
}

export type nix_prefetch_github_result = {
    "owner": string,
    "repo": string,
    "rev": string,
    "sha256": string,
    // "fetchSubmodules": false,
    // "leaveDotGit": false,
    // "deepClone": false
}

export const nix_prefetch_github = async (o: nix_prefetch_github_args): Promise<nix_prefetch_github_result> => {
    const nix_prefetch_github = await path_or_build("nix-prefetch-github", "nix-prefetch-github")
    return spawn([nix_prefetch_github,
        ...(o.rev ? ['--rev', o.rev] : []),
        // ...(o['--branch-name'] ? ['--branch-name', o['--branch-name']] : []),
        // ...(o['--hash'] ? ['--hash', o['--hash']] : []),
        o.owner, o.repo,
    ], { }).promise.then((x) => JSON.parse(x.out))
}

