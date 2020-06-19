#!/bin/bash

git checkout master
git pull
npm ci
npm run generate
echo "done"