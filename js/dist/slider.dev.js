"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//                  _ _.-'`-._ _                 
//                 ;.'________'.;                
//      _________n.[____________].n_________     
//     |""_""_""_""||==||==||==||""_""_""_""]    
//     |"""""""""""||..||..||..||"""""""""""|    
//     |LI LI LI LI||LI||LI||LI||LI LI LI LI|    
//     |.. .. .. ..||..||..||..||.. .. .. ..|    
//     |LI LI LI LI||LI||LI||LI||LI LI LI LI|    
//  ,,;;,;;;,;;;,;;;,;;;,;;;,;;;,;;,;;;,;;;,;;,, 
// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
var gliderElement = document.querySelector('.c-carousel__slides'); // Função para salvar a posição do slider no localStorage

function saveSliderPosition(index) {
  localStorage.setItem('sliderPosition', index);
} // Recuperar a posição salva no localStorage


function getSavedSliderPosition() {
  return parseInt(localStorage.getItem('sliderPosition')) || 0;
} // Inicializa o Glider.js


var glider = new Glider(gliderElement, {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  },
  dots: '#dots'
}); // Recupera e define a posição salva ao inicializar

var savedPosition = getSavedSliderPosition();
glider.scrollItem(savedPosition); // Evento para salvar a posição atual sempre que o slider for alterado

gliderElement.addEventListener('glider-slide-visible', function (event) {
  saveSliderPosition(event.detail.slide); //Atualizar titulo da Página

  updatePageTitle(event.detail.slide); //Atualizar Cores da Página

  atualizarCoresdaNavegacao(event.detail.slide); //Adicionar Logo a Página

  adicionarLogo(event.detail.slide); //Modificar fontes da Página

  modificarFontes(event.detail.slide); //Adcionar Marcadores ao Texto

  adcionarMarcadores(event.detail.slide); //Passa a Posição Atual da Pagina para o Menu

  itemnsMenu('', event.detail.slide);
  console.log("Está na Página 🎉 => " + event.detail.slide);
}); // Função para atualizar o título da página ao carregar

function updatePageTitle(slideIndex) {
  var pageData = api[slideIndex];
  var titulo = document.querySelector(".header-title p");

  if (titulo && pageData) {
    titulo.textContent = pageData.nome_page;
  }
} // Função para Ativar logo no Slider


function adicionarLogo(slideIndex) {
  var pageData = api[slideIndex]; // console.log(pageData)
  // Criar um padrão para Logo

  var LogoPadrao = {
    ativar: true,
    img: getComputedStyle(document.documentElement).getPropertyValue('--imagem-de-fundo-slider').trim(),
    posicaoY: getComputedStyle(document.documentElement).getPropertyValue('--posicao-y-imagem').trim(),
    posicaoX: getComputedStyle(document.documentElement).getPropertyValue('--posicao-x-imagem').trim(),
    tamanho: getComputedStyle(document.documentElement).getPropertyValue('--tamanho-x-y-imagem').trim()
  };

  if (pageData && pageData.paramentros && pageData.paramentros.logo) {
    var _pageData$paramentros = pageData.paramentros.logo,
        _pageData$paramentros2 = _pageData$paramentros.ativar,
        ativar = _pageData$paramentros2 === void 0 ? LogoPadrao.ativar : _pageData$paramentros2,
        _pageData$paramentros3 = _pageData$paramentros.img,
        img = _pageData$paramentros3 === void 0 ? LogoPadrao.img : _pageData$paramentros3,
        _pageData$paramentros4 = _pageData$paramentros.posicaoY,
        posicaoY = _pageData$paramentros4 === void 0 ? LogoPadrao.posicaoY : _pageData$paramentros4,
        _pageData$paramentros5 = _pageData$paramentros.posicaoX,
        posicaoX = _pageData$paramentros5 === void 0 ? LogoPadrao.posicaoX : _pageData$paramentros5,
        _pageData$paramentros6 = _pageData$paramentros.tamanho,
        tamanho = _pageData$paramentros6 === void 0 ? LogoPadrao.tamanho : _pageData$paramentros6; // console.log(pageData.paramentros.logo)

    var verificarItem = pageData.paramentros.logo;

    if (Object.values(verificarItem).length === 0) {
      document.documentElement.style.setProperty('--imagem-de-fundo-slider', "url()");
      return;
    }

    if (ativar) {
      document.documentElement.style.setProperty('--imagem-de-fundo-slider', img);
      document.documentElement.style.setProperty('--posicao-y-imagem', posicaoY);
      document.documentElement.style.setProperty('--posicao-x-imagem', posicaoX);
      document.documentElement.style.setProperty('--tamanho-x-y-imagem', tamanho);
    } else {
      document.documentElement.style.setProperty('--imagem-de-fundo-slider', "url()");
    }
  } else {
    if (typeof glider !== 'undefined') {
      glider.refresh(true);
      glider.updateControls();
    } else {
      console.error('O objeto glider não está definido.');
    } // Mantém os estilos padrão e atualiza o glider


    document.documentElement.style.setProperty('--imagem-de-fundo-slider', 'url()');
    document.documentElement.style.setProperty('--posicao-y-imagem', LogoPadrao.posicaoY);
    document.documentElement.style.setProperty('--posicao-x-imagem', LogoPadrao.posicaoX);
  }
} // Função para limitar o texto e adicionar "..."


