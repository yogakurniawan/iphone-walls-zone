
/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 5000,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || 'http://phonecatalogues.com',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || 'http://phonecatalogues.com',
  },

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID || 'UA-97981820-3', // UA-XXXXX-X
  },
};
