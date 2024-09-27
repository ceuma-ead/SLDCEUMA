
document.addEventListener("DOMContentLoaded", function (event) {
    renderVideo(savedPosition);
    // checkEmptyTranscritorVideoContainer(); 
})

async function videosApi() {

    try {
        const data = await $.ajax({
            url: "./modules/videos.json",
            method: "GET",
            cache: false,
        });

        return data;

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: `Erro Json Desativada`,
            heightAuto: false,
            footer: `<a href="#" onclick="">você acha que isso é um erro? @suporte</a>`
        });
        console.error('Erro:', error);
    }

}



// Função para verificar se o contêiner de resumo histórico está vazio
function checkEmptyTranscritorVideoContainer() {
    const resumoTranscritorContainer = document.querySelector('.body-transcritor-video');
    const footerTranscritor = document.querySelector('.footer-transcritor-video');
    // Verifica se o contêiner existe
    if (!resumoTranscritorContainer) return;

    // Verifica se o conteúdo do contêiner está vazio
    if (!resumoTranscritorContainer.children.length || resumoTranscritorContainer.innerHTML.trim() === '') {
        footerTranscritor.style.display = "none";
        // Adiciona a mensagem de "vazio" se não houver conteúdo visível
        let emptyMessage = document.querySelector('.empty-transcritor-message');
        if (!emptyMessage) {
            emptyMessage = document.createElement('div');
            emptyMessage.classList.add('empty-transcritor-message');
            emptyMessage.innerHTML = `
                <div class="d-flex align-items-center justify-content-center h-100">
                    <div class="text-center p-4">
                        <img src="./assets/transcritorGold.png" alt="list-is-empty" class="img-fluid mb-3" style="max-width: 150px;">
                        <h4 class="text-light">Não Há descrição disponiveis...</h4>
                    </div>
                </div>
            `;
            resumoTranscritorContainer.appendChild(emptyMessage);
        }
    } else {
        // Remove a mensagem de "vazio" se houver conteúdo
        const emptyMessage = document.querySelector('.empty-transcritor-message');
        if (emptyMessage) {
            footerTranscritor.style.display = "block";
            emptyMessage.remove();
        }
    }
}


async function moduloTranscritorVideo(conf = {}) {
    $.ajax({
        url: "./modules/videos.json",
        method: "GET",
        cache: false,
        success: (data) => {


            if(data && Array.isArray(data) && Array.isArray(data).length !== 0){
                const dadosFiltrados = data.filter((item,index) => item.configuracao)
                const configuracao = Object.assign({},...dadosFiltrados);
                const configuracaoVideo = configuracao.configuracao;

                if(!!configuracaoVideo && Object.values(configuracaoVideo).length !== 0){
                    //Onde procurar o Transcritor Video
                    const containerRenderConfig = conf.paramentros.configuracoes_gerais._procurar_paragrafos;
                    const moduloTranscritor = containerRenderConfig.onde_procurar;
                    const containerVideoTranscritor = document.querySelector(moduloTranscritor); 
                    // Ativar ou destativar o transcritor Video
                    const transcritor = configuracaoVideo.moduloTranscritor;
                    if(transcritor){
                        containerVideoTranscritor.style.display = "block";
                    }else{
                        containerVideoTranscritor.style.display = "none";
                    }

                }
            }

            return data;
        },
        error: (error) => {
            console.error('Erro:', error);
            Swal.fire({
                icon: "error",
                title: `Erro Json Desativada`,
                heightAuto: false,
                footer: `<a href="#" onclick="">você acha que isso é um erro ? @suporte</a>`
            });
        }
    });
}



async function carroselVideoRender(id = "carrosel-video") {
    // Inicializa o carrossel após adicionar os vídeos
    const slider = new Carousel(document.getElementById(id), {
        on: {
            change: (carousel) => {
                // Pausa todos os vídeos quando um slide muda
                const iframes = document.querySelectorAll('iframe.iframe-video');
                iframes.forEach(iframe => {
                    const src = iframe.src;
                    iframe.src = src;  // Força o iframe a recarregar e parar o vídeo
                });
            }
        },
        Dots: false,  // Remove os pontos de navegação
        Thumbs: {
            type: "classic",  // Sincronização clássica das miniaturas
            lazyLoad: false,
            Navigation: true,
        },
        Navigation: true,
        Carousel: {
            infinite: false,
            transition: 'none',  // Remove a animação de transição de slides
        },
    },{Thumbs});

    return slider;
}

