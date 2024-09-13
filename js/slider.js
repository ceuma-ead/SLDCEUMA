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

// Função para definir um cookie com expiração em minutos
function setCookie(name, value, minutes) {
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

// Função para obter o valor de um cookie
function getCookie(name) {
    const cname = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArr = decodedCookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf(cname) === 0) {
            return cookie.substring(cname.length, cookie.length);
        }
    }
    return "";
}

// Função para apagar o cookie (opcional)
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Modulos da página
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
                            Configurações de Áudio para download <i class="bi bi-soundwave"></i>
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#configuracao-ouvinte">
                        <div class="accordion-body">

                                <div class="mb-3">
                                    <label for="voice-select">Selecione a voz:</label>
                                    <select id="voice-select" class="form-control changerVoice"></select>
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
                                
                               <!-- Ocultar Tom -->
                                <div class="mb-3  d-none">
                                    <label for="pitch-range">Tom (grave/fino):</label>
                                    <input type="range" class="form-range" id="pitch-range" min="0.5" max="2" step="0.1" value="1">
                                </div>

                                <style>
         
                                .preview-section {
                                    border: 2px solid #f1f1f1;
                                    border-radius: 12px;
                                    padding: .5rem;
                                    background-color: #f9fafc;
                                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                    transition: all 0.3s ease;
                                    cursor: pointer;
                                }

                                .preview-section[open] {
                                    border-color: #a6dcef;
                                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                                }

                                /* Estilo para o sumário */
                                .preview-summary {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    font-size: 18px;
                                    font-weight: 600;
                                    color: #333;
                                    // padding-bottom: 10px;
                                }

                                .preview-title {
                                    color: #0056b3;
                                    font-size: 20px;
                                }

                                .preview-attempts {
                                    background-color: #f1f3f4;
                                    border-radius: 8px;
                                    padding: 5px 10px;
                                    font-size: 14px;
                                    color: #444;
                                }

                                .attempts-counter {
                                    font-weight: bold;
                                    color: #e63946;
                                }

                                /* Estilo dos botões */
                                .preview-controls {
                                    display: flex;
                                    gap: 10px;
                                }

                                .btn {
                                    padding: 8px 16px;
                                    border-radius: 8px;
                                    font-size: 16px;
                                    font-weight: 600;
                                    transition: background-color 0.3s ease, transform 0.2s ease;
                                    cursor: pointer;
                                    border: none;
                                }

                                .btn-play {
                                    font-size: 16px !important;
                                    background-color: #f15f0e;
                                    font-weight: 100;
                                    color: white;
                                }

                                .btn-play:hover {
                                    background-color: #f15f0e;
                                    transform: scale(1.05);
                                }

                                .btn-pause {
                                    font-size: 16px !important;
                                    font-weight: 100;
                                    background-color: #dc3545;
                                    color: white;
                                }

                                .btn-pause:hover {
                                    background-color: #c82333;
                                    transform: scale(1.05);
                                }

                                /* Animação de abrir e fechar o <details> */
                                details[open] .preview-controls {
                                    opacity: 1;
                                    max-height: 100px;
                                    transition: opacity 0.5s ease, max-height 0.5s ease;
                                }

                                details .preview-controls {
                                    opacity: 0;
                                    max-height: 0;
                                    transition: opacity 0.5s ease, max-height 0.5s ease;
                                }


                                </style>
                               
                
                               <details class="preview-section mb-3 open">
                                <summary class="preview-summary">
                                <div class="preview-controls">
                                    <button id="btnPlayPrevizualizar" class="btn btn-play">Pré-visualizar</button>
                                    <button id="btnPausePrevizualizar" class="btn btn-pause align-items-center gap-3" style="display:none;">Parar <div class="loader-speech"></div></button>
                                </div>
                                    <!-- <span class="preview-title">Pré-visualizar</span> -->
                                    <span class="preview-attempts">Pré-visualizações : <span class="attempts-counter border-danger">0/3</span></span>
                                </summary>
                                
                            </details>


                                <button id="button-Dowload-Ouvinte" class="btn btn-success download-btn">Baixar Áudio</button>

                                <!-- Logs da Operação -->
                            
                                <div class="mb-3 d-none">
                                    <textarea class="Texto-download form-control" style="resize:none;" rows="2" disabled placeholder="Logs de operação"></textarea>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>
            `;

            containerAudio.innerHTML += audioFerramentas;

            // Função para popular vozes com base no idioma selecionado
            function popularVozes(langCode) {
                const voiceSelect = document.getElementById('voice-select');
                voiceSelect.innerHTML = ''; // Limpar vozes anteriores
                if (languages[langCode]) {
                    const voices = languages[langCode].voices;
                    voices.forEach(voice => {
                        const option = document.createElement('option');
                        option.value = voice;
                        option.textContent = voice;
                        voiceSelect.appendChild(option);
                    });
                }
            }

            // Inicialmente popular com o primeiro idioma
            const languageSelect = document.getElementById('language-select');
            popularVozes(languageSelect.value);

            // Mudar vozes ao mudar o idioma
            languageSelect.addEventListener('change', (e) => {
                popularVozes(e.target.value);
            });


            // Elementos de controle do áudio
            const playBtn = containerAudio.querySelector(".playOuvint-btn");
            const stopBtn = containerAudio.querySelector(".stopOuvint-btn");

            const textoOuvinte = document.querySelectorAll(modulos.audio.idRef)[slideIndex - 1].innerText || '';


            function addAccordionConfigDownload() {
                const configuracaoDownload = document.getElementById("configuracao-ouvinte");
                const openCollapeseDownload = document.getElementById("collapseOne");

                if (configuracaoDownload.classList.contains("d-none")) {
                    configuracaoDownload.classList.remove("d-none")
                    openCollapeseDownload.classList.add("show")
                    configuracaoDownload.classList.add("d-block")

                }
            }

            function removeAccordionConfigDownload() {
                const configuracaoDownload = document.getElementById("configuracao-ouvinte");

                if (configuracaoDownload.classList.contains("d-block")) {
                    configuracaoDownload.classList.remove("d-block")
                    configuracaoDownload.classList.add("d-none")

                }
            }


            // ========================================== | Previzualizar Áudio | ========================================= //

            const maxTentativas = 2; // Limite máximo de tentativas
            const tentativasSpan = document.querySelector(".attempts-counter"); // Elemento que exibe as tentativas
            const containerTentativas = document.querySelector(".preview-controls"); // Container para exibir o relógio
            const previewSection = document.querySelector(".preview-section");
            let tentativas = 0; // Variável para controlar o número de tentativas
            const playBtnPrevizualizar = document.getElementById("btnPlayPrevizualizar");
            const pauseBtnPrevizualizar = document.getElementById("btnPausePrevizualizar");
            const loaderSpeech = document.getElementById("loader-speech");
            let audioOuvinte = null;  // Variável global para armazenar a instância atual do áudio
            let audioBlobUrl = null;  // Variável para armazenar o URL do blob atual
            let audioGerado = false;  // Variável para verificar se o áudio já foi gerado
            previewSection.setAttribute('open', true)
            // Tempo de expiração do chave cookie para reinicar tentativas api
            const expiracaoChaveCookie = 60

            // Função para verificar e atualizar as tentativas
            function verificarTentativas() {
                tentativas = getCookie("tentativasAudio");
                tentativas = tentativas ? parseInt(tentativas) : 0; // Se não existir, começa com 0
                tentativasSpan.textContent = `${tentativas}/${maxTentativas}`; // Atualiza o contador na UI

                // Se já alcançou o limite de tentativas, desabilita o botão Play
                if (tentativas >= maxTentativas) {
                    const expiracao = getCookie("expiracaoAudio");
                    if (expiracao) {
                        iniciarRelogio(new Date(expiracao));
                    } else {
                        const novaExpiracao = new Date();
                        novaExpiracao.setTime(novaExpiracao.getTime() + expiracaoChaveCookie * 60 * 1000); // 30 minutos
                        setCookie("expiracaoAudio", novaExpiracao.toUTCString(), expiracaoChaveCookie);
                        iniciarRelogio(novaExpiracao);
                    }

                }
            }

            // Função para incrementar as tentativas
            function incrementarTentativas() {
                tentativas++;
                setCookie("tentativasAudio", tentativas, 30); // Expira em 30 minutos
                tentativasSpan.textContent = ` ${tentativas}/${maxTentativas}`;
            }

            // Função para iniciar o relógio de contagem regressiva
            function iniciarRelogio(dataExpiracao) {
                const intervalo = setInterval(() => {
                    const agora = new Date().getTime();
                    const distancia = new Date(dataExpiracao).getTime() - agora;

                    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
                    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
                    if (audioOuvinte) {
                        audioOuvinte.pause();
                    }

                    containerTentativas.innerHTML = `
                        <div class="relogio-container" style="display: flex; align-items: center; gap: 10px;">
                            <img src="https://img.icons8.com/ios-filled/50/000000/hourglass--v1.png" alt="Relógio ícone" style="width: 30px; height: 30px;">
                            <div style="font-size: 14px; font-weight: bold;">
                                Tente Novamente em <span style="color: red;">${minutos}m ${segundos}s</span>
                            </div>
                        </div>
                        `;

                    // Se o tempo acabar, permite novas tentativas
                    if (distancia < 0) {
                        clearInterval(intervalo);
                        deleteCookie("tentativasAudio");
                        deleteCookie("expiracaoAudio");
                        containerTentativas.innerHTML = "Acesso liberado recarregue a página!";
                        tentativasSpan.textContent = `Tentativas 0/${maxTentativas}`;
                        playBtnPrevizualizar.disabled = false; // Reabilita o botão "Play"
                        verificarTentativas();
                    }
                }, 1000);
            }

            // Chama a função ao carregar a página para verificar as tentativas atuais
            verificarTentativas();

            // // Função para sintetizar e gerar o áudio
            // function gerarAudio() {
            //     const texto = document.querySelectorAll(modulos.audio.idRef)[slideIndex - 1].innerText || '';
            //     const velocidade = document.getElementById("speed-range").value;
            //     const tom = document.getElementById("pitch-range").value;
            //     const langCode = document.getElementById("language-select").value;
            //     const voz = document.getElementById("voice-select").value;

            //     playBtnPrevizualizar.innerHTML = `
            //         <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            //         Play
            //     `;

            //     sintetizarAudio(tokens[0], texto, velocidade, tom, langCode, voz, "")
            //         .then(blob => {
            //             // Libera o URL anterior do blob para liberar recursos
            //             if (audioBlobUrl) {
            //                 URL.revokeObjectURL(audioBlobUrl);
            //             }

            //             audioBlobUrl = URL.createObjectURL(blob);
            //             audioOuvinte = new Audio(audioBlobUrl); // Define o novo áudio gerado
            //             audioGerado = true;  // Marca que o áudio foi gerado

            //             playBtnPrevizualizar.innerHTML = `Play`;

            //             // Quando o áudio estiver pronto, atualiza a interface
            //             audioOuvinte.addEventListener("loadeddata", () => {
            //                 const durationElement = document.querySelector(".time .length");
            //                 if (durationElement) {
            //                     durationElement.textContent = getTimeCodeFromNum(audioOuvinte.duration);
            //                 }
            //                 audioOuvinte.volume = 0.75;
            //             });

            //             // Tocar o áudio gerado
            //             audioOuvinte.play();

            //             // Alternar entre os botões "Play" e "Pause"
            //             playBtnPrevizualizar.style.display = "none";
            //             pauseBtnPrevizualizar.style.display = "flex";

            //             // Quando o áudio parar, volta para o botão "Play"
            //             audioOuvinte.onended = () => {
            //                 playBtnPrevizualizar.style.display = "inline-block";
            //                 pauseBtnPrevizualizar.style.display = "none";
            //             };
            //         })
            //         .catch(error => {
            //             console.error("Erro ao gerar o áudio", error);
            //         });
            // }

            // // Evento para o botão de "Play"
            // playBtnPrevizualizar.addEventListener("click", () => {
            //     if (tentativas < maxTentativas) {
            //         incrementarTentativas(); // Incrementa as tentativas ao clicar em "Play"

            //         // Regenera o áudio sempre que os valores mudarem
            //         document.getElementById("speed-range").addEventListener("change", gerarAudio);
            //         document.getElementById("pitch-range").addEventListener("change", gerarAudio);
            //         document.getElementById("language-select").addEventListener("change", gerarAudio);
            //         document.getElementById("voice-select").addEventListener("change", gerarAudio);

            //         if (!audioGerado) {
            //             gerarAudio(); // Gera o áudio se ele ainda não foi gerado
            //         } else {
            //             audioOuvinte.play(); // Caso já tenha sido gerado, apenas toca o áudio
            //             playBtnPrevizualizar.style.display = "none";
            //             pauseBtnPrevizualizar.style.display = "flex";
            //         }
            //     }
            // });


            // // Evento para o botão de "Pause"
            // pauseBtnPrevizualizar.addEventListener("click", () => {

            //     if (audioOuvinte) {
            //         verificarTentativas();
            //         audioOuvinte.pause();

            //         playBtnPrevizualizar.style.display = "inline-block";
            //         pauseBtnPrevizualizar.style.display = "none";
            //     }
            // });



            // ============================================================================================================= \\

            // Variáveis para armazenar os valores atualizados dos controles

            let velocidadeAtual = document.getElementById("speed-range").value;
            let tomAtual = document.getElementById("pitch-range").value;
            let langCodeAtual = document.getElementById("language-select").value;
            let vozAtual = document.getElementById("voice-select").value;

            // Atualiza as variáveis de controle sem regenerar o áudio imediatamente

            document.getElementById("speed-range").addEventListener("change", (e) => {
                velocidadeAtual = e.target.value;
                localStorage.setItem('velocidade', velocidadeAtual); // Salva no localStorage
            });

            document.getElementById("pitch-range").addEventListener("change", (e) => {
                tomAtual = e.target.value;
                localStorage.setItem('tom', tomAtual); // Salva no localStorage
            });

            document.getElementById("language-select").addEventListener("change", (e) => {
                langCodeAtual = e.target.value;
                localStorage.setItem('langCode', langCodeAtual); // Salva no localStorage
                popularVozes(langCodeAtual);
            });

            document.getElementById("voice-select").addEventListener("change", (e) => {
                vozAtual = e.target.value;
                localStorage.setItem('voz', vozAtual); // Salva no localStorage
            });

            // Carrega os valores do localStorage ao iniciar a página
            if (localStorage.getItem('velocidade')) {
                velocidadeAtual = localStorage.getItem('velocidade');
                document.getElementById("speed-range").value = velocidadeAtual;
            }

            if (localStorage.getItem('tom')) {
                tomAtual = localStorage.getItem('tom');
                document.getElementById("pitch-range").value = tomAtual;
            }

            if (localStorage.getItem('langCode')) {
                langCodeAtual = localStorage.getItem('langCode');
                document.getElementById("language-select").value = langCodeAtual;
            }

            if (localStorage.getItem('voz')) {
                vozAtual = localStorage.getItem('voz');
                document.getElementById("voice-select").value = vozAtual;
            }

            let chavePreview = 0; // Começar pela primeira chave
            // Função para sintetizar e gerar o áudio sempre que "Play" é clicado
            function gerarAudio() {
                const texto = document.querySelectorAll(modulos.audio.idRef)[slideIndex - 1].innerText || '';

                playBtnPrevizualizar.innerHTML = `
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Play
                `;

                sintetizarAudio(tokens[chavePreview], texto, velocidadeAtual, tomAtual, langCodeAtual, vozAtual, "")
                    .then(blob => {

                        // Libera o URL anterior do blob para liberar recursos
                        if (audioBlobUrl) {
                            URL.revokeObjectURL(audioBlobUrl);
                        }

                        audioBlobUrl = URL.createObjectURL(blob);
                        audioOuvinte = new Audio(audioBlobUrl); // Define o novo áudio gerado
                        audioGerado = true;  // Marca que o áudio foi gerado

                        playBtnPrevizualizar.innerHTML = `Pré-visualizar`;

                        // Quando o áudio estiver pronto, atualiza a interface
                        audioOuvinte.addEventListener("loadeddata", () => {
                            const durationElement = document.querySelector(".time .length");
                            if (durationElement) {
                                durationElement.textContent = getTimeCodeFromNum(audioOuvinte.duration);
                            }
                            audioOuvinte.volume = 0.75;
                        });

                        // Tocar o áudio gerado
                        audioOuvinte.play();

                        // Alternar entre os botões "Play" e "Pause"
                        playBtnPrevizualizar.style.display = "none";
                        pauseBtnPrevizualizar.style.display = "flex";

                        // Quando o áudio parar, volta para o botão "Play"
                        audioOuvinte.onended = () => {
                            playBtnPrevizualizar.style.display = "inline-block";
                            pauseBtnPrevizualizar.style.display = "none";
                        };
                    })
                    .catch(error => {
                        const novaChave = usarOutraChave(chaveAtual);
                        if (novaChave) {
                            chavePreview += 1
                            gerarAudio(); // Tentar novamente com outra chave
                        }
                        console.error("Erro ao gerar o áudio", error);
                    });
            }

            // Evento para o botão de "Play"
            playBtnPrevizualizar.addEventListener("click", () => {
                verificarTentativas();
                if (tentativas < maxTentativas) {
                    incrementarTentativas(); // Incrementa as tentativas ao clicar em "Play"
                    gerarAudio(); // Sempre gera o áudio com os valores atualizados ao clicar em "Play"
                }
            });

            // Evento para o botão de "Pause"
            pauseBtnPrevizualizar.addEventListener("click", () => {
                verificarTentativas();
                if (audioOuvinte) {
                    audioOuvinte.pause();
                    playBtnPrevizualizar.style.display = "inline-block";
                    pauseBtnPrevizualizar.style.display = "none";
                }
            });



            const abrirOuvinteDownload = document.querySelector(".openDownload-btn")
            abrirOuvinteDownload.addEventListener('click', () => {
                addAccordionConfigDownload()
            })


            // Função para alternar entre as chaves de API
            function usarOutraChave(indexAtual) {
                if (indexAtual < tokens.length - 1) {
                    return tokens[indexAtual + 1];
                } else {
                    return null; // Se não houver mais chaves
                }
            }


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

                // Configurando a voz padrão (pode ser ajustada conforme desejado) 
                // const voz = window.speechSynthesis.getVoices().find(voice => voice.voiceURI === "Google português do Brasil");
                const voz = window.speechSynthesis.getVoices().find(voice => voice.lang === "pt-Br");

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
                // criar um modulo de Erro para analizar a Voz

                utterance.onerror = (event) => {
                    console.log(event)

                }
                // Iniciar a fala
                window.speechSynthesis.speak(utterance);
            }

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
                removeAccordionConfigDownload()
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

                logPre.textContent += `Chave Validada!...\n`;

                return fetch(`${apiUrl}?${params.toString()}`, {
                    method: 'GET',
                })
                    .then(response => {
                        logPre.textContent += `Criando Ponto de Transmissão\n`;

                        if (response.ok) {
                            logPre.textContent += `${response.status}\n`;
                            logPre.textContent += 'Áudio gerado com sucesso!\n';
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
                const sppinnerButton = document.querySelector(".download-btn");

                // sppinnerButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
                // sppinnerButton.innerHTML = `Sucesso <i class="bi bi-check-circle"></i>`

                sppinnerButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
                logPre.textContent = ''; // Limpar logs anteriores
                let chaveAtual = 0; // Começar pela primeira chave

                function tentarProximaChave() {
                    sintetizarAudio(tokens[chaveAtual], texto, velocidade, tom, langCode, voz, logPre)
                        .then(blob => {
                            sppinnerButton.innerHTML = `Sucesso <i class="bi bi-check-circle"></i>`
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

        // Modulo de Toolbar
        const moduloToolbar = pageData.paramentros.modulos

        moduloToolbar.forEach((modulo) => {
            const toolbarRender = modulo.toolbar

            if (toolbarRender) {

                // pegar container de renderização
                const containerToolbar = toolbarRender.idRef
                // console.log(containerToolbar)
                const containerPage = document.querySelectorAll(containerToolbar)[slideIndex - 1];


                if (containerPage) {
                    const classRemover = document.querySelector(".div-render-toolbar");
                    
                    if(classRemover){
                        $(".div-render-toolbar").html("");
                    }
                    // criar um marcador de referencia para a página
                    containerPage.classList.add(toolbarRender.refTools);
                    let div = document.createElement("div");
                    div.className = `div-render-toolbar`;
                    const toolbar = toolbarRender.blocoRenderizacao;
                    
                    div.innerHTML = `${toolbar}`
                    document.body.appendChild(div)

                    let selectedRange = null;

                    // Função para gerar um ID único para cada destaque
                    function gerarIdUnico() {
                        return 'destaque-' + Math.random().toString(36).substr(2, 9);
                    }

                    // Função para salvar o destaque no LocalStorage com metadados essenciais (incluindo cor do texto)
                    function salvarDestaque(palavra, corFundo, corTexto, containerId, paragrafoIndex, startOffset, endOffset, parentTag, dataHora, contexto, estiloTexto) {
                        let destaques = JSON.parse(localStorage.getItem('destaques')) || [];
                        const idUnico = gerarIdUnico(); // Gerar ID único para o destaque

                        destaques.push({
                            id: idUnico,                 // ID único
                            palavra: palavra,            // Palavra destacada
                            corFundo: corFundo,          // Cor de fundo aplicada
                            corTexto: corTexto,          // Cor do texto aplicada
                            containerId: containerId,    // ID do contêiner
                            paragrafoIndex: paragrafoIndex, // Índice do parágrafo dentro do contêiner
                            startOffset: startOffset,    // Posição inicial do texto destacado
                            endOffset: endOffset,        // Posição final do texto destacado
                            parentTag: parentTag,        // Tag do elemento pai
                            dataHora: dataHora,          // Data e hora do destaque
                            estiloTexto: estiloTexto     // Estilo adicional, como negrito ou itálico
                        });

                        localStorage.setItem('destaques', JSON.stringify(destaques));
                        console.log('Destaque salvo:', palavra, corFundo, corTexto, dataHora, contexto, estiloTexto);
                    }

                    // Função para aplicar o destaque ao texto selecionado
                    function aplicarDestaqueSelecionado(corFundo, corTexto = 'black', estiloTexto = '') {
                        if (selectedRange) {
                            const isTextNode = selectedRange.startContainer.nodeType === Node.TEXT_NODE;

                            if (isTextNode) {
                                const palavraSelecionada = selectedRange.toString();
                                const container = selectedRange.startContainer.parentElement.closest(`.${toolbarRender.refTools}`);
                                const containerId = container.id;

                                // Obter o índice do parágrafo (posição do parágrafo dentro do container)
                                const paragrafo = selectedRange.startContainer.parentElement;
                                const paragrafoIndex = Array.from(container.querySelectorAll('p')).indexOf(paragrafo);

                                // Obter a posição inicial e final do texto selecionado
                                const startOffset = selectedRange.startOffset;
                                const endOffset = selectedRange.endOffset;

                                // Obter a tag do elemento pai
                                const parentTag = selectedRange.startContainer.parentNode.tagName;

                                let range = selectedRange;
                                let fragment = range.extractContents();

                                // Criar um novo span com a cor de fundo e texto selecionada, além de estilo adicional
                                let newSpan = document.createElement('span');
                                newSpan.style.backgroundColor = corFundo;
                                newSpan.style.color = corTexto;  // Cor do texto
                                if (estiloTexto) {
                                    newSpan.style.cssText += estiloTexto; // Aplica estilo adicional (negrito, itálico, etc.)
                                }
                                newSpan.appendChild(fragment);

                                // Inserir o novo span na posição correta
                                range.insertNode(newSpan);

                                // Se o pai do novo `span` for outro `span`, deve-se garantir que ele seja aninhado
                                if (newSpan.parentNode.tagName === 'SPAN') {
                                    newSpan.parentNode.normalize();
                                }

                                // Dados adicionais
                                const dataHora = new Date().toISOString();  // Data e hora do destaque

                                // Salvar o destaque com as cores de fundo e texto
                                salvarDestaque(palavraSelecionada, corFundo, corTexto, containerId, paragrafoIndex, startOffset, endOffset, parentTag, dataHora, estiloTexto);
                            } else {
                                alert("A seleção deve ser apenas de texto!");
                            }
                        }
                    }

                 
                    document.addEventListener('mouseup', function (e) {
                        const selection = window.getSelection();
                        const textoSelecionado = selection.toString().trim();
                        const toolbar = document.getElementById('toolbar');

                        if (textoSelecionado) {
                            const range = selection.getRangeAt(0);
                            const startContainer = range.startContainer;
                            const endContainer = range.endContainer;

                            // Verifica se a seleção começa e termina no mesmo parágrafo
                            const startParagrafo = startContainer.parentElement.closest('p');
                            const endParagrafo = endContainer.parentElement.closest('p');

                            if (startParagrafo && startParagrafo === endParagrafo) {
                                // Se apenas um parágrafo foi selecionado, mostrar a toolbar
                                const rangeBox = range.getBoundingClientRect();
                                const toolbarHeight = toolbar.offsetHeight;
                                const toolbarWidth = toolbar.offsetWidth;

                                let topPosition = rangeBox.top - 40; // Ajuste para ficar acima da palavra
                                let leftPosition = rangeBox.left

                                // Garantir que a toolbar fique dentro da tela (horizontalmente)
                                if (leftPosition + toolbarWidth > window.innerWidth) {
                                    leftPosition = window.innerWidth - toolbarWidth;
                                } else if (leftPosition < 0) {
                                    leftPosition = 0;
                                }

                                // Ajuste da posição para cima ou abaixo, dependendo do espaço disponível
                                if (topPosition < 0) {
                                    topPosition = rangeBox.bottom + window.scrollY + 10; // Mostrar abaixo do texto se não houver espaço acima
                                }

                                // Aplicar as posições calculadas
                                toolbar.style.left = `${leftPosition}px`;
                                toolbar.style.top = `${topPosition}px`;
                                toolbar.style.display = 'block';

                                // Salvar as posições calculadas para que a toolbar não mude de posição ao abrir a caixa de cores
                                toolbar.dataset.left = leftPosition;
                                toolbar.dataset.top = topPosition;

                                // Salvar o range selecionado para ser usado posteriormente
                                selectedRange = selection.getRangeAt(0);
                            } else {
                                // Se mais de um parágrafo foi selecionado, esconder a toolbar
                                toolbar.style.display = 'none';
                                selectedRange = null; // Limpar o range salvo
                            }
                        }
                    });


                    function fecharBoxCores(){
                        document.getElementById('boxMarcaCores').style.display = 'none';
                    }

                    // Ocultar toolbar ao clicar fora dela
                    document.addEventListener('mousedown', function (e) {
                        if (!document.getElementById('toolbar').contains(e.target)) {
                            document.getElementById('toolbar').style.display = 'none';
                            document.getElementById('boxMarcaCores').style.display = 'none';
                        }
                    });

                    // Exibir a caixa de cores ao clicar em "Destacar"
                    document.getElementById('destacar').addEventListener('click', function () {
                        const boxMarcaCores = document.getElementById('boxMarcaCores');
                        boxMarcaCores.style.display = 'block';
                     
                    });

                    // Aplicar cor ao texto selecionado ao clicar na paleta de cores
                    document.querySelectorAll('.corTexto').forEach(function (colorSpan) {
                        colorSpan.addEventListener('click', function () {
                            const corFundo = this.getAttribute('data-cor');
                            const corTexto = this.getAttribute('data-color');
                            aplicarDestaqueSelecionado(corFundo, corTexto);
                            fecharBoxCores()
                            
                        });
                    });

                    // Função para restaurar destaques salvos (incluindo cor do texto e cor de fundo)
                    function restaurarDestaques() {
                        const destaques = JSON.parse(localStorage.getItem('destaques')) || [];

                        destaques.forEach(function (destaque) {
                            const container = document.getElementById(destaque.containerId);
                            const paragrafos = container.querySelectorAll('p');

                            // Obter o parágrafo correto pelo índice salvo
                            const paragrafo = paragrafos[destaque.paragrafoIndex];

                            if (paragrafo) {
                                // Encontrar a palavra dentro do parágrafo
                                const regex = new RegExp(`(${destaque.palavra})`, 'gi');

                                // Vamos modificar a função de substituição para restaurar tanto a cor de fundo quanto a cor do texto
                                paragrafo.innerHTML = paragrafo.innerHTML.replace(regex, function (match, offset) {
                                    // Verifica se o texto já contém um span
                                    const spanRegex = /<span.*?>(.*?)<\/span>/i;
                                    const existingSpan = spanRegex.exec(match);

                                    if (existingSpan) {
                                        // Se já existe um span, atualizamos para manter a cor de fundo e texto dentro do existente
                                        return `<span style="background-color: ${existingSpan[1]}; color: ${destaque.corTexto};">${existingSpan[1].replace(destaque.palavra, `<span style="background-color: ${destaque.corFundo}; color: ${destaque.corTexto};">${destaque.palavra}</span>`)}</span>`;
                                    }

                                    // Caso contrário, aplica o destaque com a cor de fundo e cor do texto normalmente
                                    return `<span style="background-color: ${destaque.corFundo}; color: ${destaque.corTexto};">${match}</span>`;
                                });
                            }
                        });
                    }


                    // Restaurar destaques ao carregar a página
                    window.onload = function () {
                        restaurarDestaques();
                    };

                    // Gerar IDs únicos para cada bloco com classe 'editar'
                    document.querySelectorAll(`.${toolbarRender.refTools}`).forEach((element, index) => {
                        element.id = `editar-${index}`;
                    });


                    // Função para deletar destaques do parágrafo selecionado
                    function deletarDestaquesDoParagrafoSelecionado() {
                        const selection = window.getSelection();

                        if (!selection.rangeCount) {
                            console.log('Nenhuma seleção encontrada.');
                            return;
                        }

                        const range = selection.getRangeAt(0);
                        const container = range.startContainer.parentElement.closest(`.${toolbarRender.refTools}`); // Encontra o container (div com classe 'editar')
                        const paragrafos = container.querySelectorAll('p');
                        const paragrafoSelecionado = range.startContainer.parentElement;

                        // Verifica qual o índice do parágrafo selecionado
                        const paragrafoIndex = Array.from(paragrafos).indexOf(paragrafoSelecionado);

                        // Se não encontrar o parágrafo, sair da função
                        if (paragrafoIndex === -1) {
                            console.log('Parágrafo selecionado não encontrado.');
                            return;
                        }

                        // Remover spans do parágrafo selecionado
                        const destaques = JSON.parse(localStorage.getItem('destaques')) || [];
                        const novoDestaques = destaques.filter(destaque => destaque.paragrafoIndex !== paragrafoIndex || destaque.containerId !== container.id);

                        paragrafos[paragrafoIndex].innerHTML = paragrafos[paragrafoIndex].textContent; // Remove apenas os spans do parágrafo selecionado

                        // Atualiza o localStorage com os destaques restantes
                        localStorage.setItem('destaques', JSON.stringify(novoDestaques));

                        console.log(`Destaques do parágrafo ${paragrafoIndex} foram deletados.`);
                    }

                    // Função para conectar o botão de limpar
                    document.getElementById('limpar').addEventListener('click', function () {
                        deletarDestaquesDoParagrafoSelecionado();
                    });


                    // Função para obter apenas a primeira palavra da seleção
                    function obterPrimeiraPalavra() {
                        const selection = window.getSelection();
                        const range = selection.getRangeAt(0);

                        // Obter o texto completo da seleção
                        const textoSelecionado = range.toString().trim();

                        // Quebrar o texto em palavras e pegar a primeira palavra
                        const primeiraPalavra = textoSelecionado.split(' ')[0];

                        return primeiraPalavra;
                    }

                    // Função para simular busca no dicionário
                    async function buscarNoDicionario(palavra) {
                        if (palavra) {
                            const toolbar = document.getElementById('toolbar');
                            // Se mais de um parágrafo foi selecionado, esconder a toolbar
                            toolbar.style.display = 'none';
                            document.getElementById('search-input').value = palavra.toLowerCase();
                            fecharMenuDicionario();
                            abrirDicionario();
                            await buscarPalavra(palavra.toLowerCase());
                        } else {
                            alert("Por favor, selecione uma palavra válida.");
                        }
                    }

                    // Adicionar evento ao botão "Dicionário" da toolbar
                    document.getElementById('dicionario-toolbar').addEventListener('click', function () {
                        const primeiraPalavra = obterPrimeiraPalavra();

                        fecharBoxCores()
                        if (primeiraPalavra) {
                            buscarNoDicionario(primeiraPalavra);
                        } else {
                            alert("Por favor, selecione uma palavra válida.");
                        }
                    });

                    document.getElementById('resumo').addEventListener('click', function () {
                       fecharBoxCores()
                    });

                }

            } else {
                $(".div-render-toolbar").html(``);
                console.log("Toolbar Não Ativo para Essa página")
            }
        })

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



