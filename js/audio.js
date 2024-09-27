
document.addEventListener("DOMContentLoaded", function (event) {
    renderAudio(savedPosition);
    checkEmptyTranscritorAudioContainer();
})

async function audioApi() {

    try {
        const data = await $.ajax({
            url: "./modules/audio.json",
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
function checkEmptyTranscritorAudioContainer() {
    const resumoTranscritorContainer = document.querySelector('.body-transcritor-audio');
    const footerTranscritor = document.querySelector('.footer-transcritor-audio');
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



async function moduloTranscritorAudio(conf = {}) {
    $.ajax({
        url: "./modules/audio.json",
        method: "GET",
        cache: false,
        success: (data) => {

            if (data && Array.isArray(data) && Array.isArray(data).length !== 0) {
                const dadosFiltrados = data.filter((item, index) => item.configuracao)
                const configuracao = Object.assign({}, ...dadosFiltrados);
                const configuracaoAudio = configuracao.configuracao;


                if (!!configuracaoAudio && Object.values(configuracaoAudio).length !== 0) {
                    //Onde procurar o Transcritor Audio
                    const containerRenderConfig = conf.paramentros.configuracoes_gerais._procurar_paragrafos;
                    const moduloTranscritor = containerRenderConfig.onde_procurar;
                    const containerAudio = document.querySelector(moduloTranscritor);


                    // Ativar ou destativar o transcritor Audio

                    const transcritor = configuracaoAudio.moduloTranscritor;
                    if (transcritor) {
                        return transcritor
                    } else {
                        containerAudio.style.display = "none";
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






async function renderAudio(slideIndex = null) {
    const pageData = api[slideIndex];  // Assume que a variável `api` já esteja definida
    const audioRender = await audioApi();  // Chama a função `audioRender` para obter os audio da API

    // console.log(audioRender)

    if (pageData && pageData.tipo === "Audio") {
        const containerRenderConfig = pageData.paramentros.configuracoes_gerais._renderizar_audio;
        const containerRenderAudio = containerRenderConfig.onde_colocar_audio;
        const containerAudio = document.querySelector(containerRenderAudio);  // Seleciona o contêiner de audio

        containerAudio.innerHTML = ``
        containerAudio.innerHTML = `
             <div class="column add-bottom">
                <div id="mainwrap">
                    <div id="nowPlay">
                        <span id="npAction">Paused...</span><span id="npTitle"></span>
                    </div>
                    <div id="audiowrap">
                        <div id="audio0">
                            <audio id="podcast" preload controls>Your browser does not support HTML5 Audio! 😢</audio>
                        </div>
                        <div id="tracks">
                            <a id="btnPrev">&larr;</a><a id="btnNext">&rarr;</a>
                        </div>
                    </div>
                    <div id="plwrap">
                        <ul id="plList"></ul>
                    </div>
                </div>
            </div>
        `
        // console.log(containerAudio)
        var supportsAudio = !!document.createElement('audio').canPlayType;
        if (supportsAudio) {
            // Inicializar Plyr
            var player = new Plyr('#podcast', {
                controls: [
                    'restart',
                    'play',
                    'progress',
                    'current-time',
                    'duration',
                    'mute',
                    'volume',
                    // 'download'
                ]
            });

            // Playlist e controles
            var index = 0;
            playing = false;


            //Api de Audio
            const audioApi = audioRender
            .filter((item, index) => item._ativo === true && index > 0) // Filtra só os que estão ativos e remove o primeiro
            .map(item => item);
          
            if(Array.isArray(audioApi).length === 0){
                alert("Sem audios para rendenrizar");
                return;
            }
            // console.log(audioApi)
            tracks = audioApi;

            trackCount = tracks.length,
            npAction = document.getElementById('npAction');
            npTitle = document.getElementById('npTitle');
            audio = document.getElementById('podcast');

            // Inicializar lista de faixas
            var plList = document.getElementById('plList');
            tracks.forEach(function (track, key) {
                var li = document.createElement('li');
                li.innerHTML = '<div class="plItem"> \
                                        <span class="plNum">' + (track.track < 10 ? '0' + track.track : track.track) + '.</span> \
                                        <span class="plTitle">' + track.name + '</span> \
                                        <span class="plLength">' + track.duration + '</span> \
                                    </div>';
                plList.appendChild(li);

                li.addEventListener('click', function () {
                    if (key !== index) {
                        playTrack(key);
                    }
                });
            });

            // Função para carregar uma faixa
            function loadTrack(id) {
                var selected = document.querySelector('.plSel');
                if (selected) selected.classList.remove('plSel');
                plList.children[id].classList.add('plSel');
                npTitle.textContent = tracks[id].name;
                index = id;
                audio.src = tracks[id].audioSrc; // Carregar diretamente do atributo audioSrc
                updateDownload(id, audio.src);
            }

            // Atualizar link de download
            function updateDownload(id, source) {
                player.on('loadedmetadata', function () {
                    var downloadLink = document.querySelector('a[data-plyr="download"]');
                    if (downloadLink) {
                        downloadLink.setAttribute('href', source);
                    }
                });
            }

            // Função para tocar uma faixa
            function playTrack(id) {
                loadTrack(id);
                audio.play();
            }

            // Controles de reprodução (play/pause)
            audio.addEventListener('play', function () {
                playing = true;
                npAction.textContent = 'Now Playing...';
            });

            audio.addEventListener('pause', function () {
                playing = false;
                npAction.textContent = 'Paused...';
            });

            audio.addEventListener('ended', function () {
                npAction.textContent = 'Paused...';
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            });

            // Botão Anterior
            document.getElementById('btnPrev').addEventListener('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            });

            // Botão Próximo
            document.getElementById('btnNext').addEventListener('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            });

            loadTrack(index); // Carregar a primeira faixa ao iniciar
        } else {
            // Sem suporte a áudio
            document.querySelector('.column').classList.add('hidden');
            document.querySelector('.container').innerHTML = '<p class="no-support">Your browser does not support the audio tag.</p>';
        }

    } else {
        console.warn("O slideIndex fornecido não corresponde a uma página de audio.");
    }

}

