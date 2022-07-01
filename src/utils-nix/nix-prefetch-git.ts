import { path_or_build } from "."
import spawn from "utils-spawn";

export type nix_prefetch_git_args = {
  url: string, //       Any url understood by 'git clone'.
  "rev"?: string, //       Any sha1 or references (such as refs/heads/master)
  "hash"?: string, // hash.
  "branch-name"?: string, // name to check out into
  // sparse-checkout: Only, // fetch and checkout part of the repository.
  // deepClone: Clone, // the entire repository.
  // no-deepClone: Make, // a shallow clone of just the required ref.
  // leave-dotGit: Keep, // the .git directories.
  // fetch-lfs: Fetch, // git Large File Storage (LFS) files.
  // fetch-submodules: Fetch, // submodules.
  // builder: Clone, // as fetchgit does, but url, rev, and out option are mandatory.
  // quiet: 'Only', // print the final json summary.
}

// nix-prefetch-git
/*
      --out path      Path where the output would be stored.
      --url url       Any url understood by 'git clone'.
      --rev ref       Any sha1 or references (such as refs/heads/master)
      --hash h        Expected hash.
      --branch-name   Branch name to check out into
      --sparse-checkout Only fetch and checkout part of the repository.
      --deepClone     Clone the entire repository.
      --no-deepClone  Make a shallow clone of just the required ref.
      --leave-dotGit  Keep the .git directories.
      --fetch-lfs     Fetch git Large File Storage (LFS) files.
      --fetch-submodules Fetch submodules.
      --builder       Clone as fetchgit does, but url, rev, and out option are mandatory.
      --quiet         Only print the final json summary.
*/

export type nix_prefetch_git_result = {
  "url": string,
  "rev": string,
  "date": string,
  "path": string,
  "sha256": string,
  "fetchLFS": boolean,
  "fetchSubmodules": boolean,
  "deepClone": boolean,
  "leaveDotGit": boolean
}

export const nix_prefetch_git = async (o: nix_prefetch_git_args): Promise<nix_prefetch_git_result> => {
    const nix_prefetch_git = await path_or_build("nix-prefetch-git", "nix-prefetch-git")
    return spawn([nix_prefetch_git, o.url,
        ...(o.rev ? ['--rev', o.rev] : []),
        ...(o['branch-name'] ? ['--branch-name', o['branch-name']] : []),
        ...(o.hash ? ['--hash', o.hash] : []),
    ], { detached: true }).promise.then((x) => JSON.parse(x.out))
}