function reduzirTexto(texto, tamanhoMaximo) {
  if (texto.length > tamanhoMaximo) {
    return texto.substring(0, tamanhoMaximo) + '...';
  } else {
    return texto;
  }
} // // Função para renderizar o menu dinamicamente
// function itemnsMenu(filtro = '', slideIndex) {
//     const renderMenuDiv = document.querySelector('.render-menu');
//     renderMenuDiv.innerHTML = ''; // Limpa o menu atual
//     // Define o tamanho máximo do texto a ser exibido
//     const tamanhoMaximoTexto = 20;
//     // Verifica se algum item corresponde ao filtro
//     let encontrouItem = false;
//     // Itera sobre a API e cria os elementos do menu
//     api.forEach(item => {
//         // Verifica se o item corresponde ao filtro de pesquisa
//         if (
//             filtro === '' ||
//             item.nome_page.toLowerCase().includes(filtro.toLowerCase()) ||
//             `#${item.pagina}` === filtro ||
//             item.pagina.toString() === filtro
//         ) {
//             encontrouItem = true; // Marca que pelo menos um item foi encontrado
//             const textoReduzido = reduzirTexto(item.nome_page, tamanhoMaximoTexto);
//             const menuItem = document.createElement('a');
//             // menuItem.href = "#"; // Pode ser alterado para o link correto
//             menuItem.innerHTML = `
//                 <span title="${item.nome_page}">${textoReduzido}</span>
//                 <span class="horizontal-menu-activer ${slideIndex + 1 === item.pagina ? "active-menu" : ""}"></span>
//             `;
//             // // Adiciona classe active-menu se for o item ativo
//             // if (item.pagina.toString() === filtro || `#${item.pagina}` === filtro) {
//             //     menuItem.querySelector('.horizontal-menu-activer').classList.add('active-menu');
//             // }
//             // Evento de clique para ir para a página no slider
//             menuItem.onclick = () => {
//                 glider.scrollItem(item.pagina - 1); // Subtrai 1 para ajustar o índice
//             }
//             // Adiciona o item ao container do menu
//             renderMenuDiv.appendChild(menuItem);
//             return item.pagina
//         }
//     });
//     // Se nenhum item for encontrado, exibe uma mensagem de erro
//     if (!encontrouItem) {
//         const menuItemErro = document.createElement('div');
//         menuItemErro.className = `erro-notfound-menu`
//         menuItemErro.innerHTML = `
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
//             <p style="color:#000;">Erro: Nenhum item encontrado para "${filtro}"</p>
//         `;
//         renderMenuDiv.appendChild(menuItemErro);
//     }
// }
// // Função para lidar com o evento de pesquisa
// function handleSearch() {
//     const searchInput = document.querySelector('.searcListMateria input');
//     searchInput.addEventListener('input', () => {
//         const filtro = searchInput.value.trim();
//         const irItem = itemnsMenu(filtro , savedPosition);
//     });
//     // quando clicado ele ir para a pagian do item que ele encontrou...
//     const butaoIr = document.querySelector('.searcListMateria span');
//     butaoIr.onclick  = () => {
//         const filtro = searchInput.value.trim();
//         const irItem = itemnsMenu(filtro , savedPosition);
//         console.log(irItem)
//     }
// }
// Função para Modificar Fonte no Slider


