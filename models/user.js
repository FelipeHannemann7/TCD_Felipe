
function ModelUser(sequelize, DataType) {
  const User = sequelize.define('user', {
    // atributos
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    age: {
      type: DataType.INTEGER
    },
    username: {
      type: DataType.STRING,
      allowNull: false
    },
    password: {
      type: DataType.STRING,
      allowNull: false
    },
    cargo: {
      type: DataType.STRING,
      allowNull: false
    },
    dtNascimento: {
      type: DataType.STRING,
      allowNull: false
    }
  }, {
    // opções
  });
  return User;
}

module.exports = ModelUser;