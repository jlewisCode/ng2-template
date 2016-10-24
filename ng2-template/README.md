# Izeni Angular 2 Template v0.2.0
[**SEE WIKI PAGES**](https://dev.izeni.net/izeni/izeni-angular-template/wikis/home) in this repo for more detailed introductions to the various features of this template.

## Quick Setup
```bash
bash <(wget -q0- https://dev.izeni.net/izeni/izeni-angular-template/raw/ng2/startproject.sh) <project_name>
```

## Manual Setup
Set your project name as an environment variable
```bash
PROJECT_NAME=[your project name here]
```
And run the following commands:
```bash
git clone -b ng2 --single-branch git@dev.izeni.net:izeni/izeni-angular-template.git
mv izeni-angular-template $PROJECT_NAME
cd $PROJECT_NAME
find . -type f -print0 | xargs -0 sed -i "s/PROJECT_NAME/$PROJECT_NAME/g"
npm install -g webpack webpack-dev-server typescript typings
npm install
npm start
```
Your project should be running on <http://localhost:9000/>

## Set git url
Whether using quick or manual, don't forget to change the git origin to match your project's:
```bash
git remote set-url origin <remote-url-of-project>
```

## Commands

### `npm start`
This is what you'll be using for most of development. Starts webpack-dev-server, which watches for files changes, processes updated files, and refreshes the browser (or simply injects updated css if the change is css only).

### `npm run build`
This is what you'll use for production, likely resetting the `NODE_ENV` environment variable before doing so.

## Change Environment
You can change the `NODE_ENV` environment variable to change the generated output.  
`NODE_ENV=dev npm start`  
`NODE_ENV=production npm start`  
`NODE_ENV=production npm run build`

## API config
To change your backend api url, look for `api.config.ts` next to `api.service.ts` in the services directory