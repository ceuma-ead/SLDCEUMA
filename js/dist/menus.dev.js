"use strict";

document.addEventListener('DOMContentLoaded', function () {
  abrirSumario();
  abrirAnotacoes();
}); // Função para abrir o sumário

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
    evento.stopPropagation(); // verificar se container é vazio pra mudar o icon

    var iconAnnotation = checkEmptyAnnotationsContainer(); // Verificar e remover a classe 'close-annotation' se ela existir pois ele fecha a 
    // esquerda

    if (menuAnotacoes.classList.contains('close-annotation')) {
      menuAnotacoes.classList.remove('close-annotation');
    } // Verificar se está à esquerda e adicionar a classe 'close-annotation'


    if (menuAnotacoes.classList.contains('left')) {
      menuAnotacoes.classList.remove('left');
      menuAnotacoes.classList.add('close-annotation');
    } // Fecha o menu de sumário, se estiver aberto


    fecharMenuSumario();
    menuAnotacoes.classList.toggle('open-annotation'); // Pegar ID Personalizado para Mudar o Nome do Tooltip...

    var vizioon_anotation = document.querySelector(".vizion-annotation"); // console.log(vizioon_anotation)

    var iconeMenuAnotacoes = document.getElementById("iconAnnotatio");

    if (menuAnotacoes.classList.contains('open-annotation')) {
      iconeMenuAnotacoes.setAttribute('data-lucide', 'x');
      botaoAbrirAnotacoes.setAttribute('vizioon-tip', 'Fechar Anotações ❌');
      vizioon_anotation.innerHTML = "Fechar Anota\xE7\xF5es \u274C";
    } else {
      iconeMenuAnotacoes.setAttribute('data-lucide', iconAnnotation ? "sticker" : "sticky-note");
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
}

function fecharMenuAnotacoes() {
  var menuAnotacoes = document.querySelector('.sidebar-menu-Annotation');
  var botaoAbrirAnotacoes = document.querySelector('.openAnnotation');
  var iconeMenuAnotacoes = document.getElementById("iconAnnotatio");
  var vizioon_anotation = document.querySelector(".vizion-annotation"); // Verificar se o container é vazio para mudar o ícone

  var iconAnnotation = checkEmptyAnnotationsContainer();

  if (menuAnotacoes.classList.contains('open-annotation')) {
    menuAnotacoes.classList.remove('open-annotation'); // Verificar se está à esquerda e adicionar a classe 'close-annotation'

    if (menuAnotacoes.classList.contains('left')) {
      menuAnotacoes.classList.remove('left');
      menuAnotacoes.classList.add('close-annotation');
    } // Atualizar o ícone e o tooltip


    iconeMenuAnotacoes.setAttribute('data-lucide', iconAnnotation ? "sticker" : "sticky-note");
    botaoAbrirAnotacoes.setAttribute('vizioon-tip', 'Veja Suas Anotações Aqui 🤩!!!');

    if (vizioon_anotation) {
      vizioon_anotation.innerHTML = 'Veja Suas Anotações Aqui 🤩!!!';
      vizioon_anotation.style.display = 'none';
    } // Atualizar ícones, se necessário


    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }
}