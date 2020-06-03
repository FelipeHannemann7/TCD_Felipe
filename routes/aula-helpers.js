const router = require('express').Router();
const _ = require('lodash');

router.get('/', async (req, res) => {
  res.render('aula-helpers');
});

module.exports = router;