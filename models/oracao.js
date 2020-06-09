
function ModelOracao(sequelize, DataType) {
  const Oracao = sequelize.define('oracao', {
    // atributos
    PedOracao: {
      type: DataType.STRING,
      allowNull: false
    }
  }, {
    // opções
  });
  return Oracao;
}

module.exports = ModelOracao;