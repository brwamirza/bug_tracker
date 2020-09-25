module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
      Commenter: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.STRING,
      }
    });
  
    return Message;
  };