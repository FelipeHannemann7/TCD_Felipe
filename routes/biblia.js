const router = require('express').Router();
const _ = require('lodash');

router.get('/', function (req, res) {
  return res.render('biblia');
});

module.exports = router;



