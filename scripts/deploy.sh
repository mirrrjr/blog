#!/usr/bin/env bash

set -e

# build project
npm run build

# go to output folder
cd .vitepress/dist

# init repo
git init
git add -A
git commit -m 'deploy'

# push to gh-pages branch
git push -f git@github.com:mirrrjr/mirrrjr.github.io.git master:gh-pages

cd -
