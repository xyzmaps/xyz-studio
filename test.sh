#!/bin/bash

envName=$1
lowerCaseEnvName=$(echo "$envName" | awk '{print tolower($0)}')

cp .env.$lowerCaseEnvName .env.local
cd ./e2e_tests/cypress_studio_tests/ && npm install
npx cypress run