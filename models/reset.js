const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ResetPassword = sequelize.define("reset", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  isActive: Sequelize.BOOLEAN,
  expiresby: Sequelize.DATE
});

module.exports = ResetPassword;