const router = require('express').Router();
const _ = require('lodash');

const isAuthenticated = require('../middlewares/isAuthenticated');

/** GET /pets
 * 
 * Busca todos os animais
 */
router.get('/', [isAuthenticated], async (req, res) => {
  res.send({
    pets: []
  });
});

module.exports = router;