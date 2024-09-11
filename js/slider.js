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

const gliderElement = document.querySelector('.c-carousel__slides');

// Função para salvar a posição do slider no localStorage
function saveSliderPosition(index) {
    localStorage.setItem('sliderPosition', index);
}

// Recuperar a posição salva no localStorage
function getSavedSliderPosition() {
    return parseInt(localStorage.getItem('sliderPosition')) || 0;
}

// Inicializa o Glider.js
const glider = new Glider(gliderElement, {
    slidesToShow: 1,
    slidesToScroll: 1,
    duration: 0.5,
    arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
    },
    dots: '#dots'
});

// // Recupera e define a posição salva ao inicializar
// const savedPosition = getSavedSliderPosition();
// glider.scrollItem(savedPosition);

// // Evento para salvar a posição atual sempre que o slider for alterado
// gliderElement.addEventListener('glider-slide-visible', function (event) {
//     saveSliderPosition(event.detail.slide);
//     //Atualizar titulo da Página
//     updatePageTitle(event.detail.slide);
//     //Atualizar Cores da Página
//     atualizarCoresdaNavegacao(event.detail.slide);
//     //Adicionar Logo a Página
//     adicionarLogo(event.detail.slide);
//     //Modificar fontes da Página
//     modificarFontes(event.detail.slide);
//     //Adcionar Marcadores ao Texto
//     adcionarMarcadores(event.detail.slide);
//     //Passa a Posição Atual da Pagina para o Menu
//     itemnsMenu('', event.detail.slide);
//     //Adcionar Fundo ao Slider Atual
//     adicionarFundo(event.detail.slide);
//     //Fazer a inserção de scripts na página
//     injectScriptPage(event.detail.slide);
//     //Fazer a inserção de animação para Paragrafos na Página
//     AnimatedParagrafos(event.detail.slide);
//     //Fazer a inserção e Atualizaçaões de Animações na Página
//     AnimationVariablesUpPage(event.detail.slide);
//     //Fazer a inserção de Responsividade em uma Página ou Varias
//     responsivePage(event.detail.slide);
//     console.log("Está na Página 🎉 => " + event.detail.slide);
// });

const savedPosition = getSavedSliderPosition();
const loadingSpinner = document.getElementById('loading-spinner');

function showLoading(time) {
    loadingSpinner.style.display = 'flex';
    // Garantir que o loading desapareça após 3 segundos (ou ajuste conforme necessário)
    setTimeout(hideLoading, time);
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

// Mostrar o loading antes de iniciar a mudança de slide
gliderElement.addEventListener('glider-slide-hidden', function (event) {
    showLoading(event.timeStamp);
    // console.log()
});

//Executar ao scrollar para um novo slide
glider.scrollItem(savedPosition);


//Controlador =================

let filtroDuplicadoSumario = true

//Controlador =================

gliderElement.addEventListener('glider-slide-visible', function (event) {
    // hideLoading(); // Esconder o loading assim que o slide estiver visível
    showLoading()

    saveSliderPosition(event.detail.slide);
    //Atualizar titulo da Página
    updatePageTitle(event.detail.slide);
    //Atualizar Cores da Página
    atualizarCoresdaNavegacao(event.detail.slide);
    //Adicionar Logo a Página
    adicionarLogo(event.detail.slide);
    //Modificar fontes da Página
    modificarFontes(event.detail.slide);
    //Adcionar Marcadores ao Texto
    adcionarMarcadores(event.detail.slide);
    //Passa a Posição Atual da Pagina para o Menu
    itemnsMenu('', event.detail.slide, filtroDuplicadoSumario);
    //Adcionar Fundo ao Slider Atual
    adicionarFundo(event.detail.slide);
    //Fazer a inserção de scripts na página
    injectScriptPage(event.detail.slide);
    //Fazer a inserção de animação para Paragrafos na Página
    AnimatedParagrafos(event.detail.slide);
    //Fazer a inserção e Atualizaçaões de Animações na Página
    AnimationVariablesUpPage(event.detail.slide);
    //Fazer a inserção de Responsividade em uma Página ou Varias
    responsivePage(event.detail.slide);
    //Fazer animação no Elemento da Página
    AnimatedElementos(event.detail.slide)
    // Função para inserir a URL ná página
    injectEstiloRender(event.detail.slide)
    // Renderizar Ferramentas por Página
    renderTools(event.detail.slide)
    //Atualizar Base de Servidores
    //Modulos de Audio ná página
    modulosPage(event.detail.slide)

    console.log("Está na Página 🎉 => " + event.detail.slide);
});

// Função para atualizar o título da página ao carregar
function updatePageTitle(slideIndex) {
    const pageData = api[slideIndex];
    const titulo = document.querySelector(".header-title p");
    if (titulo && pageData) {
        titulo.textContent = pageData.nome_page;
    }
}

// Função para Ativar Fundo no Slider
function adicionarFundo(slideIndex) {
    const pageData = api[slideIndex];
    // console.log(pageData)

    // Criar um padrão para Logo
    const LogoPadrao = {
        ativar: true,
        img: getComputedStyle(document.documentElement).getPropertyValue('--imgem-fundo-carrosel').trim(),
        posicaoY: getComputedStyle(document.documentElement).getPropertyValue('--imgem-fundo-carrosel-posicao-y-imagem').trim(),
        posicaoX: getComputedStyle(document.documentElement).getPropertyValue('--imgem-fundo-carrosel-posicao-x-imagem').trim(),
        tamanho: getComputedStyle(document.documentElement).getPropertyValue('--imgem-fundo-tamanho-x-y-imagem').trim(),
    };

    if (pageData && pageData.paramentros && pageData.paramentros.cores.imagemFundo) {
        const {
            ativar = LogoPadrao.ativar, // Valores padrão em caso de ausência
            img = LogoPadrao.img,
            posicaoY = LogoPadrao.posicaoY,
            posicaoX = LogoPadrao.posicaoX,
            tamanho = LogoPadrao.tamanho

        } = pageData.paramentros.cores.imagemFundo;

        // console.log(pageData.paramentros.logo)
        const verificarItem = pageData.paramentros.cores
        if (Object.values(verificarItem).length === 0) {
            document.documentElement.style.setProperty('--imgem-fundo-carrosel', "url()");
            return;
        }

        if (ativar) {
            // console.log(img)
            // console.log(document.documentElement.style.getPropertyValue('--imgem-fundo-carrosel'))

            document.documentElement.style.setProperty('--imgem-fundo-carrosel', img);
            document.documentElement.style.setProperty('--imgem-fundo-carrosel-posicao-y-imagem', posicaoY);
            document.documentElement.style.setProperty('--imgem-fundo-carrosel-posicao-x-imagem', posicaoX);
            document.documentElement.style.setProperty('--imgem-fundo-tamanho-x-y-imagem', tamanho);
        } else {
            document.documentElement.style.setProperty('--imgem-fundo-carrosel', "url()");
        }
    } else {

        if (typeof glider !== 'undefined') {
            glider.refresh(true);
            glider.updateControls();
        } else {
            console.error('O objeto glider não está definido.');
        }
        // Mantém os estilos padrão e atualiza o glider
        document.documentElement.style.setProperty('--imgem-fundo-carrosel', 'url()');
        document.documentElement.style.setProperty('--imgem-fundo-carrosel-posicao-y-imagem', LogoPadrao.posicaoY);
        document.documentElement.style.setProperty('--imgem-fundo-carrosel-posicao-x-imagem', LogoPadrao.posicaoX);


    }
}

// Função para Ativar logo no Slider
function adicionarLogo(slideIndex) {
    const pageData = api[slideIndex];
    // console.log(pageData)

    // Criar um padrão para Logo
    const LogoPadrao = {
        ativar: true,
        img: getComputedStyle(document.documentElement).getPropertyValue('--imagem-de-fundo-slider').trim(),
        posicaoY: getComputedStyle(document.documentElement).getPropertyValue('--posicao-y-imagem').trim(),
        posicaoX: getComputedStyle(document.documentElement).getPropertyValue('--posicao-x-imagem').trim(),
        tamanho: getComputedStyle(document.documentElement).getPropertyValue('--tamanho-x-y-imagem').trim(),
    };

    if (pageData && pageData.paramentros && pageData.paramentros.logo) {
        const {
            ativar = LogoPadrao.ativar, // Valores padrão em caso de ausência
            img = LogoPadrao.img,
            posicaoY = LogoPadrao.posicaoY,
            posicaoX = LogoPadrao.posicaoX,
            tamanho = LogoPadrao.tamanho

        } = pageData.paramentros.logo;

        // console.log(pageData.paramentros.logo)
        const verificarItem = pageData.paramentros.logo
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
        }
        // Mantém os estilos padrão e atualiza o glider
        document.documentElement.style.setProperty('--imagem-de-fundo-slider', 'url()');
        document.documentElement.style.setProperty('--posicao-y-imagem', LogoPadrao.posicaoY);
        document.documentElement.style.setProperty('--posicao-x-imagem', LogoPadrao.posicaoX);


    }
}

