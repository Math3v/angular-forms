#!/bin/bash

REPO='git@github.com:Math3v/angular-forms.git'

# Check the Node and NPM versions
node --version
npm --version

# Install Angular-CLI
npm install -g @angular/cli@1.0.0

# Clone the starters and reference repositories
git clone -b template-starter $REPO template-starter-angular-forms
git clone -b reactive-starter $REPO reactive-starter-angular-forms
git clone $REPO

cd template-starter-angular-forms && npm install
cd ../reactive-starter-angular-forms && npm install
