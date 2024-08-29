"use strict";

var responsivo = [{
  // Onde o Estilo tem que aparecer 
  // "Tipo":"All",
  "Tipo": 1,
  // Que tipo de quebra Tem que Fazer
  "media": "@media screen and (max-width: 1366px)",
  // Estilos que podem vim adcionais
  "synchronous": "\n             .pagina-tipo-texto--box-texto p{\n                    font-size: 0.5rem ;\n                    background-color: aqua;\n             }\n        ",
  // Atualizção Forçada onde ele tá aparecendo usando o 
  // document.documentElement.style.setProperty([nome da variavel css],valor da Variavel);
  "variantes": "\n            --font-para-paragrafos=[1rem]\n        "
}];

function responsivePage(slideIndex) {
  var pageData = api[slideIndex]; // veificar se a página está usando a configuração All ou Passando a pgian com estilo especifico
  // Pagina para Exibir Estilos

  var idPage = pageData.pagina; //verificar se é Todos ou se é unicodeBidi: 

  responsivo.forEach(function (responsivo) {
    // verificar se o Estilo é pra todos 
    // se For Exibir e aplicar para Todos
    if (responsivo.Tipo === "All") {} // ...
    // senão for Aplicar so para a pagina Especificada
    else {
        if (responsivo.Tipo === idPage) {
          // console.log("Estamos na Página..")
          var variavel = responsivo.variantes;
        } else {// console.log("Página Diferente...")
        }
      }
  });
} // Chama a função responsiva para o slide atual


responsivePage(savedPosition);