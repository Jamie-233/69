const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const memoryFs = require('memory-fs')
const { createProxyMiddleware } = require('http-proxy-middleware')
const ReactDOMServer = require('react-dom/server')
const { CLIENT_PORT } = require('../../config')

// 读取webpack 打包的结果 获取 bundle
// 去 webpack dev server 里面读取 template
const getTelmplate = () => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:${CLIENT_PORT}/public/index.html`)
    .then(res => {
      resolve(res.data)
    })
    .catch(reject)
  })
}

const Module = module.constructor

const mfs = new memoryFs
let serverBundle
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
  if(err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(warn => console.error(warn));

  // 获取 bundle 路径
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

module.exports = function(app) {
  // 静态问价全部 代理到 webpack dev server 服务上面

  app.use('/public', createProxyMiddleware({
    target: `http://localhost:${CLIENT_PORT}`
  }))

  app.get('*', function(req, res) {
    getTelmplate().then(template => {
      const content = ReactDOMServer.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->', content))
      // console.log(template);
    })
  })
}
