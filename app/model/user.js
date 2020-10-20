'use strict';
const db = require('./db');
module.exports = app => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

  const User = db.defineModel(app, 'users', {
    username: { type: STRING, unique: true, allowNull: false },
    email: { type: STRING, unique: true, allowNull: false },
    password: { type: STRING, allowNull: false },
    name: STRING,
    mobilePhone: STRING,
    token: STRING,
    lastSignInAt: DATE,
    createdAt: DATE,
    updatedAt: DATE,
    version: BIGINT,
  });
  return User;
};
