const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const settingsRoute = require('./settings.route');
const bannerRoute = require('./banner.route');
const aboutRoute = require('./about.route');
const config = require('../../config/config');
const scheduleDemoRoute=require('./scheduleDemo.route');
const slidesRoute=require('./slides.route');
const contactRoute=require('./contact.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/settings',
    route: settingsRoute,
  },
  {
    path: '/banner',
    route: bannerRoute,
  },
  {
    path: '/about',
    route: aboutRoute,
  },
  {
    path: '/scheduleDemo',
    route: scheduleDemoRoute,
  },
  {
    path: '/slides',
    route: slidesRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
