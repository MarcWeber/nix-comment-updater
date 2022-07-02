NIX COMMENT UPDATER
===================
You an degfine comment regions like this

# NIX_COMMENT_UPDATER_START { JSON }
# NIX_COMMENT_UPDATER_END

Then you can create a function such as src/updater/* and run src/nix-comment-updater.ts
updating the code you want

src/updater/git.ts
{ git: 'git-url', revision: 'hash or branchname', add_version: true }
{ github: 'user/name', revision: 'hash or branchname', add_version: true }

src/updater/ruby-marc.ts
# NIX_COMMENT_UPDATER_START {"ruby_marc_key": "webkos_testing_selenium" }


How to use ?
============
Run ./bundle.sh (after installing esbuild)

But such into your .bashrc

nix_comment_updater(){
  ( node PATH_TO_CHECKOUT/dist/nix-comment-updater.js "$@"; )
}

# 3 processes in parallel
nix_comment_updater update -p 3  pkgs/desktops/arcan-latest/**/*.nix

# only update those JSON dictionaries which contain { "owner":"letoram", ... }
nix_comment_updater update -f owner=letoram  pkgs/desktops/arcan-latest/**/*.nix
