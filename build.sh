#!/bin/bash

git checkout master
git pull
#rm -rf node_modules
npm ci
npm run generate
echo "done"