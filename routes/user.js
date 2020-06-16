const router = require('express').Router();
const _ = require('lodash');

const { User } = require('../models'); // Importação dos Models
const { Oracao } = require('../models'); // Importação dos Models
const MeuTerceiroMiddleware = require('../middlewares/MeuTerceiroMiddleware');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/', [MeuTerceiroMiddleware], async (req, res) => {
  try {
    const user = await User.create(req.body.user);
    res.send({ user });
  } catch (e) {
    res.status(500).send({ message: 'Erro ao criar o usuário. ' });
  }
});

router.get('/', [isAuthenticated], async (req, res) => {
  const users = await User.findAll();
  res.render('users', {
    users
  });
});

router.get('/:id', [isAuthenticated], async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id);
  const oracaos = await Oracao.findAll();

  if (user) {
    res.render('user_page', { user, oracaos });
  } else {
    res.status(404).send('Usuario não encontrado');
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const dataToUpdate = req.body.user;

  const user = await User.findByPk(id);

  if (user) {
    _.assign(user, dataToUpdate);
    await user.save();
    res.status(200).send({ user });
  } else {
    res.status(404).send('Usuario não encontrado');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (user) {
    user.destroy();
    res.send();
  } else {
    res.status(404).send('Usuario não encontrado');
  }
});

module.exports = router;