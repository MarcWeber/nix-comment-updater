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
vim_blah = 
# NIX_COMMENT_UPDATER_START {"vim-with-vam-executable-name":"vim-XX", "vim-plugins": "filename"}

where filename points to a file see VAM documentation. Eg lines like

{'name': 'github:MarcWeber'}
{'name': 'github:MarcWeber/ultisnips'}
{'name': 'vim-addon-other'}
{'name': 'vim-addon-sql'}
{'name': 'sparkup'}
{'name': 'tlib'}
{'name': 'vim-addon-toggle-buffer'}
{'name': 'vim-addon-git'}
{'name': 'vim-addon-mw-utils'}
{'name': 'vim-addon-goto-thing-at-cursor'}
{'name': 'matchit.zip'}
{'name': 'vim-addon-syntax-checker'}
{'name': 'vim-addon-rfc'}
{'name': 'vim-addon-surround'}
{'name': 'vim-addon-toc'}
{'name': 'vim-addon-commenting'}
{'filename_regex': '\%(php\|inc\|php.inc\|hsc\|lhs\)$', 'names': 'vim-addon-xdebug', 'vim-addon-php-manual']}
{'filetype_regex': '\%(rb)$', 'names': ['vim-ruby', 'vim-addon-rdebug', 'vim-addon-ruby-debug-ide', 'textobj-rubyblock' ]}
{'filetype_regex': '\%(rs)$', 'names': ['rust', 'github:rust-lang/rust.vim']}
{'filetype_regex': '\%(nix)$', 'names': ['vim-addon-nix']}


TODO:
- allow passing plugins as json dictionary ?
- get rid of vim2nix cause it's annoying and slow



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
