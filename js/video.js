
document.addEventListener("DOMContentLoaded", function (event) {
    renderVideo(savedPosition)
})

async function videos() {

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

async function renderVideo(slideIndex = null) {
    const pageData = api[slideIndex];  // Assume que a variável `api` já esteja definida
    const videosRender = await videos();  // Chama a função `videos` para obter os vídeos da API

    // Verifica se o `pageData` é do tipo "Video"
    if (pageData && pageData.tipo === "Video") {

        const containerRenderConfig = pageData.paramentros.configuracoes_gerais._renderizadar_video;
        const containerRenderVideo = containerRenderConfig.onde_colocar_video;
        const containerVideo = document.querySelector(containerRenderVideo);  // Seleciona o contêiner de vídeo

        // Verifica se o contêiner existe
        if (!containerVideo) {
            // console.error("Contêiner de vídeo não encontrado.");
            return;
        }

        // Verifica se o carrossel já foi inicializado
        if (containerVideo.querySelector('.f-carousel__slide')) {
            // console.log("O carrossel já foi inicializado. Evitando duplicações.");
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
                            <iframe class="iframe-video ${classAttr.join(' ')}" src="${srcVideo}" allow="${allowAttr}"></iframe>
                        </div>
                    `;
                }
            });

            // Adiciona todos os slides ao contêiner
            containerVideo.innerHTML = slidesHTML;

            // Inicializa o carrossel após adicionar os vídeos
            new Carousel(document.getElementById("carrosel-video"), {
                Dots: false,  // Remove os pontos de navegação
                Thumbs: {
                    type: "classic",  // Sincronização clássica das miniaturas
               
                    lazyLoad: false,
                    Navigation:true,
                },
                Navigation:true,
                
                Carousel: {
                    infinite: false,
                    transition: 'none',  // Remove a animação de transição de slides
                },
            }, { Thumbs });

            


        } else {
            console.error("Container de vídeo não está ativado ou a classe de renderização não bate.");
        }
    } else {
        console.warn("O slideIndex fornecido não corresponde a uma página de vídeo.");
    }
}
