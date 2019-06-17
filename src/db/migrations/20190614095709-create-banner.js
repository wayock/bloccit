'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Banners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      source: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
       topicId: {
         type: Sequelize.INTEGER,
         onDelete: "CASCADE",
         references: {
           model: "Topics",
           key: "id",
           as: "topicId",
         },
      },
      advertisementId: {
         type: DataTypes.INTEGER,
         onDelete: "CASCADE",
         references: {
           model: "Advertisements",
           key: "id",
           as: "advertisementId",
         },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Banners');
  }
};
