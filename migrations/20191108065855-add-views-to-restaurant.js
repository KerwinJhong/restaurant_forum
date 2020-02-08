'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Restaurants', 'views', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Restaurants', 'views');
  }
};