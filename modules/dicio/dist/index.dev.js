"use strict";

function requisicao(url) {
  var proxyUrl, fullUrl, response, data;
  return regeneratorRuntime.async(function requisicao$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          proxyUrl = 'https://api.allorigins.win/get?url=';
          fullUrl = proxyUrl + url;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch(fullUrl));

        case 5:
          response = _context.sent;

          if (response.ok) {
            _context.next = 8;
            break;
          }

          throw new Error('Erro ao buscar dados.');

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          data = _context.sent;
          return _context.abrupt("return", data.contents);

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](2);
          console.error('Erro:', _context.t0);
          return _context.abrupt("return", null);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 14]]);
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

function buscarPalavra(palavra) {
  var loading, resultContainer, url, dados, parser, doc, titulo, content, html, audioButton;
  return regeneratorRuntime.async(function buscarPalavra$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          loading = document.getElementById('loading-dicionario');
          resultContainer = document.getElementById('result-dicionario');
          url = "https://www.dicio.com.br/".concat(palavra, "/");

          if (loading) {
            loading.style.display = 'block';
            resultContainer.innerHTML = "";
          }

          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(requisicao(url));

        case 7:
          dados = _context2.sent;

          if (dados) {
            _context2.next = 10;
            break;
          }

          throw new Error("Erro ao obter dados do Dicionário.");

        case 10:
          parser = new DOMParser();
          doc = parser.parseFromString(dados, 'text/html');
          titulo = doc.querySelector(".tit-significado");
          content = doc.querySelector(".significado");

          if (titulo && content) {
            html = "\n            <button id=\"audio-button\" class=\"btn btn-secondary mt-3\">\uD83D\uDD0A Ouvir Texto</button>\n                <div class=\"titulo\">\n                    ".concat(titulo.innerHTML, "\n                </div>\n                <div class=\"conteudo\">\n                    ").concat(content.innerHTML, "\n                </div>\n            ");
            $("#result-dicionario").html(html);
            audioButton = document.getElementById("audio-button");

            audioButton.onclick = function () {
              var speechText = "".concat(titulo.innerText, ", ").concat(content.innerText);
              lerTexto(speechText);
            };
          } else {
            $("#result-dicionario").html("<p>Conteúdo não encontrado para esta palavra.</p>");
          }

          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0);
          $("#result-dicionario").html("<p>Erro ao buscar a palavra.</p>");

        case 21:
          _context2.prev = 21;

          if (loading) {
            loading.style.display = 'none';
          }

          return _context2.finish(21);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 17, 21, 24]]);
} // Função para ler o texto em voz alta


function lerTexto(texto) {
  var synth = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'pt-BR';
  synth.speak(utterance);
} // Conectar o botão de pesquisa ao evento click


document.getElementById('buscarPalavra').addEventListener('click', function _callee2() {
  var palavra, listaProcurar, a;
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          palavra = document.getElementById('search-input').value.trim();

          if (!palavra) {
            _context4.next = 8;
            break;
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(buscarPalavra(palavra));

        case 4:
          listaProcurar = document.querySelector("#enchant");

          if (listaProcurar) {
            a = listaProcurar.querySelectorAll("._sugg");
            a.forEach(function (ancho, index) {
              // console.log(ancho)
              ancho.href = "#";

              ancho.onclick = function _callee(event) {
                var link;
                return regeneratorRuntime.async(function _callee$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        // alert(link.innerHTML)
                        link = ancho.querySelector(".list-link");
                        document.getElementById('search-input').value = link.innerHTML;
                        _context3.next = 4;
                        return regeneratorRuntime.awrap(buscarPalavra(link.innerHTML));

                      case 4:
                        fecharMenuDicionario();
                        abrirDicionario();

                      case 6:
                      case "end":
                        return _context3.stop();
                    }
                  }
                });
              };
            });
          }

          _context4.next = 9;
          break;

        case 8:
          alert("Por favor, digite uma palavra!");

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
});
checkEmptyDicionarioContainer();