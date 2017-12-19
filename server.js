const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare()
.then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname === '/') {
      app.render(req, res, '/model', { model: '59905698d7b400aa78226ce0|iPhone 6' })
    } else {
      handle(req, res, parsedUrl)
    }
  })
  .listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})