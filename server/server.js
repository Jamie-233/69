const express  = require('express');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const { isDev, SERVER_PORT } = require('../config');

const app = express();
console.log(path.join(__dirname, '../favicon.ico'));
app.use(favicon(path.join(__dirname, '../favicon.ico')))

// 静态文件指定返回内容
if(!isDev) {
  const serverEntry = require('../dist/server-entry').default;
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8');
  app.use('/public', express.static(path.join(__dirname, '../dist')));
  app.get('*', function(req, res) {
    const appString = ReactSSR.renderToString(serverEntry);
    res.send(template.replace('<!-- app -->', appString));
  })
}
else {
  const devStatic = require('./util/dev-static');
  devStatic(app);
}

app.listen(SERVER_PORT, function() {
  console.log(`server is listening on http://127.0.0.1:${SERVER_PORT}`);
})
