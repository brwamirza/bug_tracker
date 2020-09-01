const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.project = require("../models/project.model.js")(sequelize, Sequelize);

db.user.belongsToMany(db.project, {
  through: "user_projects",
  foreignKey: "userId",
  otherKey: "projectId"
});

db.project.belongsToMany(db.user, {
  through: "user_projects",
  foreignKey: "projectId",
  otherKey: "userId"
});

db.user.belongsToMany(db.user, {
  through: "following",
  as:"followers",
  foreignKey: "followingId",
  otherKey: "followerId"
});

db.user.belongsToMany(db.user, {
  through: "following",
  as:"followings",
  foreignKey: "followerId",
  otherKey: "followingId"
});

db.user.hasMany(db.user);

module.exports = db;