function modificarFontes(slideIndex) {
  var pageData = api[slideIndex]; // console.log(pageData)
  // Criar um Font padrão para Página

  var FontPadrao = {
    titulo: getComputedStyle(document.documentElement).getPropertyValue('--tamanho-de-font-para-paragrafo-sidebar').trim(),
    paragrafos: getComputedStyle(document.documentElement).getPropertyValue('--font-para-paragrafos').trim(),
    font_familly: getComputedStyle(document.documentElement).getPropertyValue('--familia-da-font-paragrafo').trim(),
    cor_fonte: getComputedStyle(document.documentElement).getPropertyValue('--cor-da-font-paragrafo').trim(),
    alinhamento_texto: getComputedStyle(document.documentElement).getPropertyValue('--alinhamento-do-texto-paragrafo').trim(),
    hifens: getComputedStyle(document.documentElement).getPropertyValue('--hifens-da-fonte-paragrafo').trim()
  };

  if (pageData && pageData.paramentros && pageData.paramentros.logo) {
    var _pageData$paramentros7 = pageData.paramentros.fonte,
        _pageData$paramentros8 = _pageData$paramentros7.titulo,
        titulo = _pageData$paramentros8 === void 0 ? FontPadrao.titulo : _pageData$paramentros8,
        _pageData$paramentros9 = _pageData$paramentros7.paragrafos,
        paragrafos = _pageData$paramentros9 === void 0 ? FontPadrao.paragrafos : _pageData$paramentros9,
        _pageData$paramentros10 = _pageData$paramentros7.font_familly,
        font_familly = _pageData$paramentros10 === void 0 ? FontPadrao.font_familly : _pageData$paramentros10,
        _pageData$paramentros11 = _pageData$paramentros7.cor_fonte,
        cor_fonte = _pageData$paramentros11 === void 0 ? FontPadrao.cor_fonte : _pageData$paramentros11,
        _pageData$paramentros12 = _pageData$paramentros7.alinhamento_texto,
        alinhamento_texto = _pageData$paramentros12 === void 0 ? FontPadrao.alinhamento_texto : _pageData$paramentros12,
        _pageData$paramentros13 = _pageData$paramentros7.hifens,
        hifens = _pageData$paramentros13 === void 0 ? FontPadrao.hifens : _pageData$paramentros13; // console.log(titulo)
    // console.log(paragrafos)
    // console.log(unidade_medida)
    // console.log(font_familly)
    // console.log(cor_fonte)
    // console.log(pageData.paramentros.logo)

    var verificarItem = pageData.paramentros.logo;

    if (Object.values(verificarItem).length === 0) {
      document.documentElement.style.setProperty('--tamanho-de-font-para-paragrafo-sidebar', FontPadrao.titulo);
      document.documentElement.style.setProperty('--font-para-paragrafos', FontPadrao.paragrafos);
      document.documentElement.style.setProperty('--familia-da-font-paragrafo', FontPadrao.font_familly);
      document.documentElement.style.setProperty('--cor-da-font-paragrafo', FontPadrao.cor_fonte);
      document.documentElement.style.setProperty('--alinhamento-do-texto-paragrafo', FontPadrao.cor_fonte);
      return;
    } //cria um controlador de fontes para página
    // console.log(pageData)


    var slider_container = document.querySelector(pageData.id_component); // console.log(slider_container)
    //verificar se existe paragrafos dentro do slider

    var paragrafos_slider = slider_container.querySelectorAll("p"); // console.log(paragrafos_slider)

    paragrafos_slider.forEach(function (p, index) {
      p.style.fontSize = "".concat(paragrafos);
      p.style.fontFamily = "".concat(font_familly);
      p.style.color = "".concat(cor_fonte);
      p.style.textAlign = "".concat(alinhamento_texto);
      p.style.hyphens = "".concat(hifens);
    });
    document.documentElement.style.setProperty('--tamanho-de-font-para-paragrafo-sidebar', titulo);
  } else {
    if (typeof glider !== 'undefined') {
      glider.refresh(true);
      glider.updateControls();
    } else {
      console.error('O objeto glider não está definido.');
    } // Mantém os estilos padrão e atualiza o glider


    document.documentElement.style.setProperty('--tamanho-de-font-para-paragrafo-sidebar', FontPadrao.titulo);
    document.documentElement.style.setProperty('--font-para-paragrafos', FontPadrao.paragrafos);
    document.documentElement.style.setProperty('--familia-da-font-paragrafo', FontPadrao.font_familly);
    document.documentElement.style.setProperty('--cor-da-font-paragrafo', FontPadrao.cor_fonte);
    document.documentElement.style.setProperty('--alinhamento-do-texto-paragrafo', FontPadrao.cor_fonte);
    document.documentElement.style.setProperty('--hifens-da-fonte-paragrafo', FontPadrao.hifens);
  }
} // Função marcadorTexto


