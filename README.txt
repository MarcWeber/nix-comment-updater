NIX COMMENT UPDATER
===================
You an degfine comment regions like this

# NIX_COMMENT_UPDATER_START { JSON }
# NIX_COMMENT_UPDATER_END

Then you can create a function such as src/updater/* and run src/nix-comment-updater.ts
updating the code you want


src/updater/git.ts
======================
# NIX_COMMENT_UPDATER_START { "git": "git-url", "rev": "hash or branchname", "add_version": true }
# NIX_COMMENT_UPDATER_END

src/updater/github.ts
======================

use new syntax instead ?
      url = "github:cqparts/cqparts/018e87e14c2c4d1d40b4bfe6a7e22bcf9baf0a53";

{ github: 'user/name', revision: 'hash or branchname', add_version: true }


src/updater/nixpkgs-ruby-overlay.ts
# NIX_COMMENT_UPDATER_START {"nixpkgs-ruby-overlay": "webkos_testing_selenium", "deps": ["nokogiri"] }
# NIX_COMMENT_UPDATER_END


src/updater/url.ts
===================
# NIX_COMMENT_UPDATER_START {"fetchurl": "http://source.tar.gz"}
# NIX_COMMENT_UPDATER_END

src/updater/pypi.ts
===================

src/updator/python-many.ts
============================
python2nix

solvers 
conda ?
other solver

https://github.com/nix-community/pypi2nix
https://github.com/proger/python2nix (own solver ? last updated 2021)
https://github.com/tailhook/reqtxt2nix


src/updater/pecl.ts
===================
  # NIX_COMMENT_UPDATER_START {"updater": "pecl", "name": "xdebug"}
  # NIX_COMMENT_UPDATER_END

src/updater/vim-addon-manager.ts
================================
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



alternatives:
=============
https://nixos.wiki/wiki/Flakes




TODO reimplement:
================
snippet nix_repository_manager_svn
	# REGION AUTO UPDATE: { name="$1"; type="svn"; url=""; [ groups = "group1 group2"; ] }
	# END

snippet nix_repository_manager_hg
	# REGION AUTO UPDATE: { name="$1"; type="hg"; url=""; [ branch = ""; groups = "group1 group2"; ] }
	# END

snippet nix_repository_manager_cvs
	# REGION AUTO UPDATE: { name="$1"; type = "cvs"; cvsRoot = ":pserver:anonymous@cinepaint.cvs.sourceforge.net:/cvsroot/cinepaint"; module="cinepaint"; }
	# END

snippet nix_repository_manager_bzr
	# REGION AUTO UPDATE: { name=""; type="bzr"; url=""; [ args="extra args such as -Ossl.cert_reqs=none"; groups = "group1 group2"; ] }
	# END


VIM
===

  fun! NixCommentUpdaterCurrentFile(...) abort
    if len(a:000) == 0
      !node /pr/typescript/ts/nix-comment-updater/dist/nix-comment-updater.js update %:p
    else
      " one filter argument
      exec '!node /pr/typescript/ts/nix-comment-updater/dist/nix-comment-updater.js -f '.a:1.'  update %:p'
    endif
  endf

  command! -nargs=? NixCommentUpdater call NixCommentUpdaterCurrentFile(<f-args>)

