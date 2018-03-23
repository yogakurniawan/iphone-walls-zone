const compression = require('compression')
const express = require('express')
const next = require('next')
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare()
  .then(() => {
    const server = express()
    server.use(compression())

    server.get('/', (req, res) => app.render(req, res, '/page', { page: 1 }))

    server.get('*', (req, res) => {
      handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
    })
  })
