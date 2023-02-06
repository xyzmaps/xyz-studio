#!/bin/bash

envName=$1
lowerCaseEnvName=$(echo "$envName" | awk '{print tolower($0)}')

cp .env.$lowerCaseEnvName .env
npm install
npm run-script build

#Test
#Install required dependencies
#sudo apt-get install  -yq --no-install-recommends xvfb libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
#cd ./e2e_tests/cypress_studio_tests/ && npm install
#sudo ./node_modules/.bin/cypress run