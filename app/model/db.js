'use strict';
function defineModel(app, name, attributes) {
  const { UUID, UUIDV4 } = app.Sequelize;
  const attrs = {};
  for (const key in attributes) {
    const value = attributes[key];
    if (typeof value === 'object' && value.type) {
      value.allowNull = value.allowNull && true;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: true,
      };
    }
  }
  attrs.id = {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  };
  return app.model.define(name, attrs, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    version: 'version',
    freezeTableName: true,
    underscored: false,
  });
}
module.exports = { defineModel };
