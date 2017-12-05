const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('page', '/page/:page')
routes.add('about', '/about-us/:foo(bar|baz)')