// Função para limitar o texto e adicionar "..."
function reduzirTexto(texto, tamanhoMaximo) {
    if (texto.length > tamanhoMaximo) {
        return texto.substring(0, tamanhoMaximo) + '...';
    } else {
        return texto;
    }
}


// // Função para lidar com o evento de pesquisa
// function itemnsMenu(filtro = '', slideIndex, ocultarDuplicados = true) {
//     const renderMenuDiv = document.querySelector('.render-menu');
//     renderMenuDiv.innerHTML = ''; // Limpa o menu atual

//     const tamanhoMaximoTexto = 25;
//     let encontrouItem = false;
//     let paginaEncontrada = null;

//     const titulosExibidos = new Set(); // Conjunto para armazenar títulos exibidos

//     api.forEach(item => {
//         const titulo = item.nome_page;

//         // Verifica se o item corresponde ao filtro de pesquisa
//         if (
//             filtro === '' ||
//             titulo.toLowerCase().includes(filtro.toLowerCase()) ||
//             `#${item.pagina}` === filtro ||
//             item.pagina.toString() === filtro
//         ) {
//             // Se ocultarDuplicados estiver habilitado e o título já foi exibido, pula para o próximo item
//             if (ocultarDuplicados && titulosExibidos.has(titulo)) {
//                 return;
//             }

//             encontrouItem = true;
//             paginaEncontrada = item.pagina;
//             titulosExibidos.add(titulo); // Adiciona o título ao conjunto

//             const textoReduzido = reduzirTexto(titulo, tamanhoMaximoTexto);

//             const menuItem = document.createElement('a');
//             menuItem.innerHTML = `
//                 <span title="${titulo}">${textoReduzido}</span>
//                 <span class="horizontal-menu-activer ${slideIndex + 1 === item.pagina ? "active-menu" : ""}"></span>
//             `;

//             menuItem.onclick = () => {
//                 fecharMenuSumario()
//                 glider.scrollItem(item.pagina - 1); // Subtrai 1 para ajustar o índice
//             }

//             renderMenuDiv.appendChild(menuItem);
//         }
//     });

//     if (!encontrouItem) {
//         const menuItemErro = document.createElement('div');
//         menuItemErro.className = `erro-notfound-menu`;
//         menuItemErro.innerHTML = `
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
//             <p style="color:#000;">Erro: Nenhum item encontrado para "${filtro}"</p>
//         `;
//         renderMenuDiv.appendChild(menuItemErro);
//     }

//     return paginaEncontrada;
// }

// // itemnsMenu('', 1, true); // Oculta itens duplicados
// // itemnsMenu('', 1, false); // Exibe todos os itens, mesmo que duplicados

// function handleSearch() {
//     const searchInput = document.querySelector('.searcListMateria input');
//     searchInput.addEventListener('input', () => {
//         const filtro = searchInput.value.trim();

//         itemnsMenu(filtro, savedPosition,filtroDuplicadoSumario);
//     });

//     // Quando clicado, ele vai para a página do item que ele encontrou...
//     const butaoIr = document.querySelector('.searcListMateria span');
//     butaoIr.onclick = () => {
//         const filtro = searchInput.value.trim();
//         const irItem = itemnsMenu(filtro, savedPosition,filtroDuplicadoSumario);
//         // console.log(irItem); // Exibe no console o ID da página encontrada
//         if (irItem !== null) {
//             // Exemplo: Se quiser fazer algo com a página encontrada
//             glider.scrollItem(irItem); // Vai para a página encontrada
//         }
//     };
// }


// ==========================================

