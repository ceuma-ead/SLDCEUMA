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
          loading = document.getElementById('loading-dicionario'); // Certifique-se que o ID está correto

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
} // Função para verificar se o contêiner de anotações está vazio


function checkEmptyDicionarioContainer() {
  var renderMenuDiv = document.querySelector('.render-dicionario'); // Obtém todos os filhos, exceto a mensagem de "vazio"

  var children = Array.from(renderMenuDiv.children);
  var nonEmptyChildren = children.filter(function (child) {
    return !child.classList.contains('render-dicionario-result');
  }); // Verifica se o contêiner está vazio, desconsiderando a mensagem de "vazio"

  if (nonEmptyChildren.length === 0) {
    // Se a mensagem de "vazio" não estiver presente, adicione-a
    var emptyMessage = renderMenuDiv.querySelector('.empty-annotation-message');
    renderMenuDiv.innerHTML = "";

    if (!emptyMessage) {
      emptyMessage = document.createElement('div');
      emptyMessage.classList.add('empty-annotation-message');
      emptyMessage.innerHTML = "\n                <div class=\"d-flex align-content-center flex-column justify-content-center w-100 h-100 align-items-center\">\n                    <img src=\"./assets/list.gif\" alt=\"list-is-empty-unscreen1.gif\" style=\"width:20%;\" >\n                    <p style=\"color:#000;\" class=\"text-center\">Digite um \"Termo\" para come\xE7ar a Busca.</p>\n                </div>\n            ";
      renderMenuDiv.appendChild(emptyMessage);
    }

    return false; // Retorna false porque o contêiner está vazio
  } else {
    // Remove a mensagem de "vazio" se ela existir
    var _emptyMessage = renderMenuDiv.querySelector('.empty-annotation-message');

    if (_emptyMessage) {
      renderMenuDiv.removeChild(_emptyMessage);
    }

    return true; // Retorna true porque o contêiner tem anotações
  }
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
              _context4.next = 16;
              break;
            }

            // Verifica se o campo de entrada foi encontrado
            palavra = searchInput.value.trim(); // verificar se o campo é vazio 

            if (!(searchInput.value !== "")) {
              _context4.next = 13;
              break;
            }

            if (!palavra) {
              _context4.next = 10;
              break;
            }

            _context4.next = 6;
            return regeneratorRuntime.awrap(buscarPalavra(palavra));

          case 6:
            sugestoes_lista = document.querySelector("#sugestoes-lista");

            if (sugestoes_lista) {
              items = sugestoes_lista.querySelectorAll("a");
              items.forEach(function (a, index) {
                a.href = "#";

                a.onclick = function _callee(event) {
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
                          fecharMenuDicionario();
                          abrirDicionario();

                        case 5:
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

            _context4.next = 11;
            break;

          case 10:
            checkEmptyDicionarioContainer();

          case 11:
            _context4.next = 14;
            break;

          case 13:
            console.log("Dicionario Não encontrou Verbete...");

          case 14:
            _context4.next = 17;
            break;

          case 16:
            console.error('Campo de busca não encontrado!');

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
});
checkEmptyDicionarioContainer();