#!/bin/bash

PROJECT_NAME="$1"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CLEAR='\033[0;0m'

TEMPLATE_HEAD='ng2'

# Helper methods
error() {
   echo -e "${RED}ERROR: $*$CLEAR" 

}
success() {
   echo -e "${GREEN}$*$CLEAR" 

}
warn() {
   echo -e "${YELLOW}WARNING: $*$CLEAR" 
}

# Check for project name arg
if [[ -z "${PROJECT_NAME// }" ]]; then
    error "You must give a project name."
    error "Usage: startproject.sh <project_name>"
    exit 1
fi

# Check for directory collision
if [ -d $PWD/$PROJECT_NAME ]; then
    error "$PROJECT_NAME already exists in this directory."
    exit 1
fi

mkdir $PROJECT_NAME

git clone -b $TEMPLATE_HEAD --single-branch https://dev.izeni.net/izeni/izeni-angular-template.git $PROJECT_NAME
cd $PROJECT_NAME
rm -rf .git

find ! -name 'startproject.sh' -type f -print0 | xargs -0 sed -i "s/PROJECT_NAME/$PROJECT_NAME/g"
npm install

# Check for missing dependencies
MISSING=()
if ! type webpack >/dev/null 2>&1; then
    MISSING+=('webpack')
fi

if ! type webpack-dev-server >/dev/null 2>&1; then
    MISSING+=('webpack-dev-server')
    echo ${MISSING[@]}
fi

# Alert user to missing deps
if [ ${#MISSING[@]} -ne 0 ]; then
    warn "The following dependencies appear to be missing: ${MISSING[@]}\nPlease attempt to install using the following.\n\nnpm install -g ${MISSING[@]}"
fi

# Announce success
success "\nSUCCESS"
echo -e "Your project has been unpacked into ${PWD}.\n"
echo -e "Run the project by changing into its directory and running the command 'npm start'."
echo -e "Your server should be running on http://localhost:9000/\n"
