var app = require('../../app');
var assert = require('assert');
var request = require('supertest')(app);

describe('Rota /users/*', function () {
  let usuarioCriado;

  describe('quando criar um usuario', function () {
    it('deve retornar sucesso e um usuario criado', function (done) {
      request.post('/users').send({
        user: {
          name: "Teste",
          age: 20
        }
      }).expect(201).end(function (err, response) {
        usuarioCriado = response.body.user;
        assert.ok(response.body.user);
        assert.equal(usuarioCriado.name, "Teste");
        done();
      })
    });
  });

  describe('quando atualizar um usuario', function () {
    it('deve retornar sucesso e o usuario atualizado', function (done) {
      request.put('/users/' + usuarioCriado.id ).send({
        user: {
          name: "Teste Atualizado",
          age: 29
        }
      }).expect(200).end(function (err, response) {
        assert.ok(response.body.user);
        assert.equal(response.body.user.name, "Teste Atualizado");
        done();
      })
    });
  });

  describe('quando buscar um usuario pelo id', function () {
    it('deve retornar sucesso e o usuario requisitado pelo id', function (done) {
      request.get('/users/' + usuarioCriado.id).expect(200).end(function (err, response) {
        assert.ok(response.body.user);
        assert.equal(response.body.user.id, usuarioCriado.id);
        done();
      })
    });
  });

  describe('quando buscar todos os usuarios', function () {
    it('deve retornar sucesso e uma lista de usuarios', function (done) {
      request.get('/users').expect(200).end(function (err, response) {
        assert.ok(response.body.users);
        done();
      })
    });
  });

  describe('quando apagar um usuario', function () {
    it('deve retornar sucesso e um payload vazio', function (done) {
      request.delete('/users/' + usuarioCriado.id).expect(200).end(function (err, response) {
        assert.ifError(err);
        assert.equal(response.body.user, undefined);
        done();
      })
    });
  });

});