// Função para destruir e limpar o carrossel
function pauseAllVideos(slider) {
    if (slider && typeof slider.destroy === "function") {
        const iframes = document.querySelectorAll('iframe.iframe-video');
        iframes.forEach(iframe => {
            // Guarda na memoria o SRC antigo 
            const iframeSrcOld = iframe.src
            // Limpar o src do Elemento
            iframe.src = '';
            // Reatribuir o src na memoria ao Elemento depois de Pausar
            iframe.src = iframeSrcOld;
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            iframe.removeEventListener('play', stopAllVideos);  // Remove o listener de play
        });

        slider.destroy();  // Destrói o carrossel
    }
}

  // Função para parar todos os vídeos, exceto o atual
  function stopAllVideos() {
    const iframes = document.querySelectorAll('iframe.iframe-video');
    iframes.forEach(iframe => {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
}

async function renderVideo(slideIndex = null) {
    const pageData = api[slideIndex];  // Assume que a variável `api` já esteja definida
    const videosRender = await videosApi();  // Chama a função `videos` para obter os vídeos da API

    // Inicializa o carrossel e armazena a instância
    const sliderVideo = await carroselVideoRender();

    // Verifica se o `pageData` é do tipo "Video"
    if (pageData && pageData.tipo === "Video") {
        const containerRenderConfig = pageData.paramentros.configuracoes_gerais._renderizadar_video;
        const containerRenderVideo = containerRenderConfig.onde_colocar_video;
        const containerVideo = document.querySelector(containerRenderVideo);  // Seleciona o contêiner de vídeo

        // Inicializar as configurações do modulo de Transcrição
        const configuracoesVideo = await moduloTranscritorVideo(pageData);

        // const containerThumbs = document.querySelector(".f-thumbs")
        // console.log(document.querySelectorAll(".f-thumbs"))
        
        // verificar se já existe o container de Thumbs;
        const existingThumbs = document.querySelectorAll('.f-thumbs');
        if (existingThumbs.length > 0) {
            existingThumbs.forEach(thumb => thumb.remove());  // Remove todos os containers .f-thumbs existentes
        }
        
        // Verifica se o contêiner existe
        if (!containerVideo) {
            return;
        }

        // Verifica se o carrossel já foi inicializado
        if (containerVideo.querySelector('.f-carousel__slide')) {
            return;
        }



        // Verifica se o status do renderizador de vídeo está ativo e se o contêiner existe
        if (containerRenderConfig.status && containerVideo) {
            const videosArray = videosRender;
            let slidesHTML = '';  // Variável para acumular os slides

            // Itera sobre os vídeos retornados da API
            videosArray.forEach(video => {
                const { _ativo, dataThumbSrc, srcVideo, attrFrame } = video;

                // Verifica se o vídeo está ativo
                if (_ativo) {
                    // Parseando o attrFrame para separar allow e class
                    const allowMatch = attrFrame.match(/allow\s*=\s*\[\s*(.*?)\s*\]/);
                    const classMatch = attrFrame.match(/class\s*=\s*\[\s*(.*?)\s*\]/);

                    const allowAttr = allowMatch ? allowMatch[1].replace(/\s+/g, '').split(';').join('; ') : '';
                    const classAttr = classMatch ? classMatch[1].replace(/\s+/g, '').split(',') : '';

                    // Acumula o HTML dos slides
                    slidesHTML += `
                        <div class="f-carousel__slide" data-thumb-src="${dataThumbSrc}">
                            <iframe class="${classAttr.join(' ')}" src="${srcVideo}" allow="${allowAttr}" allowfullscreen></iframe>
                        </div>
                    `;
                }
            });

            // Adiciona todos os slides ao contêiner
            containerVideo.innerHTML = slidesHTML;

            // Adiciona um evento de click para pausar outros vídeos ao iniciar um novo
            const iframes = containerVideo.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                iframe.addEventListener('play', function () {
                    stopAllVideos();  // Pausa todos os vídeos
                    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');  // Certifica-se que o vídeo atual continua tocando
                });
            });

        } else {
            console.error("Container de vídeo não está ativado ou a classe de renderização não bate.");
        }
    } else {
        // Se o slideIndex não for vídeo, destrua o carrossel e pare os vídeos
        // console.log( sliderVideo)
        pauseAllVideos(sliderVideo)
        console.warn("O slideIndex fornecido não corresponde a uma página de vídeo.");
    }


}

