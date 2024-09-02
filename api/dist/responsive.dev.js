"use strict";

var responsivo = [{
  // Onde o Estilo tem que aparecer 
  "Tipo": "All",
  // Pode ser "All" para todas as páginas ou um número específico para uma página
  // Que tipo de quebra Tem que Fazer
  "media": "(max-width: 1240px)",
  // Apenas a condição dentro dos parênteses
  // Estilos que podem vir adicionais
  "synchronous": "\n             .pagina-tipo-texto--box-texto p{\n             margin-bottom: 0.3rem !important;\n                    font-size: 0.8rem !important;\n                    // background-color: aqua;\n             }\n\n            .header-title p {\n                margin-bottom: 0.3rem !important;\n\n            }\n\n            svg {\n                padding: 2px !important;\n            \n            }\n\n            #dots {\n                bottom: 8%;\n                align-items: normal;\n            }\n\n            .animated-text {\n                font-size: 4vw;\n            }\n\n            #second-text {\n                font-size: 2.5vw;\n            }\n\n            #animated-button {\n                margin-top: 15px;\n                font-size: 1.8vw;\n            }\n\n            .sidebar-menu {\n                width: 300px;\n                height: 21rem;\n                padding: 0.8rem;\n            }\n\n            .sidebar-menu header {\n                padding: 0.2rem;\n            }\n\n\n\n            .mola-encardernamento {\n                width: 9%;\n                height: 92%;\n                margin-left: -1.85rem;\n                background-size: 100%;\n            }\n\n            .render-menu a {\n                height: 35px;\n                font-size: 13px !important;\n            }\n\n\n            .searcListMateria {\n                margin: 0.3rem 0;\n            }\n\n            .sidebar-menu-Annotation {\n                width: 300px;\n                height: 20rem;\n            }\n\n            .sidebar-menu-Annotation header {\n                    padding: 0.2rem;\n            }\n                \n            hr {\n                margin: 0.2rem 0;\n            }\n\n            .searcListKeyWord {\n                margin: 0.1rem 0;\n            }\n\n            .searcListKeyWord span {\n                padding: 0 0;\n            }\n\n            .container-searcListKeyWord button {\n                margin: 0.2rem;\n            }\n\n            .render-menu-Annotation {\n                padding-right: 0;\n            }\n\n            .sidebar-menu header p:nth-of-type(1){\n                font-size:1.2rem;\n            }\n\n            .sidebar-menu header p:nth-of-type(2){\n                font-size:1rem;\n            }\n\n            #image-capaOverlay {\n                max-width: 34%;\n            }  \n                \n            .olcards li .content .text {\n             font-size: 0.8rem !important;\n             text-align: justify;\n            }\n\n            .olcards, .olcards * {\n                margin: -1px 0 !important;\n                }\n\n\n            .olcards li .content {\n                padding: 0.6rem !important;\n            }\n\n            .message-text {\n                font-size: 18px;\n            }\n\n    ",
  // Atualização Forçada onde ele está aparecendo
  "variantes": "\n            --tamanho-de-font-para-paragrafo-sidebar=[1rem];\n            --tamanho-dos-icones-siderbar=[2rem];\n            --tamanho-x-y-imagem=[7%];\n            --width=[40px];\n           --height=[40px];\n        //    --tamanho-do-texto-do-paragrafo-header=[1.2rem];\n            // --font-para-paragrafos=[1rem]\n        ",
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
}, {
  //  // Onde o Estilo tem que aparecer 
  "Tipo": "All",
  // Pode ser "All" para todas as páginas ou um número específico para uma página
  //   // Que tipo de quebra Tem que Fazer
  "media": "(max-width: 480px)",
  // Apenas a condição dentro dos parênteses
  //   // Estilos que podem vir adicionais
  "synchronous": "\n                .message-box {\n                display: block !important;\n                }\n\n                .olcards--divisor {\n                display: contents !important;\n                }\n\n                .olcards {\n                align-items: flex-start !important;\n                }\n\n                .olcards li .content {\n                text-align: justify !important;\n                }\n\n\n    ",
  // Atualização Forçada onde ele está aparecendo
  "variantes": "\n            --tamanho-de-font-para-paragrafo-sidebar=[1rem];\n            --tamanho-dos-icones-siderbar=[2rem];\n            --tamanho-x-y-imagem=[7%];\n            --width=[40px];\n           --height=[40px];\n        //    --tamanho-do-texto-do-paragrafo-header=[1.2rem];\n            // --font-para-paragrafos=[1rem]\n        ",
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