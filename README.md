# Editor Integration Notes

The following files are managed by the Html Editor and **may not touched for hybrid development**. 
- **/public/app_data.json** 
  - contains your project's data and will update on every change in the editor (most frequently)
- **/public/assets/** - contains the project's images 
- **/public/mdi_icons.json** - contains the project's icons data (will update when icons are added or removed)
- **/index.html** - adjustment of html document head data 

How to make changes to the html `<head>` ?
- use JSX in a react component (return part)
- a react component can inject `<head>` elements like `<script>` automatically (starting React 19). 

# Installation 

- run in this repository's root directory 

```
npm install
```

# Run in DEV mode 
 - run in this repository's root directory 

```
npm run dev
```

# Build the app
 - run in this repository's root directory 
```
npm run build
```
 - a `/dist` folder will appear in the root directory which can be directly served on a webserver (e.g. with the [serve](https://www.npmjs.com/package/serve) run `serve ./dist` (when in this repository's root directory )
