
function ModelOracao(sequelize, DataType) {
  const Oracao = sequelize.define('oracao', {
    // atributos
    PedOracao: {
      type: DataType.STRING,
      allowNull: false
    },
    UserCad: {
      type: DataType.STRING,
      allowNull: false
    }
  });
  return Oracao;
}

module.exports = ModelOracao;