function adcionarMarcadores(slideIndex) {
  var pageData = api[slideIndex]; // if(pageData && pageData.paramentros && pageData.paramentros.configuracoes_gerais._procurar_paragrafos.status){
  //         const slider_container = document.querySelector(pageData.paramentros.configuracoes_gerais._procurar_paragrafos.onde_procurar);
  //         // console.log(pageData.paramentros.configuracoes_gerais)
  //         pageData.paramentros.marcador.forEach((marcadores) => {
  //             const {
  //                 tipo,
  //                 posicao,
  //                 palavras,
  //                 attr,
  //                 attr_inline,
  //                 fundo,
  //                 corTexto,
  //                 padding,
  //                 onclick
  //             } = marcadores;
  //             const paragrafo = slider_container.querySelectorAll(tipo)[posicao];
  //             if (paragrafo) {
  //                 const palavrasArray = palavras.split('|');
  //                 console.log(palavrasArray)
  //                 let styles = '';
  //                 if (attr) {
  //                     attr.split(',').forEach(attribute => {
  //                         const [key, value] = attribute.split('=');
  //                         if (key && value) {
  //                             styles += `${key.trim()}:${value.replace(/\[|\]/g, '').trim()};`;
  //                         }
  //                     });
  //                 }
  //                 styles += `background-color:${fundo}; color:${corTexto}; padding:${padding};`;
  //                 let inlineAttrs = '';
  //                 if (attr_inline) {
  //                     attr_inline.split(',').forEach(attribute => {
  //                         const [key, value] = attribute.split('=');
  //                         if (key && value) {
  //                             inlineAttrs += `${key.trim()}="${value.replace(/\[|\]/g, '').trim()}" `;
  //                         }
  //                     });
  //                 }
  //                 palavrasArray.forEach(palavra => {
  //                     const regex = new RegExp(`(${palavra})`, 'gi');
  //                     // Verifica se o span já existe para a palavra
  //                     if (paragrafo.innerHTML.includes(`<span ${inlineAttrs.trim()}`)) {
  //                         return; // Se já existe, não faz nada
  //                     }
  //                     paragrafo.innerHTML = paragrafo.innerHTML.replace(regex, (match) => {
  //                         let eventHandlers = '';
  //                         if (onclick) {
  //                             onclick.forEach(event => {
  //                                 if (event.palavra === palavra) {
  //                                     const eventName = event.acao;
  //                                     const functionName = event.funcao.split('(')[0];
  //                                     // Verifica se a função já existe
  //                                     if (!window[functionName]) {
  //                                         // Cria a função no escopo global através de uma tag <script>
  //                                         const scriptTag = document.createElement('script');
  //                                         scriptTag.textContent = event.funcao_script.trim();
  //                                         document.body.appendChild(scriptTag);
  //                                     }
  //                                     // Associa o evento ao span
  //                                     eventHandlers += `${eventName}="${functionName}()" `;
  //                                 }
  //                             });
  //                         }
  //                         console.log(`<span ${inlineAttrs} style="${styles}" ${eventHandlers}>${match}</span>`)
  //                         return `<span ${inlineAttrs} style="${styles}" ${eventHandlers}>${match}</span>`;
  //                     });
  //                 });
  //             } else {
  //                 console.warn(`Elemento ${tipo} na posição ${posicao} não encontrado.`);
  //             }
  //         });
  //     }
  // }
  // if (pageData && pageData.paramentros && pageData.paramentros.marcador) {
  //     const slider_container = document.querySelector(pageData.id_component);
  //     pageData.paramentros.marcador.forEach((marcadores) => {
  //         const {
  //             tipo,
  //             posicao,
  //             palavras,
  //             attr,
  //             attr_inline,
  //             fundo,
  //             corTexto,
  //             padding,
  //             onclick
  //         } = marcadores;
  //         const paragrafo = slider_container.querySelectorAll(tipo)[posicao];
  //         if (paragrafo) {
  //             const palavrasArray = palavras.split('|');
  //             let styles = '';
  //             if (attr) {
  //                 attr.split(',').forEach(attribute => {
  //                     const [key, value] = attribute.split('=');
  //                     if (key && value) {
  //                         styles += `${key.trim()}:${value.replace(/\[|\]/g, '').trim()};`;
  //                     }
  //                 });
  //             }
  //             styles += `background-color:${fundo}; color:${corTexto}; padding:${padding};`;
  //             let inlineAttrs = '';
  //             if (attr_inline) {
  //                 attr_inline.split(',').forEach(attribute => {
  //                     const [key, value] = attribute.split('=');
  //                     if (key && value) {
  //                         inlineAttrs += `${key.trim()}="${value.replace(/\[|\]/g, '').trim()}" `;
  //                     }
  //                 });
  //             }
  //             palavrasArray.forEach(palavra => {
  //                 const regex = new RegExp(`(?!<span[^>]*>)(${palavra})(?!</span>)`, 'gi');
  //                 paragrafo.innerHTML = paragrafo.innerHTML.replace(regex, (match) => {
  //                     let eventHandlers = '';
  //                     if (onclick) {
  //                         onclick.forEach(event => {
  //                             if (event.palavra === palavra) {
  //                                 const eventName = event.acao;
  //                                 const functionName = event.funcao.split('(')[0];
  //                                 // Verifica se a função já existe
  //                                 if (!window[functionName]) {
  //                                     // Cria a função no escopo global através de uma tag <script>
  //                                     const scriptTag = document.createElement('script');
  //                                     scriptTag.textContent = event.funcao_script.trim();
  //                                     document.body.appendChild(scriptTag);
  //                                 }
  //                                 // Associa o evento ao span
  //                                 eventHandlers += `${eventName}="${functionName}()" `;
  //                             }
  //                         });
  //                     }
  //                     // Só aplica o span se não estiver já dentro de um span
  //                     return `<span ${inlineAttrs} style="${styles}" ${eventHandlers}>${match}</span>`;
  //                 });
  //             });
  //         } else {
  //             console.warn(`Elemento ${tipo} na posição ${posicao} não encontrado.`);
  //         }
  //     });
  // }
  // if (pageData && pageData.paramentros && pageData.paramentros.marcador) {
  //     const slider_container = document.querySelector(pageData.id_component);
  //     pageData.paramentros.marcador.forEach((marcadores) => {
  //         const {
  //             tipo,
  //             posicao,
  //             palavras,
  //             attr,
  //             attr_inline,
  //             attr_unitario,
  //             fundo,
  //             corTexto,
  //             padding,
  //             onclick
  //         } = marcadores;
  //         const paragrafo = slider_container.querySelectorAll(tipo)[posicao];
  //         if (paragrafo) {
  //             const palavrasArray = palavras.split('|');
  //             palavrasArray.forEach(palavra => {
  //                 // Aplica atributos específicos se existirem
  //                 let inlineAttrs = '';
  //                 let specificStyles = '';
  //                 if (attr_unitario && attr_unitario[palavra]) {
  //                     const unitAttr = attr_unitario[palavra];
  //                     if (unitAttr.attr) {
  //                         unitAttr.attr.split(',').forEach(attribute => {
  //                             const [key, value] = attribute.split('=');
  //                             if (key && value) {
  //                                 specificStyles += `${key.trim()}:${value.replace(/\[|\]/g, '').trim()};`;
  //                             }
  //                         });
  //                     }
  //                     if (unitAttr.attr_inline) {
  //                         unitAttr.attr_inline.split(',').forEach(attribute => {
  //                             const [key, value] = attribute.split('=');
  //                             if (key && value) {
  //                                 inlineAttrs += `${key.trim()}="${value.replace(/\[|\]/g, '').trim()}" `;
  //                             }
  //                         });
  //                     }
  //                 }
  //                 // Inclui atributos genéricos
  //                 let styles = '';
  //                 if (attr) {
  //                     attr.split(',').forEach(attribute => {
  //                         const [key, value] = attribute.split('=');
  //                         if (key && value) {
  //                             styles += `${key.trim()}:${value.replace(/\[|\]/g, '').trim()};`;
  //                         }
  //                     });
  //                 }
  //                 styles += `background-color:${fundo ? fundo : ""}; color:${corTexto ? corTexto : "black"}; padding:${padding ? padding : ""};`;
  //                 styles += specificStyles; // Sobrescreve atributos genéricos com específicos
  //                 const regex = new RegExp(`(?!<span[^>]*>)(${palavra})(?!</span>)`, 'gi');
  //                 let inlineAttrs_all = '';
  //                 if (attr_inline) {
  //                     attr_inline.split(',').forEach(attribute => {
  //                         const [key, value] = attribute.split('=');
  //                         if (key && value) {
  //                             inlineAttrs_all += `${key.trim()}="${value.replace(/\[|\]/g, '').trim()}" `;
  //                         }
  //                     });
  //                 }
  //                 paragrafo.innerHTML = paragrafo.innerHTML.replace(regex, (match) => {
  //                     let eventHandlers = '';
  //                     if (onclick) {
  //                         onclick.forEach(event => {
  //                             if (event.palavra === palavra) {
  //                                 const eventName = event.acao;
  //                                 const functionName = event.funcao.split('(')[0];
  //                                 // Verifica se a função já existe
  //                                 if (!window[functionName]) {
  //                                     // Cria a função no escopo global através de uma tag <script>
  //                                     const scriptTag = document.createElement('script');
  //                                     scriptTag.textContent = event.funcao_script.trim();
  //                                     document.body.appendChild(scriptTag);
  //                                 }
  //                                 // Associa o evento ao span
  //                                 eventHandlers += `${eventName}="${functionName}()" `;
  //                             }
  //                         });
  //                     }
  //                     // Só aplica o span se não estiver já dentro de um span
  //                     return `<span ${inlineAttrs} ${inlineAttrs_all ? inlineAttrs_all : ""} style="${styles}" ${eventHandlers}>${match}</span>`;
  //                 });
  //             });
  //         } else {
  //             console.warn(`Elemento ${tipo} na posição ${posicao} não encontrado.`);
  //         }
  //     });
  // }

  if (pageData && pageData.paramentros && pageData.paramentros.marcador) {
    var slider_container = document.querySelector(pageData.id_component);
    pageData.paramentros.marcador.forEach(function (marcadores) {
      var tipo = marcadores.tipo,
          posicao = marcadores.posicao,
          palavras = marcadores.palavras,
          attr = marcadores.attr,
          estilo_marcador_inject = marcadores.estilo_marcador_inject,
          attr_inline = marcadores.attr_inline,
          attr_unitario = marcadores.attr_unitario,
          fundo = marcadores.fundo,
          corTexto = marcadores.corTexto,
          padding = marcadores.padding,
          onclick = marcadores.onclick; // Verifica se o estilo geral já foi injetado

      if (estilo_marcador_inject) {
        var styleTag = document.querySelector('#style-geral-marcador');

        if (!styleTag) {
          styleTag = document.createElement('style'); // styleTag.id = 'style-geral-marcador';

          document.head.appendChild(styleTag);
        } // Adiciona o estilo ao conteúdo do style


        styleTag.textContent += estilo_marcador_inject.trim();
      }

      var paragrafo = slider_container.querySelectorAll(tipo)[posicao];

      if (paragrafo) {
        var palavrasArray = palavras.split('|');
        palavrasArray.forEach(function (palavra) {
          // Aplica atributos específicos se existirem
          var inlineAttrs = '';
          var specificStyles = '';

          if (attr_unitario && attr_unitario[palavra]) {
            var unitAttr = attr_unitario[palavra];

            if (unitAttr.attr) {
              unitAttr.attr.split(',').forEach(function (attribute) {
                var _attribute$split = attribute.split('='),
                    _attribute$split2 = _slicedToArray(_attribute$split, 2),
                    key = _attribute$split2[0],
                    value = _attribute$split2[1];

                if (key && value) {
                  specificStyles += "".concat(key.trim(), ":").concat(value.replace(/\[|\]/g, '').trim(), ";");
                }
              });
            }

            if (unitAttr.attr_inline) {
              unitAttr.attr_inline.split(',').forEach(function (attribute) {
                var _attribute$split3 = attribute.split('='),
                    _attribute$split4 = _slicedToArray(_attribute$split3, 2),
                    key = _attribute$split4[0],
                    value = _attribute$split4[1];

                if (key && value) {
                  inlineAttrs += "".concat(key.trim(), "=\"").concat(value.replace(/\[|\]/g, '').trim(), "\" ");
                }
              });
            }
          } // Inclui atributos genéricos


          var styles = '';

          if (attr) {
            attr.split(',').forEach(function (attribute) {
              var _attribute$split5 = attribute.split('='),
                  _attribute$split6 = _slicedToArray(_attribute$split5, 2),
                  key = _attribute$split6[0],
                  value = _attribute$split6[1];

              if (key && value) {
                styles += "".concat(key.trim(), ":").concat(value.replace(/\[|\]/g, '').trim(), ";");
              }
            });
          }

          styles += "".concat(fundo ? "background-color:".concat(fundo) : "", ";").concat(corTexto ? "color:".concat(corTexto) : "", ";").concat(padding ? "padding:".concat(padding) : "");
          styles += specificStyles; // Sobrescreve atributos genéricos com específicos

          var regex = new RegExp("(?!<span[^>]*>)(".concat(palavra, ")(?!</span>)"), 'gi');
          var inlineAttrs_all = '';

          if (attr_inline) {
            attr_inline.split(',').forEach(function (attribute) {
              var _attribute$split7 = attribute.split('='),
                  _attribute$split8 = _slicedToArray(_attribute$split7, 2),
                  key = _attribute$split8[0],
                  value = _attribute$split8[1];

              if (key && value) {
                inlineAttrs_all += "".concat(key.trim(), "=\"").concat(value.replace(/\[|\]/g, '').trim(), "\" ");
              }
            });
          }

          paragrafo.innerHTML = paragrafo.innerHTML.replace(regex, function (match) {
            var eventHandlers = '';

            if (onclick) {
              onclick.forEach(function (event) {
                if (event.palavra === palavra) {
                  var eventName = event.acao;
                  var functionName = event.funcao.split('(')[0]; // Verifica se a função já existe

                  if (!window[functionName]) {
                    // Cria a função no escopo global através de uma tag <script>
                    var scriptTag = document.createElement('script');
                    scriptTag.textContent = event.funcao_script.trim();
                    document.body.appendChild(scriptTag);
                  } // Associa o evento ao span


                  eventHandlers += "".concat(eventName, "=\"").concat(functionName, "()\" ");
                }
              });
            } // Só aplica o span se não estiver já dentro de um span


            return "<span ".concat(inlineAttrs, " ").concat(inlineAttrs_all ? inlineAttrs_all : "", " style=\"").concat(styles, "\" ").concat(eventHandlers, ">").concat(match, "</span>");
          });
        });
      } else {
        console.warn("Elemento ".concat(tipo, " na posi\xE7\xE3o ").concat(posicao, " n\xE3o encontrado."));
      }
    });
  }
} // Atualiza as cores da página visível


