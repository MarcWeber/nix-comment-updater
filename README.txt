NIX COMMENT UPDATER
===================
You an degfine comment regions like this

# NIX_COMMENT_UPDATER_START { JSON }
# NIX_COMMENT_UPDATER_END

Then you can create a function such as src/updater/* and run src/nix-comment-updater.ts
updating the code you want


src/updater/git.ts
======================
{ git: 'git-url', revision: 'hash or branchname', add_version: true }



src/updater/github.ts
======================
{ github: 'user/name', revision: 'hash or branchname', add_version: true }


src/updater/nixpkgs-ruby-overlay.ts
# NIX_COMMENT_UPDATER_START {"nixpkgs-ruby-overlay": "webkos_testing_selenium", "deps": ["nokogiri"] }
# NIX_COMMENT_UPDATER_END


src/updater/vim-addon-manager.ts
======================
# NIX_COMMENT_UPDATER_START {"vim-with-vam-executable-name":"vim-XX", "vim-plugins": "filename"}
TODO:
- allow passing plugins as json dictionary ?
- get rid of vim2nix cause it's annoying and slow

[{name: ...}] or "vam-addon-dictionaries-file": "xx" }
the {name: .. } dictionaries see VAM's documentation about  vam#Scripts
Examples:
{ "filetype_regex" = ''\%(nix)$$''; "names" = [ ''vim-addon-nix'' ]; }
{ "name" = ''vim-addon-commenting''; }


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

ROADMAP
=========
[ ] add caching eg /tmp/nix-comment-updater-date/<key>
    so that its reasonable up to date without wasting your time
