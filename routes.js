const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('index', '/page/:slug')
routes.add('about', '/about-us/:foo(bar|baz)')