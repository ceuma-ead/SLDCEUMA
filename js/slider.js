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

function showLoading() {
    loadingSpinner.style.display = 'flex';
    // Garantir que o loading desapareça após 3 segundos (ou ajuste conforme necessário)
    setTimeout(hideLoading, 700);
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

// Mostrar o loading antes de iniciar a mudança de slide
gliderElement.addEventListener('glider-slide-hidden', function () {
    showLoading();
});

//Executar ao scrollar para um novo slide
glider.scrollItem(savedPosition);

gliderElement.addEventListener('glider-slide-visible', function (event) {
    // hideLoading(); // Esconder o loading assim que o slide estiver visível

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
    itemnsMenu('', event.detail.slide);
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

// // Função para renderizar o menu dinamicamente
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

// Função para limitar o texto e adicionar "..."
function reduzirTexto(texto, tamanhoMaximo) {
    if (texto.length > tamanhoMaximo) {
        return texto.substring(0, tamanhoMaximo) + '...';
    } else {
        return texto;
    }
}

// Função para renderizar o menu dinamicamente
function itemnsMenu(filtro = '', slideIndex) {
    const renderMenuDiv = document.querySelector('.render-menu');
    renderMenuDiv.innerHTML = ''; // Limpa o menu atual

    // Define o tamanho máximo do texto a ser exibido
    const tamanhoMaximoTexto = 25;

    // Verifica se algum item corresponde ao filtro
    let encontrouItem = false;
    let paginaEncontrada = null; // Armazena a página do item encontrado


    // Itera sobre a API e cria os elementos do menu
    api.forEach(item => {
        // Verifica se o item corresponde ao filtro de pesquisa
        if (
            filtro === '' ||
            item.nome_page.toLowerCase().includes(filtro.toLowerCase()) ||
            `#${item.pagina}` === filtro ||
            item.pagina.toString() === filtro
        ) {

            // console.log(item)
            encontrouItem = true; // Marca que pelo menos um item foi encontrado
            paginaEncontrada = item.pagina; // Armazena a página encontrada

            const textoReduzido = reduzirTexto(item.nome_page, tamanhoMaximoTexto);

            const menuItem = document.createElement('a');
            menuItem.innerHTML = `
                <span title="${item.nome_page}">${textoReduzido}</span>
                <span class="horizontal-menu-activer ${slideIndex + 1 === item.pagina ? "active-menu" : ""}"></span>
            `;


            // Evento de clique para ir para a página no slider
            menuItem.onclick = () => {
                showLoading(); // emite evento ao carregar conteudo
                glider.scrollItem(item.pagina - 1); // Subtrai 1 para ajustar o índice
            }

            // Adiciona o item ao container do menu
            renderMenuDiv.appendChild(menuItem);
        }
    });

    // Se nenhum item for encontrado, exibe uma mensagem de erro
    if (!encontrouItem) {
        const menuItemErro = document.createElement('div');
        menuItemErro.className = `erro-notfound-menu`;
        menuItemErro.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
            <p style="color:#000;">Erro: Nenhum item encontrado para "${filtro}"</p>
        `;
        renderMenuDiv.appendChild(menuItemErro);
    }

    return paginaEncontrada; // Retorna a página encontrada ou null se nada foi encontrado
}

// Função para lidar com o evento de pesquisa
function handleSearch() {
    const searchInput = document.querySelector('.searcListMateria input');
    searchInput.addEventListener('input', () => {
        const filtro = searchInput.value.trim();
        itemnsMenu(filtro, savedPosition);
    });

    // Quando clicado, ele vai para a página do item que ele encontrou...
    const butaoIr = document.querySelector('.searcListMateria span');
    butaoIr.onclick = () => {
        const filtro = searchInput.value.trim();
        const irItem = itemnsMenu(filtro, savedPosition);
        // console.log(irItem); // Exibe no console o ID da página encontrada
        if (irItem !== null) {
            // Exemplo: Se quiser fazer algo com a página encontrada
            glider.scrollItem(irItem); // Vai para a página encontrada
        }
    };
}

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
                                requestAnimationFrame(() => {
                                    // Adiciona novamente as classes de animação
                                    script_animation.split(" ").forEach(cls => {
                                        if (cls.trim()) {
                                            p.classList.add(cls.trim());
                                        }
                                    });
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

        const configuracoesGerais = pageData.paramentros.configuracoes_gerais;

        if (!configuracoesGerais) {
            console.error('pageData.paramentros.configuracoes_gerais não está definido.');
            return;
        }

        const procurarAnimacao = configuracoesGerais._procurar_animacao;

        if (!procurarAnimacao) {
            console.error('pageData.paramentros.configuracoes_gerais._procurar_animacao não está definido.');
            return;
        }

        if (procurarAnimacao.status && procurarAnimacao.onde_procurar_animacao !== "") {
            const procurarElementosNosContainers = document.querySelectorAll(procurarAnimacao.onde_procurar_animacao);

            procurarElementosNosContainers.forEach((container) => {
                // Remove as classes de animação existentes
                container.className = container.className.replace(/\banimate__\S+/g, '').trim();

                // Adiciona um pequeno atraso para garantir que a animação seja reaplicada
                setTimeout(() => {
                    // Utiliza requestAnimationFrame para garantir que a animação seja reaplicada
                    requestAnimationFrame(() => {
                        script_animation.split(" ").forEach(cls => {
                            if (cls.trim()) {
                                container.classList.add(cls.trim());
                            }
                        });
                    });
                }, 50); // Ajuste o tempo do atraso conforme necessário
            });

        } else {
            handleErroAnimacao(procurarAnimacao);
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
function adcionarMarcadores(slideIndex) {
    const pageData = api[slideIndex];

    if (pageData && pageData.paramentros && pageData.paramentros.marcador) {
        const slider_container = document.querySelector(pageData.id_component);

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
                    // styleTag.id = 'style-geral-marcador';
                    document.head.appendChild(styleTag);
                }
                // Adiciona o estilo ao conteúdo do style
                styleTag.textContent += estilo_marcador_inject.trim();
            }

            const paragrafo = slider_container.querySelectorAll(tipo)[posicao];

            if (paragrafo) {
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

                    styles += `${fundo ? `background-color:${fundo}`:""};${corTexto ? `color:${corTexto}`:""};${padding ? `padding:${padding}`:""}`;
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
                console.warn(`Elemento ${tipo} na posição ${posicao} não encontrado.`);
            }
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

    // Verifica se os scripts simples existem na estrutura de parâmetros
    if (pageData && pageData.paramentros && pageData.paramentros.script_simples) {
        const scripts = pageData.paramentros.script_simples;

        scripts.forEach(scriptItem => {
            // Cria um elemento de script
            const scriptElement = document.createElement('script');

            // Verifica a posição do script (head, body, etc.)
            let parentElement;
            switch (scriptItem.posicao) {
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

            // Adiciona atributos como defer ou async, se especificados
            if (scriptItem.attr) {
                scriptElement.setAttribute(scriptItem.attr, '');
            }

            // Define o conteúdo do script
            scriptElement.innerHTML = scriptItem.conteudo_script;

            // Verifica onde inserir o script dentro do elemento pai
            const insertPosition = scriptItem.insert || 'beforeend';

            // Insere o script no elemento apropriado na posição especificada
            parentElement.insertAdjacentElement(insertPosition, scriptElement);
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
// Rederizar Menu
const irItem = itemnsMenu('', savedPosition);
// console.log(irItem)
// Pesquisar Item Menu
handleSearch();