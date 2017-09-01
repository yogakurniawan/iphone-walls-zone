/* eslint-disable global-require */

// The top-level (parent) route
const routes = {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },

    {
      path: '/page/:pageNumber',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },

    {
      path: '/category/:category',
      load: () => import(/* webpackChunkName: 'category' */ './category'),
    },

    {
      path: '/category/:category/page/:pageNumber',
      load: () => import(/* webpackChunkName: 'category' */ './category'),
    },

    {
      path: '/model/:iphoneModel',
      load: () => import(/* webpackChunkName: 'iphone-model' */ './iphone-model'),
    },

    {
      path: '/model/:iphoneModel/page/:pageNumber',
      load: () => import(/* webpackChunkName: 'iphone-model' */ './iphone-model'),
    },

    {
      path: '/wallpaper/:name',
      load: () => import(/* webpackChunkName: 'wallpaper' */ './wallpaper'),
    },

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    {
      path: '*',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - www.iphonewallszone.com`;
    route.description = route.description || '';

    return route;
  },

};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
