"use strict";

function eventButton() {
  // Função de tela cheia
  function fullScreen() {
    alert('Oi');
  } // Reaplica o evento de clique para o botão de tela cheia


  var btnScreen = document.querySelector(".btn-fullscreen");

  if (btnScreen) {
    btnScreen.onclick = function () {
      fullScreen();
    };
  } else {
    console.log("Botão de tela cheia não encontrado.");
  }
}

function renderTools(sliderIndex) {
  var pageData = api[sliderIndex]; // Seleciona todos os contêineres onde as ferramentas podem ser inseridas

  var allContainers = document.querySelectorAll('.icons-action--container'); // Limpa os contêineres antes de inserir novas ferramentas

  allContainers.forEach(function (container) {
    return container.innerHTML = '';
  }); // Limpa os contêineres móveis

  var allContainersMobile = document.querySelectorAll('.icons-action--container-mobile');
  allContainersMobile.forEach(function (container) {
    return container.innerHTML = '';
  }); // Verifica se a página possui ferramentas

  if (pageData && pageData.paramentros && pageData.paramentros.ferramentas) {
    var ferramentas = pageData.paramentros.ferramentas;
    ferramentas.forEach(function (ferramentaGrupo) {
      for (var key in ferramentaGrupo) {
        if (key !== 'container' && ferramentaGrupo[key].ativa) {
          var containerClass = ferramentaGrupo.container || 'icons-action--container';
          var container = document.querySelector(".".concat(containerClass));

          if (container) {
            // Insere o HTML da ferramenta no contêiner correspondente
            container.insertAdjacentHTML('beforeend', ferramentaGrupo[key].html);
          } else {
            console.error("Cont\xEAiner com a classe ".concat(containerClass, " n\xE3o encontrado."));
          }
        }
      }
    }); // Aplica novamente os ícones

    lucide.createIcons(); // Chama a função para associar eventos aos botões

    eventButton();
  } else {
    console.log('Nenhuma ferramenta ativa para esta página.');
  } // Atualiza o glider se ele estiver definido


  if (typeof glider !== 'undefined') {
    glider.refresh(true);
    glider.updateControls();
  } else {
    console.error('O objeto glider não está definido.');
  }
} // Exemplo de chamada da função


renderTools(savedPosition);