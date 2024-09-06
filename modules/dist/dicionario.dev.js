"use strict";

function requisicao(url) {
  return regeneratorRuntime.async(function requisicao$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function () {
              if (xhr.status === 200) {
                resolve(xhr.responseText);
              } else {
                reject('Erro ao buscar dados.');
              }
            };

            xhr.onerror = function () {
              reject('Erro de rede.');
            };

            xhr.send();
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function buscarPalavra(palavra) {
  var loading, resultContainer, dados, parser, doc, verbete;
  return regeneratorRuntime.async(function buscarPalavra$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          loading = document.getElementById('loader-annotation'); // Certifique-se que o ID está correto

          resultContainer = document.getElementById('result');

          if (loading) {
            // Exibe o loader
            loading.style.display = 'block';
            resultContainer.innerHTML = ''; // Limpa os resultados anteriores
          }

          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(requisicao("https://michaelis.uol.com.br/moderno-portugues/busca/portugues-brasileiro/".concat(palavra, "/")));

        case 6:
          dados = _context2.sent;
          parser = new DOMParser();
          doc = parser.parseFromString(dados, 'text/html');
          verbete = doc.querySelector('#content');

          if (verbete) {
            renderizarResultado(verbete.innerHTML, palavra);
          } else {
            renderizarResultado('Definição não encontrada.', palavra);
          }

          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](3);
          renderizarResultado(_context2.t0, palavra);

        case 16:
          _context2.prev = 16;

          if (loading) {
            // Esconde o loader
            loading.style.display = 'none';
          }

          return _context2.finish(16);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 13, 16, 19]]);
}

function renderizarResultado(definicao, palavra) {
  var resultContainer = document.getElementById('result');
  var itemDiv = document.createElement('div');
  itemDiv.classList.add('render-dicionario-result');
  var palavraSpan = document.createElement('span');
  palavraSpan.textContent = palavra;
  var definicaoP = document.createElement('p');
  definicaoP.innerHTML = definicao;
  itemDiv.appendChild(palavraSpan);
  itemDiv.appendChild(definicaoP);
  resultContainer.appendChild(itemDiv);
}

document.addEventListener('DOMContentLoaded', function () {
  var buscarButton = document.querySelector('.buscarPalavra');
  var searchInput = document.getElementById('search-input'); // Verificação direta do input

  buscarButton.addEventListener('click', function _callee2() {
    var palavra, sugestoes_lista, items;
    return regeneratorRuntime.async(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!searchInput) {
              _context4.next = 9;
              break;
            }

            // Verifica se o campo de entrada foi encontrado
            palavra = searchInput.value.trim();

            if (!palavra) {
              _context4.next = 7;
              break;
            }

            _context4.next = 5;
            return regeneratorRuntime.awrap(buscarPalavra(palavra));

          case 5:
            sugestoes_lista = document.querySelector("#sugestoes-lista");

            if (sugestoes_lista) {
              items = sugestoes_lista.querySelectorAll("a");
              items.forEach(function (a, index) {
                a.href = "#";

                a.onclick = function _callee() {
                  return regeneratorRuntime.async(function _callee$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          // cal<ei>1</ei>
                          // alert(a.innerHTML)
                          searchInput.value = a.innerHTML;
                          _context3.next = 3;
                          return regeneratorRuntime.awrap(buscarPalavra(a.innerHTML));

                        case 3:
                          abrirDicionario();

                        case 4:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  });
                };
              });
            } else {
              console.log("Sugestões não Encontradas...");
            }

          case 7:
            _context4.next = 10;
            break;

          case 9:
            console.error('Campo de busca não encontrado!');

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
});