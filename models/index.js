var Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Carrega os models
sequelize.User   = sequelize.import('./user.js');
sequelize.Louvor = sequelize.import('./louvor.js');
sequelize.Oracao = sequelize.import('./oracao.js');

// Sync com o schema do banco de dados
sequelize.sync();


module.exports = sequelize;