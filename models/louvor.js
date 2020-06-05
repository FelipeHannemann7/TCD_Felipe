
function ModelLovor(sequelize, DataType) {
  const Louvor = sequelize.define('louvor', {
    // atributos
    linkVideo: {
      type: DataType.STRING,
      allowNull: false
    }
  }, {
    // opções
  });
  return Louvor;
}

module.exports = ModelLovor;