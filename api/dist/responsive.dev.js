"use strict";

var responsivo = [{
  // Onde o Estilo tem que aparecer 
  "Tipo": 2,
  // Pode ser "All" para todas as páginas ou um número específico para uma página
  // Que tipo de quebra Tem que Fazer
  "media": "(max-width: 1366px)",
  // Apenas a condição dentro dos parênteses
  // Estilos que podem vir adicionais
  "synchronous": "\n             .pagina-tipo-texto--box-texto p{\n                    // font-size: 0.9rem;\n                    // background-color: aqua;\n             }\n        ",
  // Atualização Forçada onde ele está aparecendo
  "variantes": "\n            // --tamanho-de-font-para-paragrafo-sidebar=[1rem];\n            --font-para-paragrafos=[1rem]\n        ",
  "atualizacaoBrutaElementos": [// Exemplos de atualizações brutas de elementos
    // {
    //     "Elemento":"p",
    //     "Ranger":[...10] // ranger 1 a 10 Ex: [1,2,3,4] ou [...10] ou all
    //      "scriptAtualizacao":`
    //          [document.querySelectorAll(p)] => var[p] {
    //              p.fontSize = 2rem;
    //          }
    //      `
    // }
  ]
}];

function aplicarVariantes(variantes, media) {
  // Verificar se a condição da media query é verdadeira
  if (window.matchMedia(media).matches) {
    // Dividir as variantes por ponto e vírgula
    var variaveis = variantes.split(';');
    variaveis.forEach(function (variavel) {
      if (variavel.trim()) {
        // Remover espaços em branco
        variavel = variavel.trim(); // Encontrar o índice do símbolo '=' para separar o nome e o valor

        var index = variavel.indexOf('=');

        if (index !== -1) {
          // Extrair o nome da variável
          var nomeVariavel = variavel.substring(0, index).trim(); // Extrair o valor da variável, removendo os colchetes

          var valorVariavel = variavel.substring(index + 1).replace('[', '').replace(']', '').trim(); // Aplicar a variável CSS dinamicamente

          document.documentElement.style.setProperty(nomeVariavel, valorVariavel);
        }
      }
    });
  }
}

function responsivePage(slideIndex) {
  var pageData = api[slideIndex]; // Página para Exibir Estilos

  var idPage = pageData.pagina; // Verificar se é para todas as páginas ou uma página específica

  responsivo.forEach(function (config) {
    // Se for "All", aplica para todas as páginas
    if (config.Tipo === "All") {
      aplicarVariantes(config.variantes, config.media);
      adicionarEstilos(config.media, config.synchronous);
    } // Senão, aplica apenas para a página especificada
    else if (config.Tipo === idPage) {
        aplicarVariantes(config.variantes, config.media);
        adicionarEstilos(config.media, config.synchronous);
      }
  });
}

function adicionarEstilos(media, estilos) {
  var estilo = document.createElement('style');
  estilo.type = 'text/css'; // Adiciona os estilos na media query especificada

  estilo.innerHTML = "@media screen and ".concat(media, " { ").concat(estilos, " }");
  document.head.appendChild(estilo);
} // Chama a função responsiva para o slide atual


responsivePage(savedPosition);