"use strict";

var toolbar = document.getElementById('toolbar');
var cores_marcador = [{
  nome: 'verde',
  className: 'marcador-verde',
  icone: '🟢'
}, {
  nome: 'vermelho',
  className: 'marcador-vermelho',
  icone: '🔴'
}];

function inicializarToolbarFerramentas() {
  cores_marcador.forEach(function (cor) {
    var btn = document.createElement('button');
    btn.textContent = cor.icone;
    btn.addEventListener('click', function () {
      return marcarTexto(cor.className);
    });
    toolbar.appendChild(btn);
  });
  var btnPesquisa = document.createElement('button');
  btnPesquisa.textContent = '🔍';
  btnPesquisa.addEventListener('click', realizarPesquisa);
  toolbar.appendChild(btnPesquisa);
  var btnLimpar = document.createElement('button');
  btnLimpar.textContent = '❌';
  btnLimpar.addEventListener('click', limparMarcacao);
  toolbar.appendChild(btnLimpar);
}

inicializarToolbarFerramentas();
document.addEventListener('mouseup', function (event) {
  var textoSelecionado = window.getSelection().toString().trim();

  if (textoSelecionado) {
    var range = window.getSelection().getRangeAt(0);
    var rect = range.getBoundingClientRect();
    toolbar.style.top = "".concat(rect.top + window.scrollY - toolbar.offsetHeight, "px");
    toolbar.style.left = "".concat(rect.left + window.scrollX, "px");
    toolbar.style.display = 'block';
  } else {
    toolbar.style.display = 'none';
  }
});

function marcarTexto(className) {
  var selecao = window.getSelection();
  var range = selecao.getRangeAt(0);
  var textoSelecionado = selecao.toString();
  var container = range.startContainer;
  var paragrafo = container.nodeType === Node.ELEMENT_NODE ? container : container.parentElement.closest('p');

  if (paragrafo && paragrafo.nodeName === 'P') {
    var novaMarcacao = document.createElement('span');
    novaMarcacao.className = className;
    novaMarcacao.textContent = textoSelecionado;
    range.deleteContents();
    range.insertNode(novaMarcacao);
    salvarMarcacao(paragrafo, textoSelecionado, className);
  }

  toolbar.style.display = 'none';
  selecao.removeAllRanges();
}

function limparMarcacao() {
  var selecao = window.getSelection();
  var range = selecao.getRangeAt(0);
  var container = range.startContainer;
  var paragrafo = container.nodeType === Node.ELEMENT_NODE ? container : container.parentElement.closest('p');
  var textoSelecionado = selecao.toString();

  if (paragrafo && paragrafo.nodeName === 'P') {
    paragrafo.innerHTML = paragrafo.innerHTML.replace(new RegExp("<span class=\"[^\"]*\">".concat(textoSelecionado, "</span>"), 'g'), textoSelecionado);
    removerMarcacao(paragrafo, textoSelecionado);
  }

  toolbar.style.display = 'none';
  selecao.removeAllRanges();
}

function salvarMarcacao(paragrafo, textoSelecionado, className) {
  var indexParagrafo = Array.from(document.querySelectorAll('p')).indexOf(paragrafo);
  var marcacoes = JSON.parse(localStorage.getItem('marcacoes')) || [];
  marcacoes.push({
    indexParagrafo: indexParagrafo,
    textoSelecionado: textoSelecionado,
    className: className
  });
  localStorage.setItem('marcacoes', JSON.stringify(marcacoes));
}

function removerMarcacao(paragrafo, textoSelecionado) {
  var indexParagrafo = Array.from(document.querySelectorAll('p')).indexOf(paragrafo);
  var marcacoes = JSON.parse(localStorage.getItem('marcacoes')) || [];
  marcacoes = marcacoes.filter(function (marcacao) {
    return marcacao.indexParagrafo !== indexParagrafo || marcacao.textoSelecionado !== textoSelecionado;
  });
  localStorage.setItem('marcacoes', JSON.stringify(marcacoes));
}

function realizarPesquisa() {
  var textoSelecionado = window.getSelection().toString().trim();

  if (textoSelecionado) {
    window.open("https://www.google.com/search?q=".concat(encodeURIComponent(textoSelecionado)), '_blank');
  }
} // Carrega as marcações salvas ao carregar a página


document.addEventListener('DOMContentLoaded', function () {
  var marcacoes = JSON.parse(localStorage.getItem('marcacoes')) || [];
  var paragrafos = document.querySelectorAll('p');
  marcacoes.forEach(function (_ref) {
    var indexParagrafo = _ref.indexParagrafo,
        textoSelecionado = _ref.textoSelecionado,
        className = _ref.className;
    var paragrafo = paragrafos[indexParagrafo];

    if (paragrafo) {
      paragrafo.innerHTML = paragrafo.innerHTML.replace(new RegExp(textoSelecionado, 'g'), "<span class=\"".concat(className, "\">").concat(textoSelecionado, "</span>"));
    }
  });
}); // Plugin: Adicionar nova ferramenta ao toolbar

function adicionarFerramenta(icone, acao) {
  var btn = document.createElement('button');
  btn.textContent = icone;
  btn.addEventListener('click', acao);
  toolbar.appendChild(btn);
} // Exemplo: Adicionando uma nova ferramenta ao toolbar


adicionarFerramenta('🖌️', function () {
  return alert('Nova ferramenta adicionada!');
});