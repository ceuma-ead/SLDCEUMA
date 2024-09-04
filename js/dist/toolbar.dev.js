// // <div class="toolbar" id="toolbar"></div> 
// const toolbar = document.getElementById('toolbar');
// const cores_marcador = [
//     { nome: 'verde', className: 'marcador-verde', icone: '🟢' },
//     { nome: 'vermelho', className: 'marcador-vermelho', icone: '🔴' }
// ];
// function inicializarToolbarFerramentas() {
//     cores_marcador.forEach((cor) => {
//         const btn = document.createElement('button');
//         btn.textContent = cor.icone;
//         btn.addEventListener('click', () => marcarTexto(cor.className));
//         toolbar.appendChild(btn);
//     });
//     const btnPesquisa = document.createElement('button');
//     btnPesquisa.textContent = '🔍';
//     btnPesquisa.addEventListener('click', realizarPesquisa);
//     toolbar.appendChild(btnPesquisa);
//     const btnLimpar = document.createElement('button');
//     btnLimpar.textContent = '❌';
//     btnLimpar.addEventListener('click', limparMarcacao);
//     toolbar.appendChild(btnLimpar);
// }
// inicializarToolbarFerramentas();
// document.addEventListener('mouseup', function(event) {
//     const textoSelecionado = window.getSelection().toString().trim();
//     if (textoSelecionado) {
//         const range = window.getSelection().getRangeAt(0);
//         const rect = range.getBoundingClientRect();
//         toolbar.style.top = `${rect.top + window.scrollY - toolbar.offsetHeight}px`;
//         toolbar.style.left = `${rect.left + window.scrollX}px`;
//         toolbar.style.display = 'block';
//     } else {
//         toolbar.style.display = 'none';
//     }
// });
// function marcarTexto(className) {
//     const selecao = window.getSelection();
//     const range = selecao.getRangeAt(0);
//     const textoSelecionado = selecao.toString();
//     const container = range.startContainer;
//     const paragrafo = container.nodeType === Node.ELEMENT_NODE
//         ? container
//         : container.parentElement.closest('p');
//     if (paragrafo && paragrafo.nodeName === 'P') {
//         const novaMarcacao = document.createElement('span');
//         novaMarcacao.className = className;
//         novaMarcacao.textContent = textoSelecionado;
//         range.deleteContents();
//         range.insertNode(novaMarcacao);
//         salvarMarcacao(paragrafo, textoSelecionado, className);
//     }
//     toolbar.style.display = 'none';
//     selecao.removeAllRanges();
// }
// function limparMarcacao() {
//     const selecao = window.getSelection();
//     const range = selecao.getRangeAt(0);
//     const container = range.startContainer;
//     const paragrafo = container.nodeType === Node.ELEMENT_NODE
//         ? container
//         : container.parentElement.closest('p');
//     const textoSelecionado = selecao.toString();
//     if (paragrafo && paragrafo.nodeName === 'P') {
//         paragrafo.innerHTML = paragrafo.innerHTML.replace(
//             new RegExp(`<span class="[^"]*">${textoSelecionado}</span>`, 'g'),
//             textoSelecionado
//         );
//         removerMarcacao(paragrafo, textoSelecionado);
//     }
//     toolbar.style.display = 'none';
//     selecao.removeAllRanges();
// }
// function salvarMarcacao(paragrafo, textoSelecionado, className) {
//     const indexParagrafo = Array.from(document.querySelectorAll('p')).indexOf(paragrafo);
//     let marcacoes = JSON.parse(localStorage.getItem('marcacoes')) || [];
//     marcacoes.push({ indexParagrafo, textoSelecionado, className });
//     localStorage.setItem('marcacoes', JSON.stringify(marcacoes));
// }
// function removerMarcacao(paragrafo, textoSelecionado) {
//     const indexParagrafo = Array.from(document.querySelectorAll('p')).indexOf(paragrafo);
//     let marcacoes = JSON.parse(localStorage.getItem('marcacoes')) || [];
//     marcacoes = marcacoes.filter(marcacao => 
//         marcacao.indexParagrafo !== indexParagrafo || 
//         marcacao.textoSelecionado !== textoSelecionado
//     );
//     localStorage.setItem('marcacoes', JSON.stringify(marcacoes));
// }
// function realizarPesquisa() {
//     const textoSelecionado = window.getSelection().toString().trim();
//     if (textoSelecionado) {
//         window.open(`https://www.google.com/search?q=${encodeURIComponent(textoSelecionado)}`, '_blank');
//     }
// }
// // Carrega as marcações salvas ao carregar a página
// document.addEventListener('DOMContentLoaded', function() {
//     const marcacoes = JSON.parse(localStorage.getItem('marcacoes')) || [];
//     const paragrafos = document.querySelectorAll('p');
//     marcacoes.forEach(({ indexParagrafo, textoSelecionado, className }) => {
//         const paragrafo = paragrafos[indexParagrafo];
//         if (paragrafo) {
//             paragrafo.innerHTML = paragrafo.innerHTML.replace(
//                 new RegExp(textoSelecionado, 'g'),
//                 `<span class="${className}">${textoSelecionado}</span>`
//             );
//         }
//     });
// });
// // Plugin: Adicionar nova ferramenta ao toolbar
// function adicionarFerramenta(icone, acao) {
//     const btn = document.createElement('button');
//     btn.textContent = icone;
//     btn.addEventListener('click', acao);
//     toolbar.appendChild(btn);
// }
// // Exemplo: Adicionando uma nova ferramenta ao toolbar
// adicionarFerramenta('🖌️', () => alert('Nova ferramenta adicionada!'));
"use strict";