"use strict";

function requisicao(url) {
  var resposta, contentType, dados;
  return regeneratorRuntime.async(function requisicao$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url, {
            method: 'GET'
          }));

        case 2:
          resposta = _context.sent;
          contentType = resposta.headers.get('content-type');

          if (!(contentType && contentType.includes('application/json'))) {
            _context.next = 10;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(resposta.json());

        case 7:
          dados = _context.sent;
          _context.next = 13;
          break;

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(resposta.text());

        case 12:
          dados = _context.sent;

        case 13:
          return _context.abrupt("return", dados);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
}

function buscarPalavra(palavra) {
  var dados, parser, doc, verbete;
  return regeneratorRuntime.async(function buscarPalavra$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(requisicao("https://michaelis.uol.com.br/moderno-portugues/busca/portugues-brasileiro/".concat(palavra, "/")));

        case 2:
          dados = _context2.sent;

          if (!(typeof dados === 'string')) {
            _context2.next = 14;
            break;
          }

          parser = new DOMParser();
          doc = parser.parseFromString(dados, 'text/html');
          verbete = doc.querySelector('#content');

          if (!verbete) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", verbete.innerHTML);

        case 11:
          return _context2.abrupt("return", 'Definição não encontrada.');

        case 12:
          _context2.next = 15;
          break;

        case 14:
          return _context2.abrupt("return", 'Erro ao processar a requisição.');

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search-form').addEventListener('submit', function _callee(event) {
    var palavra, resultado;
    return regeneratorRuntime.async(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            event.preventDefault();
            palavra = document.getElementById('search-input').value;
            _context3.next = 4;
            return regeneratorRuntime.awrap(buscarPalavra(palavra));

          case 4:
            resultado = _context3.sent;
            document.getElementById('result').innerHTML = resultado;

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
});