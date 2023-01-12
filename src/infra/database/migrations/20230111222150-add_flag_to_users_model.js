"use strict";

// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(
      "Users", // table name
      "isFirstAccess", // new field name
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColmn("Users", "isFirstAccess");
  },
};