function atualizarCoresdaNavegacao(slideIndex) {
  var pageData = api[slideIndex]; // cores padroes que já vem definidas nas variaveis

  var defaultCores = {
    sidebar: getComputedStyle(document.documentElement).getPropertyValue('--fundo-siderbar-js-default'),
    fundo: getComputedStyle(document.documentElement).getPropertyValue('--fundo-carrosel-js-default'),
    icones: getComputedStyle(document.documentElement).getPropertyValue('--cor-dos-icones-siderbar-js-default')
  }; // console.log(defaultCores.sidebar)
  // console.log(defaultCores.fundo)
  // console.log(defaultCores.icones)

  if (pageData && pageData.paramentros && pageData.paramentros.cores) {
    var _pageData$paramentros14 = pageData.paramentros.cores,
        _pageData$paramentros15 = _pageData$paramentros14.sidebar,
        sidebar = _pageData$paramentros15 === void 0 ? defaultCores.sidebar : _pageData$paramentros15,
        _pageData$paramentros16 = _pageData$paramentros14.fundo,
        fundo = _pageData$paramentros16 === void 0 ? defaultCores.fundo : _pageData$paramentros16,
        _pageData$paramentros17 = _pageData$paramentros14.icones,
        icones = _pageData$paramentros17 === void 0 ? defaultCores.icones : _pageData$paramentros17;
    var verificarItem = pageData.paramentros.cores;

    if (Object.values(verificarItem).length === 0) {
      document.documentElement.style.setProperty('--fundo-siderbar', defaultCores.sidebar);
      document.documentElement.style.setProperty('--fundo-carrosel', defaultCores.fundo);
      document.documentElement.style.setProperty('--cor-dos-icones-siderbar', defaultCores.icones);
      return;
    }

    document.documentElement.style.setProperty('--fundo-siderbar', sidebar);
    document.documentElement.style.setProperty('--fundo-carrosel', fundo);
    document.documentElement.style.setProperty('--cor-dos-icones-siderbar', icones);
  } else {
    glider.refresh(true);
    glider.updateControls(); // console.log(defaultCores.sidebar)
    // console.log(defaultCores.fundo)
    // console.log(defaultCores.icones)
    // Se não há parâmetros, mantém os estilos padrão

    document.documentElement.style.setProperty('--fundo-siderbar', defaultCores.sidebar);
    document.documentElement.style.setProperty('--fundo-carrosel', defaultCores.fundo);
    document.documentElement.style.setProperty('--cor-dos-icones-siderbar', defaultCores.icones);
  }
} // Atualiza o título e as cores ao inicializar


updatePageTitle(savedPosition);
atualizarCoresdaNavegacao(savedPosition);
adicionarLogo(savedPosition);
modificarFontes(savedPosition);
adcionarMarcadores(savedPosition); // Rederizar Menu

itemnsMenu('', savedPosition); // Pesquisar Item Menu

handleSearch();