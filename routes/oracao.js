const router = require('express').Router();
const _ = require('lodash');
const isAuthenticated = require('../middlewares/isAuthenticated');

const { Oracao } = require('../models'); // Importação dos Models

router.get('/', [isAuthenticated], async (req, res) => {
  const oracaos = await Oracao.findAll();
  // res.send({louvors: louvors});
  console.log(oracaos)
  res.render('oracao', {
    oracaos
  });
});

router.post('/', async (req, res) => {
  try {
    const oracaos = await Oracao.create(req.body);
    res.render('oracao', {
      oracaos
    });
  } catch (e) {
    res.status(500).send({ message: 'Erro ao salvar a oração. ' });
  }
});
module.exports = router;



