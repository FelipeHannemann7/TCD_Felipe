var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var hbs = require('hbs');
// Inicializa o ORM
require('./models');

const UserRoutes = require('./routes/user');
const LouvoresRoutes = require('./routes/louvor');
const AuthRoutes = require('./routes/auth');
const AulaHelperRoutes = require('./routes/aula-helpers');
const OracaoRoutes = require('./routes/oracao');
const VisitaRoutes = require('./routes/visita');
const BibliaRoutes = require('./routes/biblia');

hbs.registerHelper('uppercase', function(text) {
  return text.toUpperCase();
});

hbs.registerHelper('sum', function(a, b) {
  return a + b;
});

// Maior que 
hbs.registerHelper('gt', function (a, b) {
  return a > b;
});

// Menor que
hbs.registerHelper('lt', function (a, b) {
  return a < b;
});

// É igual a
hbs.registerHelper('equal', function (a, b) {
  return a == b;
});

// Soma 1
hbs.registerHelper('add', function (a) {
  return a+1;
});

hbs.registerHelper('tem-idade', function(age) {
  // return age? age + " anos" : "Idade não informada";
  if(age) {
    return age + " anos";
  } else {
    return "Idade não informada"
  }
});

hbs.registerHelper('data-mes-ano', function(data) {
  data = new Date(data);
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
});

app.use(session({
  secret: 'este é um secret'
}));

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
})

// Configuração da Template Engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set('view options', {
  layout: 'layouts/default'
});

app.use(express.static( path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.use('/users', [ /*middlwares*/ ], UserRoutes);

app.use('/auth', AuthRoutes);
app.use('/aula-helpers', AulaHelperRoutes);
app.use('/louvores', LouvoresRoutes)
app.use('/oracao', OracaoRoutes)
app.use('/visita', VisitaRoutes)
app.use('/biblia', BibliaRoutes)

app.get('/', function (req, res) {
  res.render('index', {
    mensagem: 'Oi, eu sou uma mensagem',
    nome: req.query.nome
  });
});

if( process.env.NODE_ENV === 'test') {
  module.exports = app;
} else {
  
  app.listen(3000, function () {
    console.log('Applicativo de exemplo escutando na porta 3000!');
  });
}
