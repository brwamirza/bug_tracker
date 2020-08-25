module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("members", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING
      }
    });
  
    return Member;
  };