'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define('Rule', {
    description: DataTypes.STRING
  }, {});
  Rule.associate = function(models) {
    Rule.hasMany(models.Topic, {
     foreignKey: "topicId",
     as: "rules",
   });
  };
  return Rule;
};
