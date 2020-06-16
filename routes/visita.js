const router = require('express').Router();
const _ = require('lodash');

const { Visita } = require('../models'); // Importação dos Models

router.get('/', async (req, res) => {
  res.render('visitas');
});

module.exports = router;



