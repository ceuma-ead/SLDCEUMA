"use strict";

// Função para abrir o sumário
function abrirSumario() {
  var botaoAbrirSumario = document.getElementById('btnOpenSumario');
  var menuSumario = document.querySelector('.sidebar-menu');
  botaoAbrirSumario.addEventListener('click', function (evento) {
    evento.stopPropagation(); // Fecha o menu de anotações, se estiver aberto

    fecharMenuAnotacoes();
    menuSumario.classList.toggle('open');
    var iconeMenuSumario = document.getElementById('menuIcon');
    var botaoAbrirAnotacoes = document.querySelector('.openAnnotation');

    if (menuSumario.classList.contains('open')) {
      iconeMenuSumario.setAttribute('data-lucide', 'x');
      botaoAbrirSumario.setAttribute('vizioon-tip', 'Fechar Sumário');
    } else {
      iconeMenuSumario.setAttribute('data-lucide', 'notebook-text');
      botaoAbrirSumario.setAttribute('vizioon-tip', 'Abrir Sumário');
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  });
  document.addEventListener('click', function (evento) {
    if (menuSumario.classList.contains('open') && !menuSumario.contains(evento.target) && evento.target !== botaoAbrirSumario) {
      fecharMenuSumario();
    }
  });
} // Função para abrir o menu de anotações


function abrirAnotacoes() {
  var botaoAbrirAnotacoes = document.querySelector('.openAnnotation');
  var menuAnotacoes = document.querySelector('.sidebar-menu-Annotation');
  botaoAbrirAnotacoes.addEventListener('click', function (evento) {
    evento.stopPropagation(); // Fecha o menu de sumário, se estiver aberto

    fecharMenuSumario();
    menuAnotacoes.classList.toggle('open-annotation'); // Pegar ID Personalizado para Mudar o Nome do Tooltip...

    var vizioon_anotation = document.querySelector(".vizion-annotation"); // console.log(vizioon_anotation)

    var iconeMenuAnotacoes = document.getElementById("iconAnnotatio");

    if (menuAnotacoes.classList.contains('open-annotation')) {
      iconeMenuAnotacoes.setAttribute('data-lucide', 'x');
      botaoAbrirAnotacoes.setAttribute('vizioon-tip', 'Fechar Anotações ❌');
      vizioon_anotation.innerHTML = "Fechar Anota\xE7\xF5es \u274C";
    } else {
      iconeMenuAnotacoes.setAttribute('data-lucide', 'sticker');
      botaoAbrirAnotacoes.setAttribute('vizioon-tip', 'Veja Suas Anotações Aqui 🤩!!!');
      vizioon_anotation.innerHTML = "Veja Suas Anota\xE7\xF5es Aqui \uD83E\uDD29!!!";
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  });
  document.addEventListener('click', function (evento) {
    if (menuAnotacoes.classList.contains('open-annotation') && !menuAnotacoes.contains(evento.target) && evento.target !== botaoAbrirAnotacoes) {
      fecharMenuAnotacoes();
    }
  });
} // Função para fechar o menu de sumário


function fecharMenuSumario() {
  var menuSumario = document.querySelector('.sidebar-menu');
  var botaoAbrirSumario = document.getElementById('btnOpenSumario');
  var iconeMenuSumario = document.getElementById('menuIcon');

  if (menuSumario.classList.contains('open')) {
    menuSumario.classList.remove('open');
    iconeMenuSumario.setAttribute('data-lucide', 'notebook-text');
    botaoAbrirSumario.setAttribute('vizioon-tip', 'Abrir Sumário');

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }
} // Função para fechar o menu de anotações


function fecharMenuAnotacoes() {
  var menuAnotacoes = document.querySelector('.sidebar-menu-Annotation');
  var botaoAbrirAnotacoes = document.querySelector('.openAnnotation');
  var iconeMenuAnotacoes = document.getElementById("iconAnnotatio"); // Pegar ID Personalizado para Mudar o Nome do Tooltip...

  if (menuAnotacoes.classList.contains('open-annotation')) {
    var vizioon_anotation = document.querySelector(".vizion-annotation");
    menuAnotacoes.classList.remove('open-annotation');
    iconeMenuAnotacoes.setAttribute('data-lucide', 'sticker');
    botaoAbrirAnotacoes.setAttribute('vizioon-tip', 'Veja Suas Anotações Aqui 🤩!!!');

    if (vizioon_anotation) {
      vizioon_anotation.innerHTML = "Veja Suas Anota\xE7\xF5es Aqui \uD83E\uDD29!!!";
      vizioon_anotation.style.display = "none";
    }

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  abrirSumario();
  abrirAnotacoes();
  var iconAnnotation = checkEmptyAnnotationsContainer();
  var iconeMenuAnotacoes = document.getElementById("iconAnnotatio");

  if (iconAnnotation) {
    console.log("Container não está vazio");
    iconeMenuAnotacoes.setAttribute('data-lucide', 'sticker'); // Defina o ícone correto aqui
  } else {
    console.log("Container está vazio");
    iconeMenuAnotacoes.setAttribute('data-lucide', 'sticky-note'); // Defina o ícone correto aqui
  } // Atualize os ícones para garantir que a nova configuração seja aplicada


  if (typeof lucide !== 'undefined') {
    lucide.createIcons(); // Certifique-se de que lucide está definido e carregado corretamente
  }
});