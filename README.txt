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
