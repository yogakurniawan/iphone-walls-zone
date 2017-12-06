const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('page', '/page/:page')
routes.add({name: 'categoryPaging', pattern: '/category/:category/page/:page', page: 'category'})
routes.add({name: 'categoryNoPaging', pattern: '/category/:category', page: 'category'})