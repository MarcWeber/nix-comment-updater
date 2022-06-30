#!/bin/sh
esbuild --watch --platform=node --bundle --outfile=dist/nix-comment-updater.js src/nix-comment-updater.ts
