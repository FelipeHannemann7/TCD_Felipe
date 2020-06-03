const router = require('express').Router();
const _ = require('lodash');

const { User } = require('../models'); // Importação dos Models
const MeuTerceiroMiddleware = require('../middlewares/MeuTerceiroMiddleware');
const isAuthenticated = require('../middlewares/isAuthenticated');
/** POST /users
 * 
 * Cria um usuario
 **/ 
router.post('/', [MeuTerceiroMiddleware], async (req, res) => {
  try {
    const user = await User.create(req.body.user);
    res.send({user});
  } catch(e) {
    res.status(500).send({ message: 'Erro ao criar o usuário. '});
  }
});

/** GET /users
 * 
 * Busca todos os usuarios
 */
router.get('/', [isAuthenticated], async (req, res) => {
  const users = await User.findAll();
  // res.send({users: users});
  console.log(users)
  res.render('users', {
    users
  });
});

/** GET /users/:id
 * 
 * Busca um usuario pelo id
 */
router.get('/:id', [isAuthenticated], async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id);
  // console.log(`User ${id}:`, user);

  if(user) {
    // res.send({ user })
    res.render('user_page', { user });
  } else {
    res.status(404).send('Usuario não encontrado');
  }
});

/** PUT /:id
 * 
 * Altera um usuario pelo id
 */
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const dataToUpdate = req.body.user;

  const user = await User.findByPk(id);

  if(user) {
    _.assign(user, dataToUpdate);
    await user.save();
    res.status(200).send({user});
  } else {
    res.status(404).send('Usuario não encontrado');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (user) {
    // apaga o usuario
    user.destroy();
    res.send();
  } else {
    res.status(404).send('Usuario não encontrado');
  }
});

module.exports = router;