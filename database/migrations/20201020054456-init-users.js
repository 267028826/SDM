'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, DATE, UUID, UUIDV4 } = Sequelize;
    await queryInterface.createTable('users', {
      id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      username: { type: STRING, unique: true, allowNull: false },
      email: { type: STRING, unique: true, allowNull: false },
      password: { type: STRING, allowNull: false },
      name: STRING,
      mobilePhone: STRING,
      token: STRING,
      lastSignInAt: DATE,
      createdAt: DATE,
      updatedAt: DATE,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
