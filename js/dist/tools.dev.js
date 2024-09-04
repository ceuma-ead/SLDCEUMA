"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function renderTools(sliderIndex) {
  var pageData = api[sliderIndex]; // Seleciona todos os contêineres onde as ferramentas podem ser inseridas

  var allContainers = document.querySelector('.icons-action--container'); // Limpa os contêineres antes de inserir novas ferramentas

  allContainers.forEach(function (container) {
    return container.innerHTML = '';
  });

  if (pageData && pageData.paramentros && pageData.paramentros.ferramentas) {
    var ferramentas = pageData.paramentros.ferramentas;

    for (var _i = 0, _Object$entries = Object.entries(ferramentas); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          ferramenta = _Object$entries$_i[1];

      // Verifica se a ferramenta está ativa
      if (ferramenta.ativa) {
        var containerClass = ferramenta.container || 'icons-action--container';
        var container = document.querySelector(".".concat(containerClass));

        if (container) {
          // Insere o HTML da ferramenta no contêiner correspondente
          container.insertAdjacentHTML('beforeend', ferramenta.html);
        } else {
          console.error("Cont\xEAiner com a classe ".concat(containerClass, " n\xE3o encontrado."));
        }
      }
    }
  } else {
    console.log('Nenhuma ferramenta ativa nesta página.');
  } // Atualiza o controle do glider se necessário


  if (typeof glider !== 'undefined') {
    glider.refresh(true);
    glider.updateControls();
  } else {
    console.error('O objeto glider não está definido.');
  }
} // Renderiza as ferramentas da página atual


renderTools(savedPosition);