const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, '..', 'dist', 'client');
if (!fs.existsSync(clientDir)) {
  console.error('dist/client not found — ensure build completed');
  process.exit(1);
}

const assetsDir = path.join(clientDir, 'assets');
const files = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];
const cssFiles = files.filter(f => f.endsWith('.css'));
const jsFiles = files.filter(f => f.endsWith('.js'));

// Basic HTML shell that loads all CSS then JS assets
const cssLinks = cssFiles.map(f => `<link rel="stylesheet" href="./assets/${f}">`).join('\n  ');
const jsScripts = jsFiles.map(f => `<script type="module" src="./assets/${f}"></script>`).join('\n  ');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Habitus</title>
  ${cssLinks}
</head>
<body>
  <div id="root"></div>

  ${jsScripts}
</body>
</html>`;

fs.writeFileSync(path.join(clientDir, 'index.html'), html);
console.log('Generated index.html with', cssFiles.length, 'CSS and', jsFiles.length, 'JS files');
