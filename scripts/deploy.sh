#!/bin/bash
git com
git branch -D gh-pages
git push origin :gh-pages
git new gh-pages
source ~/.nvm/nvm.sh && nvm use
node_modules/.bin/ember build --environment=production
git add --all
git add dist --force
git commit -am "prod"
git subtree push --prefix dist origin gh-pages
git com
