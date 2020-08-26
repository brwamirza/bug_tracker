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
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.project = require("../models/project.model.js")(sequelize, Sequelize);
db.member = require("../models/member.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.role.belongsToMany(db.member, {
  through: "member_roles",
  foreignKey: "roleId",
  otherKey: "memberId"
});

db.member.belongsToMany(db.role, {
  through: "member_roles",
  foreignKey: "memberId",
  otherKey: "roleId"
});

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

db.member.belongsToMany(db.user, {
  through: "user_members",
  foreignKey: "memberId",
  otherKey: "userId"
});

db.user.belongsToMany(db.member, {
  through: "user_members",
  foreignKey: "userId",
  otherKey: "memberId"
});


db.ROLES = ["submitter","developer", "projectManager", "admin"];

module.exports = db;