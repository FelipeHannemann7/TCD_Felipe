const router = require('express').Router();
const { User } = require('../models'); // Importação dos Models
var bcrypt = require('bcryptjs');

router.get('/', function (req, res) {
  return res.render('login');
});

router.post('/login', async function (req, res) {
  // Executa a ação de login
  console.log('Ação de login: ', req.body);

  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });

  if (user) {
    // if(user.password === req.body.password) {
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (passwordIsValid) {
      // Autenticar o usário
      req.session.loggedIn = true;
      req.session.user = user.get({ plain: true }); // Adiciona o objeto user puro na session

      return res.redirect('/users');
    } else {
      res.status(400).render('login', {
        errorMessage: 'Falha de login'
      });
    }
  } else {
    res.status(400).render('login', {
      errorMessage: 'Este login não existe'
    });
  }
});

// Rota para registro de novo usuario
router.get('/register', function (req, res) {
  return res.render('register');
});

// Cria o usuario
router.post('/register', async function (req, res) {
  const user = req.body;

  // Criptografar a senha
  if (user.password !== user.confirmPassword) {
    return res.status(400).render('register', {
      errorMessage: 'As senhas não conferem'
    });
  }

  console.log(`register`, user)

  try {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);

    console.log(`Criptografando a senha ${user.password} para ${hash}`);

    user.password = hash;
    const createdUser = await User.create(user);
    console.log(createdUser)
    return res.redirect('/auth');
  } catch (e) {
    return res.status(400).render('register', {
      errorMessage: 'Não foi possível criar o usuário'
    });
  }
});

router.get('/logout', async function (req, res) {
  req.session.destroy(function (err) {
    console.error(err);
  });

  return res.redirect('/');
});

module.exports = router;