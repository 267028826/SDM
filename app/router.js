'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', jwt, controller.home.index);
  router.get('/users/login', controller.user.login);
  router.resources('users', '/users', controller.user);

};
