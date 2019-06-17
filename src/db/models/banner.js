'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
       type: DataTypes.INTEGER,
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
      }
    }
  });
  Banner.associate = function(models) {
    // associations can be defined here
    Banner.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE",
    });
    Banner.belongsTo(models.Advertisement, {
      foreignKey: "advertisementId",
      onDelete: "CASCADE",
    });
  };
  return Banner;
};
