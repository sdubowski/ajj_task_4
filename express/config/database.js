const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('ajj_project', 'sa', 'hamburger', {
    host: 'localhost',
    dialect: 'mssql'
});

module.exports = sequelize;
