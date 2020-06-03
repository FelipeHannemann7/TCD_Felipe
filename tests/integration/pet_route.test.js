var app = require('../../app');
var assert = require('assert');
var request = require('supertest')(app);

describe('Rota /pets/*', function () {
  describe('quando buscar todos os pets', function () {
    it('deve retornar sucesso e uma lista de pets', function (done) {
      request.get('/pets').expect(200).end(function (err, response) {
        assert.ok(response.body.pets);
        done();
      })
    });
  });
});