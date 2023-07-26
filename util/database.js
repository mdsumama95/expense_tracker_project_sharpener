/*const Sequelize = require('sequelize')
const sequelize = new Sequelize('project', 'root', 'root123@',{
    dialect: "mysql",
    host: "localhost",
  }
)

module.exports = sequelize;*/

const Sequelize = require("sequelize");
const sequelize = new Sequelize('project','root','root123@',{
    dialect: 'mysql',
    host: 'localhost'
 })

module.exports = sequelize;
 