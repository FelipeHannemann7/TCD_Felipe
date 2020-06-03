var Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Carrega os models
sequelize.User = sequelize.import('./user.js');

// Sync com o schema do banco de dados
sequelize.sync();


module.exports = sequelize;