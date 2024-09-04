"use strict";

function eventButton() {
  // Função para entrar/sair da tela cheia
  function Screen(tipo, elemento) {
    var elem = document.documentElement; // Seleciona o elemento raiz (html)

    if (tipo === "min") {
      elemento.ariaLabel = "max"; // elemento.innerHTML = `<i data-lucide="minimize-2"></i>`;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        // IE/Edge
        elem.msRequestFullscreen();
      }
    } else if (tipo === "max") {
      elemento.ariaLabel = "min"; // elemento.innerHTML = `<i data-lucide="maximize-2"></i>`;

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    } // Atualiza os ícones


    lucide.createIcons();
  } // Reaplica o evento de clique para o botão de tela cheia


  var btnScreen = document.querySelector(".btn-fullscreen");

  if (btnScreen) {
    btnScreen.onclick = function () {
      Screen(btnScreen.ariaLabel, btnScreen);
    };
  } else {
    console.log("Botão de tela cheia não encontrado.");
  } // Botões de Caixa de Ferramentas


  var btnFerramentas = document.querySelectorAll('.btn-ferramentas');
  var _animationShow = "animate__bounceInDown";
  var _animationHide = "animate__bounceOutUp";
  btnFerramentas.forEach(function (button, index) {
    button.addEventListener('click', function () {
      // Seleciona todas as caixas de ferramentas
      var toolBoxes = document.querySelectorAll('.box-tools-inline'); // Verifica se a caixa correspondente existe

      if (toolBoxes[index]) {
        var toolBox = toolBoxes[index]; // Verifica se a caixa está visível e alterna a exibição

        if (toolBox.style.display === 'none' || toolBox.style.display === '') {
          toolBox.style.display = 'flex';
          toolBox.classList.remove(_animationHide); // Remove a animação de saída, se houver

          toolBox.classList.add('animate__animated', _animationShow);
        } else {
          toolBox.classList.remove(_animationShow); // Remove a animação de entrada, se houver

          toolBox.classList.add('animate__animated', _animationHide); // Aguarda a animação de saída terminar para ocultar a caixa

          toolBox.addEventListener('animationend', function () {
            toolBox.style.display = 'none';
            toolBox.classList.remove('animate__animated', _animationHide);
          }, {
            once: true
          });
        }
      } else {
        console.error('Caixa de ferramentas não encontrada para este botão.');
      }
    });
  }); // Função para fechar a caixa de ferramentas ao clicar no botão de fechar

  document.querySelectorAll('#close_box').forEach(function (closeButton, index) {
    closeButton.addEventListener('click', function () {
      var toolBoxes = document.querySelectorAll('.box-tools-inline');

      if (toolBoxes[index]) {
        var toolBox = toolBoxes[index];
        toolBox.classList.remove(_animationShow); // Remove a animação de entrada, se houver

        toolBox.classList.add('animate__animated', _animationHide); // Aguarda a animação de saída terminar para ocultar a caixa

        toolBox.addEventListener('animationend', function () {
          toolBox.style.display = 'none';
          toolBox.classList.remove('animate__animated', _animationHide);
        }, {
          once: true
        });
      }
    });
  });
} // Iniciar Evento


eventButton();