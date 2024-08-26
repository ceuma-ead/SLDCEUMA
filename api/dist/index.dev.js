"use strict";

// Função para renderizar o conteúdo da API
function renderPages() {
  var container = document.querySelector('.content-render-api');

  if (container) {
    // Limpa o contêiner para evitar duplicações
    container.innerHTML = ''; // Itera sobre os dados da API

    api.forEach(function (pageData) {
      if (pageData.tipo === 'imagem') {
        // Cria um artigo para cada página
        var article = document.createElement('article');
        article.classList.add('c-carousel__slide'); // Adiciona o HTML do container_render ao artigo

        article.innerHTML = pageData.data.container_render;
        container.appendChild(article); // Ativar ou Desativar a Lupa nas Imagens
        // console.log(pageData.paramentros.lupa)
        // Ativas Lupa nas classes img-photo-actions

        /* Lupa
         *  Yes | No (string)
         *
         */

        if (pageData.paramentros && pageData.paramentros.lupa && pageData.paramentros.lupa === "Yes") {
          Lupa();
        }
      }

      if (pageData.tipo === 'Texto') {
        // Cria um artigo para cada página
        var _article = document.createElement('article');

        _article.classList.add('c-carousel__slide'); // Adiciona o HTML do container_render ao artigo


        _article.innerHTML = pageData.data.container_render;
        container.appendChild(_article); // Ativar ou Desativar a Lupa nas Imagens
        // console.log(pageData.paramentros.lupa)
        // Ativas Lupa nas classes img-photo-actions

        /* Lupa
         *  Yes | No (string)
         *
         */
      }
    });
  } else {
    console.error("Elemento com a classe content-render-api n\xE3o encontrado.");
  }
}

renderPages();