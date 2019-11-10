## Requirements

This project uses [Gulp task runner](http://gulpjs.com/) and [Bower package manager](https://bower.io/) that requires [Node.js](http://nodejs.org) v6.x.x  to be installed on your machine.
If you haven't installed Gulp CLI or Bower on your machine yet, run:

```bash
$ npm install --global gulp-cli
$ npm install --global bower
```

## Quickstart

### 1. Install with npm

```bash
$ npm install && bower install
```

```shell
$ npm install -and bower install
```

### 2. Setup your gulpfile.js:

#### 2.1 Live reload
Add your local server URL, so LiveReload can refresh browser as you are working on your code :

```javascript
var URL = 'localhost/myproject'
```

### 3. Run Gulp

While working on your project, run "watch" task from the NPM: `npm run watch`
When project is done, run `npm run production` to minify CSS, JS and remove unnecessary sourcemaps

## Folder structure

```
wp-theme/
├───assets
│   ├───dist
│   │   ├───css
│   │   ├───fonts
│   │   ├───images
│   │   └───javascript
│   └───src
│       ├───fonts
│       ├───images
│       ├───javascript
│       │   └───modules
│       └───scss
│           ├───base
│           ├───layout
│           ├───modules
│           └───vendor
├───template-parts
└───page-templates
```
