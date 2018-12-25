#!/bin/bash

# config
git config --global user.email "someone@travis.org"
git config --global user.name "Travis CI"

# deploy
cd ./public
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force "https://${github_token}@github.com/${repo}.git" master:gh-pages