// Função para lidar com o evento de pesquisa
function itemnsMenu(filtro = '', slideIndex, ocultarDuplicados = true) {
    const renderMenuDiv = document.querySelector('.render-menu');
    renderMenuDiv.innerHTML = ''; // Limpa o menu atual

    const tamanhoMaximoTexto = 25;
    let encontrouItem = false;
    let paginaEncontrada = null;

    const titulosExibidos = new Map(); // Map para armazenar títulos e seus índices

    api.forEach(item => {
        const titulo = item.nome_page;

        // Verifica se o item corresponde ao filtro de pesquisa
        if (
            filtro === '' ||
            titulo.toLowerCase().includes(filtro.toLowerCase()) ||
            `#${item.pagina}` === filtro ||
            item.pagina.toString() === filtro
        ) {
            if (ocultarDuplicados && titulosExibidos.has(titulo)) {
                // Se o item atual corresponde ao slideIndex, transfere a marcação para o primeiro item
                if (slideIndex + 1 === item.pagina) {
                    const menuItemAnterior = titulosExibidos.get(titulo);
                    menuItemAnterior.querySelector('.horizontal-menu-activer').classList.add('active-menu');
                }
                return;
            }

            encontrouItem = true;
            paginaEncontrada = item.pagina;

            const textoReduzido = reduzirTexto(titulo, tamanhoMaximoTexto);

            const menuItem = document.createElement('a');
            menuItem.innerHTML = `
                <span title="${titulo}">${textoReduzido}</span>
                <span class="horizontal-menu-activer ${slideIndex + 1 === item.pagina ? "active-menu" : ""}"></span>
            `;

            menuItem.onclick = () => {
                fecharMenuSumario();
                glider.scrollItem(item.pagina - 1); // Subtrai 1 para ajustar o índice
            }

            renderMenuDiv.appendChild(menuItem);
            titulosExibidos.set(titulo, menuItem); // Armazena o menuItem criado
        }
    });

    if (!encontrouItem) {
        const menuItemErro = document.createElement('div');
        menuItemErro.className = `erro-notfound-menu`;
        menuItemErro.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
            <p style="color:#000;">Erro: Nenhum item encontrado para "${filtro}"</p>
        `;
        renderMenuDiv.appendChild(menuItemErro);
    }

    return paginaEncontrada;
}

// Função para habilitar/desabilitar a exibição de duplicados e realizar pesquisa
function handleSearch() {
    const searchInput = document.querySelector('.searcListMateria input');
    searchInput.addEventListener('input', () => {
        const filtro = searchInput.value.trim();
        itemnsMenu(filtro, savedPosition, filtroDuplicadoSumario);
    });

    const butaoIr = document.querySelector('.searcListMateria span');
    butaoIr.onclick = () => {
        const filtro = searchInput.value.trim();
        const irItem = itemnsMenu(filtro, savedPosition, filtroDuplicadoSumario);
        if (irItem !== null) {
            glider.scrollItem(irItem);
        }
    };
}

// ==========================================

// Função para Modificar Fonte no Slider
// ------------------ Versão ( 01 ) -----------------
// function modificarFontes(slideIndex) {
//     const pageData = api[slideIndex];
//     // console.log(pageData)

//     // Criar um Font padrão para Página
//     const FontPadrao = {
//         titulo: getComputedStyle(document.documentElement).getPropertyValue('--tamanho-de-font-para-paragrafo-sidebar').trim(),
//         paragrafos: getComputedStyle(document.documentElement).getPropertyValue('--font-para-paragrafos').trim(),
//         font_familly: getComputedStyle(document.documentElement).getPropertyValue('--familia-da-font-paragrafo').trim(),
//         cor_fonte: getComputedStyle(document.documentElement).getPropertyValue('--cor-da-font-paragrafo').trim(),
//         alinhamento_texto: getComputedStyle(document.documentElement).getPropertyValue('--alinhamento-do-texto-paragrafo').trim(),
//         hifens: getComputedStyle(document.documentElement).getPropertyValue('--hifens-da-fonte-paragrafo').trim()
//     };

//     if (pageData && pageData.paramentros && pageData.paramentros.logo) {
//         const {
//                 titulo = FontPadrao.titulo,
//                 paragrafos = FontPadrao.paragrafos,
//                 font_familly = FontPadrao.font_familly,
//                 cor_fonte = FontPadrao.cor_fonte,
//                 alinhamento_texto = FontPadrao.alinhamento_texto,
//                 hifens = FontPadrao.hifens

//         } = pageData.paramentros.fonte;

//         // console.log(titulo)
//         // console.log(paragrafos)
//         // console.log(unidade_medida)
//         // console.log(font_familly)
//         // console.log(cor_fonte)

//         // console.log(pageData.paramentros.logo)
//         const verificarItem = pageData.paramentros.logo
//         if (Object.values(verificarItem).length === 0) {

//             document.documentElement.style.setProperty('--tamanho-de-font-para-paragrafo-sidebar', FontPadrao.titulo);
//             document.documentElement.style.setProperty('--font-para-paragrafos', FontPadrao.paragrafos);
//             document.documentElement.style.setProperty('--familia-da-font-paragrafo', FontPadrao.font_familly);
//             document.documentElement.style.setProperty('--cor-da-font-paragrafo', FontPadrao.cor_fonte);
//             document.documentElement.style.setProperty('--hifens-da-fonte-paragrafo', FontPadrao.hifens);

//             return;
//         }

//         //cria um controlador de fontes para página
//         // console.log(pageData)

//         const slider_container = document.querySelector(pageData.id_component)
//         // console.log(slider_container)

//         //verificar se existe paragrafos dentro do slider
//         // const paragrafos_slider = slider_container.querySelectorAll("p")
//         // // console.log(paragrafos_slider)

//         // paragrafos_slider.forEach((p, index) => {
//         //     p.style.fontSize = `${paragrafos}`;
//         //     p.style.fontFamily = `${font_familly}`;
//         //     p.style.color = `${cor_fonte}`;
//         //     p.style.textAlign = `${alinhamento_texto}`
//         //     p.style.hyphens = `${hifens}`
//         // })

//         document.documentElement.style.setProperty('--tamanho-de-font-para-paragrafo-sidebar', titulo);
//         document.documentElement.style.setProperty('--font-para-paragrafos', paragrafos);
//         document.documentElement.style.setProperty('--familia-da-font-paragrafo', font_familly);
//         document.documentElement.style.setProperty('--cor-da-font-paragrafo', cor_fonte);
//         document.documentElement.style.setProperty('--alinhamento-do-texto-paragrafo',alinhamento_texto);
//         document.documentElement.style.setProperty('--hifens-da-fonte-paragrafo', hifens);


//     } else {

//         if (typeof glider !== 'undefined') {
//             glider.refresh(true);
//             glider.updateControls();
//         } else {
//             console.error('O objeto glider não está definido.');
//         }
//         // Mantém os estilos padrão e atualiza o glider
//         document.documentElement.style.setProperty('--tamanho-de-font-para-paragrafo-sidebar', FontPadrao.titulo);
//         document.documentElement.style.setProperty('--font-para-paragrafos', FontPadrao.paragrafos);
//         document.documentElement.style.setProperty('--familia-da-font-paragrafo', FontPadrao.font_familly);
//         document.documentElement.style.setProperty('--cor-da-font-paragrafo', FontPadrao.cor_fonte);
//         document.documentElement.style.setProperty('--alinhamento-do-texto-paragrafo', FontPadrao.cor_fonte);
//         document.documentElement.style.setProperty('--hifens-da-fonte-paragrafo', FontPadrao.hifens);

//     }
// }
// ------------------ Versão ( 01 ) -----------------

function modificarFontes(slideIndex) {
    const pageData = api[slideIndex];

    // Criar um Font padrão para Página
    const FontPadrao = {
        titulo: getComputedStyle(document.documentElement).getPropertyValue('--tamanho-de-font-para-paragrafo-sidebar').trim(),
        paragrafos: getComputedStyle(document.documentElement).getPropertyValue('--font-para-paragrafos').trim(),
        font_familly: getComputedStyle(document.documentElement).getPropertyValue('--familia-da-font-paragrafo').trim(),
        cor_fonte: getComputedStyle(document.documentElement).getPropertyValue('--cor-da-font-paragrafo').trim(),
        alinhamento_texto: getComputedStyle(document.documentElement).getPropertyValue('--alinhamento-do-texto-paragrafo').trim(),
        hifens: getComputedStyle(document.documentElement).getPropertyValue('--hifens-da-fonte-paragrafo').trim()
    };

    if (pageData && pageData.paramentros && pageData.paramentros.fonte) {
        const {
            titulo = FontPadrao.titulo,
            paragrafos = FontPadrao.paragrafos,
            font_familly = FontPadrao.font_familly,
            cor_fonte = FontPadrao.cor_fonte,
            alinhamento_texto = FontPadrao.alinhamento_texto,
            hifens = FontPadrao.hifens
        } = pageData.paramentros.fonte;

        const verificarItem = pageData.paramentros.logo;
        if (Object.values(verificarItem).length === 0) {
            // Reverter para as fontes padrão
            document.documentElement.style.setProperty('--tamanho-de-font-para-paragrafo-sidebar', FontPadrao.titulo);
            document.documentElement.style.setProperty('--font-para-paragrafos', FontPadrao.paragrafos);
            document.documentElement.style.setProperty('--familia-da-font-paragrafo', FontPadrao.font_familly);
            document.documentElement.style.setProperty('--cor-da-font-paragrafo', FontPadrao.cor_fonte);
            document.documentElement.style.setProperty('--alinhamento-do-texto-paragrafo', FontPadrao.alinhamento_texto);
            document.documentElement.style.setProperty('--hifens-da-fonte-paragrafo', FontPadrao.hifens);

            return;
        }

        // Selecionar o contêiner correto para o slide atual
        const slider_container = document.querySelector(pageData.id_component);

        if (slider_container) {
            // Selecionar todos os parágrafos dentro do contêiner
            const paragrafos_slider = slider_container.querySelectorAll("p");

            paragrafos_slider.forEach((p) => {
                p.style.fontSize = paragrafos;
                p.style.fontFamily = font_familly;
                p.style.color = cor_fonte;
                p.style.textAlign = alinhamento_texto;
                p.style.hyphens = hifens;
            });

            // Aplicar estilos globais para a página atual
            document.documentElement.style.setProperty('--tamanho-de-font-para-paragrafo-sidebar', titulo);
            document.documentElement.style.setProperty('--font-para-paragrafos', paragrafos);
            document.documentElement.style.setProperty('--familia-da-font-paragrafo', font_familly);
            document.documentElement.style.setProperty('--cor-da-font-paragrafo', cor_fonte);
            document.documentElement.style.setProperty('--alinhamento-do-texto-paragrafo', alinhamento_texto);
            document.documentElement.style.setProperty('--hifens-da-fonte-paragrafo', hifens);
        } else {
            console.error('O contêiner do slider não foi encontrado.');
        }

    } else {
        // Se não houver dados ou fontes personalizadas, reverter para as fontes padrão
        document.documentElement.style.setProperty('--tamanho-de-font-para-paragrafo-sidebar', FontPadrao.titulo);
        document.documentElement.style.setProperty('--font-para-paragrafos', FontPadrao.paragrafos);
        document.documentElement.style.setProperty('--familia-da-font-paragrafo', FontPadrao.font_familly);
        document.documentElement.style.setProperty('--cor-da-font-paragrafo', FontPadrao.cor_fonte);
        document.documentElement.style.setProperty('--alinhamento-do-texto-paragrafo', FontPadrao.alinhamento_texto);
        document.documentElement.style.setProperty('--hifens-da-fonte-paragrafo', FontPadrao.hifens);

        if (typeof glider !== 'undefined') {
            glider.refresh(true);
            glider.updateControls();
        } else {
            console.error('O objeto glider não está definido.');
        }
    }
}

// Função para criar Animação no Slider
// ------------------ Versão ( 01 ) -----------------
// function AnimatedParagrafos(slideIndex) {
//     const pageData = api[slideIndex];

//     // Verifica se os dados da página e as animações de texto estão disponíveis
//     if (pageData && pageData.paramentros && pageData.paramentros.animacao_texto) {
//         const animacaoPadrao = {
//             indice: "all",
//             script_animation: "animate__animated animate__backInLeft"
//         };

//         const verificarItem = pageData.paramentros.animacao_texto;
//         if (Object.values(verificarItem).length === 0) {
//             return; // Se não houver animação definida, sai da função
//         }

//         const configurarAnimacao = pageData.paramentros.animacao_texto;
//         configurarAnimacao.forEach((animation) => {
//             const {
//                 script_animation = animacaoPadrao.script_animation,
//                     indice = animacaoPadrao.indice
//             } = animation;

//             if (animation.indice === "all") {
//                 // Se a animação for para todos os parágrafos
//                 const procurarParagrafo = pageData.paramentros.configuracoes_gerais._procurar_paragrafos;

//                 if (procurarParagrafo.status && procurarParagrafo.onde_procurar !== "") {
//                     const procurarParagrafosNoContainer = document.querySelector(procurarParagrafo.onde_procurar.trim());

//                     if (procurarParagrafosNoContainer) {
//                         const paragrafos = procurarParagrafosNoContainer.querySelectorAll("p");
//                         paragrafos.forEach((p) => {
//                             // Remove as classes de animação individualmente, verificando se a classe não está vazia
//                             script_animation.split(" ").forEach(cls => {
//                                 if (cls.trim()) {
//                                     p.classList.remove(cls.trim());
//                                 }
//                             });
//                             void p.offsetWidth; // Força um reflow
//                             // Adiciona novamente as classes de animação
//                             script_animation.split(" ").forEach(cls => {
//                                 if (cls.trim()) {
//                                     p.classList.add(cls.trim());
//                                 }
//                             });
//                         });
//                     }
//                 } else {
//                     // Erro se o local de procura não estiver definido ou ativado
//                     handleErroAnimacao(procurarParagrafo);
//                 }
//             } else {
//                 // Animação específica para um índice de parágrafo
//                 const procurarParagrafo = pageData.paramentros.configuracoes_gerais._procurar_paragrafos;

//                 if (procurarParagrafo.status && procurarParagrafo.onde_procurar !== "") {
//                     const procurarParagrafosNoContainer = document.querySelector(procurarParagrafo.onde_procurar.trim());

//                     if (procurarParagrafosNoContainer) {
//                         const p = procurarParagrafosNoContainer.querySelectorAll("p")[indice];
//                         if (p) {
//                             // Remove as classes de animação individualmente, verificando se a classe não está vazia
//                             script_animation.split(" ").forEach(cls => {
//                                 if (cls.trim()) {
//                                     p.classList.remove(cls.trim());
//                                 }
//                             });
//                             void p.offsetWidth; // Força um reflow
//                             // Adiciona novamente as classes de animação
//                             script_animation.split(" ").forEach(cls => {
//                                 if (cls.trim()) {
//                                     p.classList.add(cls.trim());
//                                 }
//                             });
//                         }
//                     }
//                 } else {
//                     // Erro se o local de procura não estiver definido ou ativado
//                     handleErroAnimacao(procurarParagrafo);
//                 }
//             }
//         });
//     } else {
//         // Atualiza o slider se a animação não estiver definida
//         if (typeof glider !== 'undefined') {
//             glider.refresh(true);
//             glider.updateControls();
//         } else {
//             console.error('O objeto glider não está definido.');
//         }
//     }
// }
// ------------------ Versão ( 01 ) -----------------

// function AnimatedParagrafos(slideIndex) {
//     const pageData = api[slideIndex];

//     if (pageData && pageData.paramentros && pageData.paramentros.animacao_texto) {
//         const animacaoPadrao = {
//             indice: "all",
//             script_animation: "animate__animated animate__fadeInDown animate__slow"
//         };

//         const configurarAnimacao = pageData.paramentros.animacao_texto;
//         configurarAnimacao.forEach((animation) => {
//             const {
//                 script_animation = animacaoPadrao.script_animation,
//                 indice = animacaoPadrao.indice
//             } = animation;

//             const procurarParagrafo = pageData.paramentros.configuracoes_gerais._procurar_paragrafos;

//             if (procurarParagrafo.status && procurarParagrafo.onde_procurar !== "") {
//                 // Seleciona todos os contêineres que possuem a mesma classe
//                 const procurarParagrafosNosContainers = document.querySelectorAll(procurarParagrafo.onde_procurar);

//                 procurarParagrafosNosContainers.forEach((container) => {
//                     const paragrafos = container.querySelectorAll("p");

//                     paragrafos.forEach((p, i) => {
//                         if (indice === "all" || indice == i) {
//                             // Remove as classes de animação para forçar o reprocessamento
//                             script_animation.split(" ").forEach(cls => {
//                                 if (cls.trim()) {
//                                     p.classList.remove(cls.trim());
//                                 }
//                             });

//                             // Utiliza requestAnimationFrame para garantir que a animação seja reaplicada
//                             requestAnimationFrame(() => {
//                                 requestAnimationFrame(() => {
//                                     // Adiciona novamente as classes de animação
//                                     script_animation.split(" ").forEach(cls => {
//                                         if (cls.trim()) {
//                                             p.classList.add(cls.trim());
//                                         }
//                                     });
//                                 });
//                             });
//                         }
//                     });
//                 });

//             } else {
//                 handleErroAnimacao(procurarParagrafo);
//             }
//         });
//     } else {
//         if (typeof glider !== 'undefined') {
//             glider.refresh(true);
//             glider.updateControls();
//         } else {
//             console.error('O objeto glider não está definido.');
//         }
//     }
// }

// Função para Criar animação no Paragrafo

function AnimatedParagrafos(slideIndex) {
    const pageData = api[slideIndex];

    if (pageData && pageData.paramentros && pageData.paramentros.animacao_texto) {
        const animacaoPadrao = {
            indice: "all",
            script_animation: "animate__animated animate__fadeInDown animate__slow"
        };

        const configurarAnimacao = pageData.paramentros.animacao_texto;
        configurarAnimacao.forEach((animation) => {
            const {
                script_animation = animacaoPadrao.script_animation,
                indice = animacaoPadrao.indice
            } = animation;

            const procurarParagrafo = pageData.paramentros.configuracoes_gerais._procurar_paragrafos;

            if (procurarParagrafo.status && procurarParagrafo.onde_procurar !== "") {
                // Seleciona todos os contêineres que possuem a mesma classe
                const procurarParagrafosNosContainers = document.querySelectorAll(procurarParagrafo.onde_procurar);

                procurarParagrafosNosContainers.forEach((container) => {
                    const paragrafos = container.querySelectorAll("p");

                    paragrafos.forEach((p, i) => {
                        if (indice === "all" || indice == i) {
                            // Remove as classes de animação existentes
                            p.className = p.className.replace(/\banimate__\S+/g, '').trim();

                            // Utiliza requestAnimationFrame para garantir que a animação seja reaplicada
                            requestAnimationFrame(() => {
                                // Adiciona novamente as classes de animação
                                script_animation.split(" ").forEach(cls => {
                                    if (cls.trim()) {
                                        p.classList.add(cls.trim());
                                    }
                                });
                            });
                        }
                    });
                });

            } else {
                handleErroAnimacao(procurarParagrafo);
            }
        });
    } else {
        if (typeof glider !== 'undefined') {
            glider.refresh(true);
            glider.updateControls();
        } else {
            console.error('O objeto glider não está definido.');
        }
    }
}

// Função para Criar animação no Elemento
function AnimatedElementos(slideIndex) {
    const pageData = api[slideIndex];

    if (!pageData) {
        console.error('pageData não está definido.');
        return;
    }

    if (!pageData.paramentros) {
        console.error('pageData.paramentros não está definido.');
        return;
    }

    if (!pageData.paramentros.animacao_elemento) {
        console.error('pageData.paramentros.animacao_elemento não está definido.');
        return;
    }

    const animacaoPadrao = {
        elemento: "all",
        script_animation: "animate__animated animate__fadeInRight animate__slow"
    };

    const configurarAnimacao = pageData.paramentros.animacao_elemento;

    configurarAnimacao.forEach((animation) => {
        const {
            script_animation = animacaoPadrao.script_animation,
            elemento = animacaoPadrao.elemento
        } = animation;

        const elementos = document.querySelectorAll(elemento);

        if (elementos.length > 0) {
            elementos.forEach((el) => {
                // Remove as classes de animação existentes
                el.className = el.className.replace(/\banimate__\S+/g, '').trim();

                // Aguarda o próximo ciclo de renderização para adicionar a animação
                requestAnimationFrame(() => {
                    script_animation.split(" ").forEach(cls => {
                        if (cls.trim()) {
                            el.classList.add(cls.trim());
                        }
                    });
                });
            });
        } else {
            console.warn(`Nenhum elemento encontrado para a animação: ${elemento}`);
        }
    });
}

// Função para lidar com erros de animação
function handleErroAnimacao(procurarParagrafo) {
    const erro = {
        status: 204,
        statusText: "Erro Animação",
        responseText: `
Ops, você tentou definir uma animação para o texto, porém:
${procurarParagrafo.onde_procurar ? `Você precisa ativar primeiro o suporte em:
--> (configuracoes_gerais._procurar_paragrafos)
--> Defina o status como true e configure o container de renderização...` : `Você precisa definir onde procurar o texto para encontrar o parágrafo...`}
        `
    };

    const _encodErro = encodeURIComponent(JSON.stringify(erro));

    Swal.fire({
        icon: "error",
        title: `Opps...`,
        text: `Código do Erro: Erro Animação`,
        heightAuto: false,
        footer: `<a href="#" onclick="analiseErro('${_encodErro}')">Baixar Análise de Erro</a>`
    });
}

// Função marcadorTexto
// function adcionarMarcadores(slideIndex) {
//     const pageData = api[slideIndex];

//     if (pageData && pageData.paramentros && pageData.paramentros.marcador) {
//         const slider_container = document.querySelector(pageData.id_component);
//         console.log(slider_container)
//         pageData.paramentros.marcador.forEach((marcadores) => {
//             const {
//                 tipo,
//                 posicao,
//                 palavras,
//                 attr,
//                 estilo_marcador_inject,
//                 attr_inline,
//                 attr_unitario,
//                 fundo,
//                 corTexto,
//                 padding,
//                 onclick
//             } = marcadores;

//             // Verifica se o estilo geral já foi injetado
//             if (estilo_marcador_inject) {
//                 let styleTag = document.querySelector('#style-geral-marcador');
//                 if (!styleTag) {
//                     styleTag = document.createElement('style');
//                     // styleTag.id = 'style-geral-marcador';
//                     document.head.appendChild(styleTag);
//                 }
//                 // Adiciona o estilo ao conteúdo do style
//                 styleTag.textContent += estilo_marcador_inject.trim();
//             }

//             const paragrafo = slider_container.querySelectorAll(tipo)[posicao];
//             console.log(paragrafo)

//             if (paragrafo) {
//                 const palavrasArray = palavras.split('|');

//                 palavrasArray.forEach(palavra => {
//                     // Aplica atributos específicos se existirem
//                     let inlineAttrs = '';
//                     let specificStyles = '';

//                     if (attr_unitario && attr_unitario[palavra]) {
//                         const unitAttr = attr_unitario[palavra];
//                         if (unitAttr.attr) {
//                             unitAttr.attr.split(',').forEach(attribute => {
//                                 const [key, value] = attribute.split('=');
//                                 if (key && value) {
//                                     specificStyles += `${key.trim()}:${value.replace(/\[|\]/g, '').trim()};`;
//                                 }
//                             });
//                         }
//                         if (unitAttr.attr_inline) {
//                             unitAttr.attr_inline.split(',').forEach(attribute => {
//                                 const [key, value] = attribute.split('=');
//                                 if (key && value) {
//                                     inlineAttrs += `${key.trim()}="${value.replace(/\[|\]/g, '').trim()}" `;
//                                 }
//                             });
//                         }
//                     }

//                     // Inclui atributos genéricos
//                     let styles = '';
//                     if (attr) {
//                         attr.split(',').forEach(attribute => {
//                             const [key, value] = attribute.split('=');
//                             if (key && value) {
//                                 styles += `${key.trim()}:${value.replace(/\[|\]/g, '').trim()};`;
//                             }
//                         });
//                     }

//                     styles += `${fundo ? `background-color:${fundo}`:""};${corTexto ? `color:${corTexto}`:""};${padding ? `padding:${padding}`:""}`;
//                     styles += specificStyles; // Sobrescreve atributos genéricos com específicos

//                     const regex = new RegExp(`(?!<span[^>]*>)(${palavra})(?!</span>)`, 'gi');

//                     let inlineAttrs_all = '';
//                     if (attr_inline) {
//                         attr_inline.split(',').forEach(attribute => {
//                             const [key, value] = attribute.split('=');
//                             if (key && value) {
//                                 inlineAttrs_all += `${key.trim()}="${value.replace(/\[|\]/g, '').trim()}" `;
//                             }
//                         });
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

//                         // Só aplica o span se não estiver já dentro de um span
//                         return `<span ${inlineAttrs} ${inlineAttrs_all ? inlineAttrs_all : ""} style="${styles}" ${eventHandlers}>${match}</span>`;
//                     });
//                 });
//             } else {
//                 console.warn(`Elemento ${tipo} na posição ${posicao} não encontrado.`);
//             }
//         });

//     }

// }

// Função marcadorTexto
function adcionarMarcadores(slideIndex) {
    const pageData = api[slideIndex];

    if (pageData && pageData.paramentros && pageData.paramentros.marcador) {
        const slider_containers = document.querySelectorAll(pageData.paramentros.configuracoes_gerais._procurar_paragrafos.onde_procurar);

        if (slider_containers.length === 0) {
            console.warn('Nenhum container encontrado para aplicar o marcador.');
            return;
        }

        slider_containers.forEach(slider_container => {
            pageData.paramentros.marcador.forEach((marcadores) => {
                const {
                    tipo,
                    posicao,
                    palavras,
                    attr,
                    estilo_marcador_inject,
                    attr_inline,
                    attr_unitario,
                    fundo,
                    corTexto,
                    padding,
                    onclick
                } = marcadores;

                // Verifica se o estilo geral já foi injetado
                if (estilo_marcador_inject) {
                    let styleTag = document.querySelector('#style-geral-marcador');
                    if (!styleTag) {
                        styleTag = document.createElement('style');
                        styleTag.id = 'style-geral-marcador';
                        document.head.appendChild(styleTag);
                    }
                    // Adiciona o estilo ao conteúdo do style
                    styleTag.textContent += estilo_marcador_inject.trim();
                }

                const paragrafos = slider_container.querySelectorAll(tipo);

                if (paragrafos && paragrafos[posicao]) {
                    const paragrafo = paragrafos[posicao];
                    const palavrasArray = palavras.split('|');

                    palavrasArray.forEach(palavra => {
                        // Aplica atributos específicos se existirem
                        let inlineAttrs = '';
                        let specificStyles = '';

                        if (attr_unitario && attr_unitario[palavra]) {
                            const unitAttr = attr_unitario[palavra];
                            if (unitAttr.attr) {
                                unitAttr.attr.split(',').forEach(attribute => {
                                    const [key, value] = attribute.split('=');
                                    if (key && value) {
                                        specificStyles += `${key.trim()}:${value.replace(/\[|\]/g, '').trim()};`;
                                    }
                                });
                            }
                            if (unitAttr.attr_inline) {
                                unitAttr.attr_inline.split(',').forEach(attribute => {
                                    const [key, value] = attribute.split('=');
                                    if (key && value) {
                                        inlineAttrs += `${key.trim()}="${value.replace(/\[|\]/g, '').trim()}" `;
                                    }
                                });
                            }
                        }

                        // Inclui atributos genéricos
                        let styles = '';
                        if (attr) {
                            attr.split(',').forEach(attribute => {
                                const [key, value] = attribute.split('=');
                                if (key && value) {
                                    styles += `${key.trim()}:${value.replace(/\[|\]/g, '').trim()};`;
                                }
                            });
                        }

                        styles += `${fundo ? `background-color:${fundo}` : ""};${corTexto ? `color:${corTexto}` : ""};${padding ? `padding:${padding}` : ""}`;
                        styles += specificStyles; // Sobrescreve atributos genéricos com específicos

                        const regex = new RegExp(`(?!<span[^>]*>)(${palavra})(?!</span>)`, 'gi');

                        let inlineAttrs_all = '';
                        if (attr_inline) {
                            attr_inline.split(',').forEach(attribute => {
                                const [key, value] = attribute.split('=');
                                if (key && value) {
                                    inlineAttrs_all += `${key.trim()}="${value.replace(/\[|\]/g, '').trim()}" `;
                                }
                            });
                        }

                        paragrafo.innerHTML = paragrafo.innerHTML.replace(regex, (match) => {
                            let eventHandlers = '';

                            if (onclick) {
                                onclick.forEach(event => {
                                    if (event.palavra === palavra) {
                                        const eventName = event.acao;
                                        const functionName = event.funcao.split('(')[0];

                                        // Verifica se a função já existe
                                        if (!window[functionName]) {
                                            // Cria a função no escopo global através de uma tag <script>
                                            const scriptTag = document.createElement('script');
                                            scriptTag.textContent = event.funcao_script.trim();
                                            document.body.appendChild(scriptTag);
                                        }

                                        // Associa o evento ao span
                                        eventHandlers += `${eventName}="${functionName}()" `;
                                    }
                                });
                            }

                            // Só aplica o span se não estiver já dentro de um span
                            return `<span ${inlineAttrs} ${inlineAttrs_all ? inlineAttrs_all : ""} style="${styles}" ${eventHandlers}>${match}</span>`;
                        });
                    });
                } else {
                    console.warn(`Elemento ${tipo} na posição ${posicao} não encontrado no slide ${slideIndex}.`);
                }
            });
        });
    }
}

// Atualiza as cores da página visível
function atualizarCoresdaNavegacao(slideIndex) {
    const pageData = api[slideIndex];

    // cores padroes que já vem definidas nas variaveis
    const defaultCores = {
        sidebar: getComputedStyle(document.documentElement).getPropertyValue('--fundo-siderbar-js-default'),
        fundo: getComputedStyle(document.documentElement).getPropertyValue('--fundo-carrosel-js-default'),
        icones: getComputedStyle(document.documentElement).getPropertyValue('--cor-dos-icones-siderbar-js-default')
    };

    // console.log(defaultCores.sidebar)
    // console.log(defaultCores.fundo)
    // console.log(defaultCores.icones)

    if (pageData && pageData.paramentros && pageData.paramentros.cores) {
        const {
            sidebar = defaultCores.sidebar,
            fundo = defaultCores.fundo,
            icones = defaultCores.icones,

        } = pageData.paramentros.cores;

        const verificarItem = pageData.paramentros.cores;
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
        glider.updateControls()
        // console.log(defaultCores.sidebar)
        // console.log(defaultCores.fundo)
        // console.log(defaultCores.icones)
        // Se não há parâmetros, mantém os estilos padrão
        document.documentElement.style.setProperty('--fundo-siderbar', defaultCores.sidebar);
        document.documentElement.style.setProperty('--fundo-carrosel', defaultCores.fundo);
        document.documentElement.style.setProperty('--cor-dos-icones-siderbar', defaultCores.icones);
    }
}

// Função para injetar scripts na página
function injectScriptPage(slideIndex) {
    const pageData = api[slideIndex];

    // Verifica se existe a chave "inserir_escript_pagina" na estrutura de parâmetros
    if (pageData && pageData.paramentros && pageData.paramentros.inserir_escript_pagina) {
        const scripts = pageData.paramentros.inserir_escript_pagina;

        scripts.forEach(scriptItem => {
            // Verifica se o script já existe na página
            const existingScript = document.querySelector(`script[src="${scriptItem.src}"]`);
            if (!existingScript) {
                // Cria um elemento de script
                const scriptElement = document.createElement('script');
                scriptElement.src = scriptItem.src;

                // Verifica a posição do script (head, body, etc.)
                let parentElement;
                switch (scriptItem.onde) {
                    case 'head':
                        parentElement = document.head;
                        break;
                    case 'body':
                        parentElement = document.body;
                        break;
                    case 'footer':
                        parentElement = document.querySelector('footer');
                        break;
                    default:
                        parentElement = document.body;
                }

                // Insere o script na posição especificada dentro do elemento pai
                const insertPosition = scriptItem.posicao || 'beforeend';
                parentElement.insertAdjacentElement(insertPosition, scriptElement);
            }
        });
    } else {
        // Atualiza o controle do glider caso não haja scripts
        glider.refresh(true);
        glider.updateControls();
    }
}

// Força Atualição
function AnimationVariablesUpPage(slideIndex) {
    const pageData = api[slideIndex];

    if (pageData && pageData.paramentros && pageData.forcarAtualizacao) {
        const variaveis = pageData.forcarAtualizacao.variaveis || [];
        aplicarReflowVariaveis(variaveis);
    } else {
        // Atualiza o controle do glider se estiver definido
        if (typeof glider !== 'undefined') {
            glider.refresh(true);
            glider.updateControls();
        } else {
            console.error('O objeto glider não está definido.');
        }

        // Caso o `pageData` esteja indefinido ou não possua `forcarAtualizacao`, ainda tentar aplicar o reflow nas variáveis
        const variaveis = pageData?.forcarAtualizacao?.variaveis || [];
        aplicarReflowVariaveis(variaveis);
    }
}

// Função para aplicar o reflow e atualizar as variáveis de animação
function aplicarReflowVariaveis(variaveis) {
    variaveis.forEach(variable => {
        // Define o valor de 'Entrada' antes do reflow
        document.documentElement.style.setProperty(variable.Nome, variable.Entrada);
    });

    // Força o reflow
    void document.documentElement.offsetWidth;

    variaveis.forEach(variable => {
        // Define o valor de 'Saida' após o reflow
        document.documentElement.style.setProperty(variable.Nome, variable.Saida);
    });
}

// Função para injetar Estilo na página
function injectEstiloRender(slideIndex) {
    const pageData = api[slideIndex];

    // Verifica se as URLs de estilos existem na estrutura de parâmetros
    if (pageData && pageData.paramentros && pageData.paramentros.inserir_estilo_pagina) {
        const urls = pageData.paramentros.inserir_estilo_pagina;
        // console.log(urls )
        urls.forEach(styleObj => {
            if (styleObj.url) {
                // Cria um novo elemento <link> para o estilo
                const linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.href = styleObj.url;
                linkElement.type = "text/css"
                // console.log(linkElement)

                // Adiciona o <link> ao head do documento
                document.head.appendChild(linkElement);

            }
        });

    } else {
        // Atualiza o controle do glider caso não haja estilos para injetar
        glider.refresh(true);
        glider.updateControls();
    }
}





function modulosPage(slideIndex) {
    const pageData = api[slideIndex];

    const tokens = [
        "e3f17edd7b9c4d6cb3a333b278aae0e9", // Primeira chave de API
    ];

    // Lista de idiomas e vozes 
    const languages = {
        'pt-br': { name: 'Português (Brasil)', voices: ['Marcia', 'Ligia', 'Yara', 'Dinis'] },
    };

    if (pageData.paramentros && pageData.paramentros.modulos) {
        const moduloAudio = pageData.paramentros.modulos;

        moduloAudio.forEach((modulos) => {
            const containerAudio = document.querySelector(".audio-convertido-ouvinte");
            containerAudio.innerHTML = "";

            // Criando os seletores de idioma e voz dinamicamente
            const audioFerramentas = `

                <div class="text-center d-flex justify-content-end gap-2 mt-3">
                  <span class="loading-voz" style="display: none;"></span>
                </div>
                <div class="container-ferramenta-ouvinte">
                    <button class="btn btn-success playOuvint-btn"><i class="bi bi-play-fill"></i></button>
                    <button class="btn btn-danger stopOuvint-btn"><i class="bi bi-stop-fill"></i></button>
                    <button class="btn btn-primary openDownload-btn d-flex justify-content-center align-items-center"><i class="bi bi-download"></i></button>
               </div>

               <div class="accordion mt-2 d-none " id="configuracao-ouvinte">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button d-flex flex-row gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Configurações de <span class="p-1 border rounded border-success">Áudio</span> para download <i class="bi bi-soundwave"></i>
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#configuracao-ouvinte">
                        <div class="accordion-body">

                                <div class="mb-3">
                                    <label for="voice-select">Selecione a voz:</label>
                                    <select id="voice-select" class="form-control"></select>
                                </div>

                                <div class="mb-3">
                                    <label for="language-select">Selecione o idioma:</label>
                                    <select id="language-select" class="form-control">
                                        ${Object.keys(languages).map(langCode => `<option value="${langCode}">${languages[langCode].name}</option>`).join('')}
                                    </select>
                                </div>

                                 <div class="mb-3">
                                    <label for="speed-range">Velocidade (0 a 10):</label>
                                    <input type="range" class="form-range" id="speed-range" min="-10" max="10" value="0">
                                </div>

                                <div class="mb-3">
                                    <label for="pitch-range">Tom (grave/fino):</label>
                                    <input type="range" class="form-range" id="pitch-range" min="0.5" max="2" step="0.1" value="1">
                                </div>

                                <button id="button-Dowload-Ouvinte" class="btn btn-success  download-btn">Baixar Áudio <i class="bi bi-download"></i></button>

                                <!-- Logs da Operação -->
                                <!--
                                <div class="mb-3">
                                    <textarea class="Texto-download form-control" style="resize:none;" rows="2" disabled placeholder="Logs de operação"></textarea>
                                </div>
                                -->
                        </div>
                        </div>
                    </div>
                </div>


            `;

            containerAudio.innerHTML += audioFerramentas;

            function addAccordionConfigDownload(){
                const configuracaoDownload = document.getElementById("configuracao-ouvinte");
                const openCollapeseDownload = document.getElementById("collapseOne");
                
                if(configuracaoDownload.classList.contains("d-none")){
                    configuracaoDownload.classList.remove("d-none")
                    openCollapeseDownload.classList.add("show")
                    configuracaoDownload.classList.add("d-block")
           
                }
            }
            
            function removeAccordionConfigDownload(){
                const configuracaoDownload = document.getElementById("configuracao-ouvinte");
                
                if(configuracaoDownload.classList.contains("d-block")){
                    configuracaoDownload.classList.remove("d-block")
                    configuracaoDownload.classList.add("d-none")

                }
            }

            const abrirOuvinteDownload = document.querySelector(".openDownload-btn")
            abrirOuvinteDownload.addEventListener('click',()=>{
                addAccordionConfigDownload()
            })


            


            // Função para popular vozes com base no idioma selecionado
            function popularVozes(langCode) {
                const voiceSelect = document.getElementById('voice-select');
                voiceSelect.innerHTML = ''; // Limpar vozes anteriores
                const voices = languages[langCode].voices;
                voices.forEach(voice => {
                    const option = document.createElement('option');
                    option.value = voice;
                    option.textContent = voice;
                    voiceSelect.appendChild(option);
                });
            }

            // Inicialmente popular com o primeiro idioma
            const languageSelect = document.getElementById('language-select');
            popularVozes(languageSelect.value);

            // Mudar vozes ao mudar o idioma
            languageSelect.addEventListener('change', (e) => {
                popularVozes(e.target.value);
            });

            // Função para alternar entre as chaves de API
            function usarOutraChave(indexAtual) {
                if (indexAtual < tokens.length - 1) {
                    return tokens[indexAtual + 1];
                } else {
                    return null; // Se não houver mais chaves
                }
            }

            // Função para popular vozes com base no idioma selecionado
            function popularVozes(langCode) {
                const voiceSelect = document.getElementById('voice-select');
                voiceSelect.innerHTML = ''; // Limpar vozes anteriores
                const voices = languages[langCode].voices;
                voices.forEach(voice => {
                    const option = document.createElement('option');
                    option.value = voice;
                    option.textContent = voice;
                    voiceSelect.appendChild(option);
                });
            }
            // Mudar vozes ao mudar o idioma
            languageSelect.addEventListener('change', (e) => {
                popularVozes(e.target.value);
            });

            // Variáveis para controle
            let isPlaying = false; // Variável para controlar o estado de reprodução
            let textoAtual = ''; // Texto que está sendo lido
            let textoRestante = ''; // Parte restante do texto após a pausa
            let posicaoAtual = 0; // Posição atual da leitura do texto

            // Função para iniciar a leitura de voz (SpeechSynthesis)
            const loadingVoz = document.querySelector(".loading-voz");

            function lerTextoOuvinte(texto, posicaoInicial = 0) {
                // Mostra o loading enquanto a voz está sendo carregada ou processada
                loadingVoz.style.display = 'block';

                // Verifica se o navegador suporta SpeechSynthesis
                if (!window.speechSynthesis) {
                    loadingVoz.style.display = "none";
                    alert("Seu navegador não suporta a síntese de voz.");
                    return;
                }

                // Voz padrão do google
                const vozPadrao = {
                    lang: "en-US",
                    name: "Google US English",
                    voiceURI: "Google US English"
                }

                // Configurando a voz padrão (pode ser ajustada conforme desejado)
                const voz = window.speechSynthesis.getVoices().find(voice => voice.lang === 'pt-BR');

                // Criar a síntese de fala a partir da posição inicial
                const utterance = new SpeechSynthesisUtterance(texto.substring(posicaoInicial));
                utterance.voice = voz || window.speechSynthesis.getVoices()[0];
                utterance.pitch = 1; // Padrão de tom
                utterance.rate = 1;  // Padrão de velocidade

                // Acompanhar o progresso da fala e salvar a posição atual
                utterance.onboundary = function (event) {
                    if (event.name === 'word') {
                        posicaoAtual = event.charIndex + posicaoInicial;
                    }
                };

                // Quando a fala terminar, esconde o loading e reseta o botão
                utterance.onend = function () {
                    loadingVoz.style.display = 'none';
                    isPlaying = false;
                    resetPlayButton(); // Reseta o botão para "Play"
                };

                // Iniciar a fala
                window.speechSynthesis.speak(utterance);
            }

            // Elementos de controle do áudio
            const playBtn = containerAudio.querySelector(".playOuvint-btn");
            const stopBtn = containerAudio.querySelector(".stopOuvint-btn");
            const textoOuvinte = document.querySelectorAll(modulos.audio.idRef)[slideIndex - 1].innerText || '';

            // Função para alternar entre "Play" e "Pause"
            playBtn.addEventListener('click', () => {
                if (!isPlaying) {
                    // Iniciar ou retomar reprodução
                    lerTextoOuvinte(textoOuvinte, posicaoAtual);  // Chama a função para ler o texto com a voz padrão
                    playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>'; // Troca o ícone para "Pause"
                    playBtn.classList.remove('btn-success'); // Muda a cor para "Pause"
                    playBtn.classList.add('btn-warning');
                    isPlaying = true;
                    removeAccordionConfigDownload()
                } else {
                    // Pausar reprodução
                    window.speechSynthesis.cancel(); // Pausar a síntese de voz (salvaremos a posição atual)
                    textoRestante = textoOuvinte.substring(posicaoAtual); // Salva a parte restante do texto
                    playBtn.innerHTML = '<i class="bi bi-play-fill"></i>'; // Troca o ícone de volta para "Play"
                    playBtn.classList.remove('btn-warning'); // Muda a cor de volta para "Play"
                    playBtn.classList.add('btn-success');
                    isPlaying = false;
                    loadingVoz.style.display = "none"; // Esconder o loading
                    removeAccordionConfigDownload()
                }
            });


            document.querySelector(".btn-close-ouvinte").addEventListener("click", () => {
                window.speechSynthesis.cancel();  // Interrompe a síntese de voz se estiver acontecendo
                playBtn.innerHTML = '<i class="bi bi-play-fill"></i>'; // Reseta o ícone para "Play"
                playBtn.classList.remove('btn-warning'); // Muda a cor de volta para "Play"
                playBtn.classList.add('btn-success');
                isPlaying = false;
                posicaoAtual = 0; // Resetar a posição atual
                textoRestante = ''; // Limpar o texto restante
                loadingVoz.style.display = "none"; // Esconder o loading
                removeAccordionConfigDownload()
            })

            // Função para parar o áudio e resetar o botão "Play"
            stopBtn.addEventListener('click', () => {
                window.speechSynthesis.cancel();  // Interrompe a síntese de voz se estiver acontecendo
                playBtn.innerHTML = '<i class="bi bi-play-fill"></i>'; // Reseta o ícone para "Play"
                playBtn.classList.remove('btn-warning'); // Muda a cor de volta para "Play"
                playBtn.classList.add('btn-success');
                isPlaying = false;
                posicaoAtual = 0; // Resetar a posição atual
                textoRestante = ''; // Limpar o texto restante
                loadingVoz.style.display = "none"; // Esconder o loading
            });

            // Função para resetar o botão "Play"
            function resetPlayButton() {
                playBtn.innerHTML = '<i class="bi bi-play-fill"></i>'; // Reseta o ícone para "Play"
                playBtn.classList.remove('btn-warning'); // Muda a cor de volta para "Play"
                playBtn.classList.add('btn-success');
            }


            // Função de síntese de voz
            function sintetizarAudio(apiKey, texto, velocidade, tom, langCode, voz, logPre) {
                const apiUrl = `https://api.voicerss.org/`;
                const params = new URLSearchParams({
                    key: apiKey,
                    src: texto,
                    hl: langCode,  // Idioma selecionado
                    v: voz,        // Voz selecionada
                    r: velocidade,  // Velocidade escolhida
                    c: 'MP3',  // Formato do áudio
                    f: '44khz_16bit_stereo'  // Qualidade do áudio
                });

                const sppinnerButton = document.querySelector(".download-btn")

                sppinnerButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`

                logPre.textContent += `Chave Validada!...\n`;

                return fetch(`${apiUrl}?${params.toString()}`, {
                    method: 'GET',
                })
                    .then(response => {
                        logPre.textContent += `Criando Ponto de Transmissão\n`;

                        if (response.ok) {
                            logPre.textContent += `${response.status}\n`;
                            logPre.textContent += 'Áudio gerado com sucesso!\n';
                             sppinnerButton.innerHTML = `<i class="bi bi-download"></i>`
                            return response.blob();
                        } else {
                            logPre.textContent += `Erro com a chave ${apiKey}: ${response.statusText}\n`;
                            throw new Error('Erro ao gerar áudio');
                        }
                    });
            }

            // // Pegar módulo de áudio
            // if (modulos.audio) {
            //     // Verificar se áudio está ativo
            //     if (modulos.audio.ativo) { }

            // }

            // Adicionar evento ao botão de download e reprodução
            const downloadBtn = containerAudio.querySelector(".download-btn");
            downloadBtn.addEventListener('click', function () {
                const texto = document.querySelectorAll(modulos.audio.idRef)[slideIndex - 1].innerText || '';
                const velocidade = document.getElementById("speed-range").value;  // Pegar a velocidade
                const tom = document.getElementById("pitch-range").value;  // Pegar o tom
                const langCode = document.getElementById("language-select").value;  // Pegar o idioma
                const voz = document.getElementById("voice-select").value;  // Pegar a voz
                const logPre = containerAudio.querySelector(".Texto-download");

                logPre.textContent = ''; // Limpar logs anteriores
                let chaveAtual = 0; // Começar pela primeira chave

                function tentarProximaChave() {
                    sintetizarAudio(tokens[chaveAtual], texto, velocidade, tom, langCode, voz, logPre)
                        .then(blob => {
                            const url = URL.createObjectURL(blob);
                            // Criar link para baixar o arquivo de áudio
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = 'audio.mp3';
                            link.click();

                        })
                        .catch(error => {
                            logPre.textContent += `Erro: ${error.message}\n`;
                            chaveAtual += 1;
                            const novaChave = usarOutraChave(chaveAtual);
                            if (novaChave) {
                                logPre.textContent += `Tentando com a próxima chave...\n`;
                                tentarProximaChave(); // Tentar novamente com outra chave
                            } else {
                                logPre.textContent += 'Todas as chaves falharam.\n';
                            }
                        });
                }

                tentarProximaChave(); // Iniciar a tentativa com a primeira chave
            });
        });
    }
}





// Atualiza o título e as cores ao inicializar
updatePageTitle(savedPosition);
atualizarCoresdaNavegacao(savedPosition);
adicionarLogo(savedPosition);
modificarFontes(savedPosition);
adcionarMarcadores(savedPosition);
adicionarFundo(savedPosition)
injectScriptPage(savedPosition);
AnimatedParagrafos(savedPosition);
AnimationVariablesUpPage(savedPosition);
AnimatedElementos(savedPosition)
injectEstiloRender(savedPosition)
modulosPage(savedPosition)

// Rederizar Menu
const irItem = itemnsMenu('', savedPosition, filtroDuplicadoSumario);
// console.log(irItem)
// Pesquisar Item Menu
handleSearch();

// console.log(api[savedPosition]);
