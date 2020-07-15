#!/bin/bash

git checkout master
git pull
rm -rf node_modules
npm i
npm run generate
echo "done"