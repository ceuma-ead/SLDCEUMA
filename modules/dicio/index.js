async function requisicao(url) {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const fullUrl = proxyUrl + url;

    try {
        const response = await fetch(fullUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados.');
        }
        const data = await response.json();
        return data.contents;
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

// Função para verificar se o contêiner de anotações está vazio
function checkEmptyDicionarioContainer() {
    const renderMenuDiv = document.querySelector('.render-dicionario');

    // Obtém todos os filhos, exceto a mensagem de "vazio"
    const children = Array.from(renderMenuDiv.children);
    const nonEmptyChildren = children.filter(child => !child.classList.contains('render-dicionario-result'));

    // Verifica se o contêiner está vazio, desconsiderando a mensagem de "vazio"
    if (nonEmptyChildren.length === 0) {
        // Se a mensagem de "vazio" não estiver presente, adicione-a
        let emptyMessage = renderMenuDiv.querySelector('.empty-annotation-message');
        renderMenuDiv.innerHTML = "";
        if (!emptyMessage) {
            emptyMessage = document.createElement('div');
            emptyMessage.classList.add('empty-annotation-message');
            emptyMessage.innerHTML = `
                <div class="d-flex align-content-center flex-column justify-content-center w-100 h-100 align-items-center">
                    <img src="./assets/list.gif" alt="list-is-empty-unscreen1.gif" style="width:20%;" >
                    <p style="color:#000;" class="text-center">Digite um "Termo" para começar a Busca.</p>
                </div>
            `;
            renderMenuDiv.appendChild(emptyMessage);
        }
        return false; // Retorna false porque o contêiner está vazio
    } else {
        // Remove a mensagem de "vazio" se ela existir
        const emptyMessage = renderMenuDiv.querySelector('.empty-annotation-message');
        if (emptyMessage) {
            renderMenuDiv.removeChild(emptyMessage);
        }
        return true; // Retorna true porque o contêiner tem anotações
    }
}

// Variável global para controlar o estado da síntese de voz
let synth = window.speechSynthesis;
let isPaused = false;
let utterance = null;  // Inicializamos com null

// Função para ler o texto em voz alta
function lerTexto(texto) {
    // Se o navegador não suporta SpeechSynthesis, sair da função
    if (!synth) {
        alert("Seu navegador não suporta a síntese de voz.");
        return;
    }

    // Se já há um utterance em execução, pause ou retome o áudio
    if (synth.speaking && !isPaused) {
        synth.pause();  // Pausa o áudio
        isPaused = true;
    } else if (synth.paused && isPaused) {
        synth.resume();  // Retoma o áudio se estava pausado
        isPaused = false;
    } else {
        // Cria um novo utterance se nenhum áudio estiver sendo reproduzido
        utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';  // Define o idioma como português do Brasil

        // Garantir que apenas um utterance seja reproduzido por vez
        utterance.onend = function () {
            utterance = null;  // Reseta o utterance quando terminar de falar
        };

        synth.speak(utterance);  // Fala o texto
        isPaused = false;
    }
}

// Função para parar o áudio
function pararAudio() {
    if (synth.speaking) {
        synth.cancel();  // Cancela a síntese de voz em execução
        isPaused = false;
        utterance = null;  // Reseta o utterance
    }
}

async function buscarPalavra(palavra) {
    const loading = document.getElementById('loading-dicionario');
    const resultContainer = document.getElementById('result-dicionario');
    const url = `https://www.dicio.com.br/${palavra}/`;

    if (loading) {
        loading.style.display = 'block';
        resultContainer.innerHTML = "";
    }

    try {
        const dados = await requisicao(url);

        if (!dados) {
            throw new Error("Erro ao obter dados do Dicionário.");
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(dados, 'text/html');

        const titulo = doc.querySelector(".tit-significado");
        const content = doc.querySelector(".significado");

        if (titulo && content) {
            const html = `
                <button id="audio-button" class="btn btn-secondary mt-3">🔊 Ouvir</button>
                <button id="pause-button" class="btn btn-secondary mt-3">⏸ Pausar</button>
                <button id="stop-button" class="btn btn-secondary mt-3">⏹ Parar</button>
                <div class="titulo">
                    ${titulo.innerHTML}
                </div>
                <div class="conteudo">
                    ${content.innerHTML}
                </div>
            `;
            $("#result-dicionario").html(html);


            // Botão de ouvir
            const audioButton = document.getElementById("audio-button");
            audioButton.onclick = function () {
                const speechText = `${titulo.innerText}, ${content.innerText}`;
                // Prevenção de eventos concorrentes
                if (!utterance || !synth.speaking) {
                    lerTexto(speechText);  // Inicia a leitura do texto
                }
            };

            // Botão de pausar ou retomar
            const pauseButton = document.getElementById("pause-button");
            pauseButton.onclick = function () {
                // Se o áudio estiver em execução, ele vai pausar ou retomar
                if (synth.speaking) {
                    lerTexto('');  // Pausa ou retoma a leitura
                }
            };

            // Botão de parar
            const stopButton = document.getElementById("stop-button");
            stopButton.onclick = function () {
                pararAudio();  // Para completamente o áudio
            };

        } else {
            $("#result-dicionario").html("<p>Conteúdo não encontrado para esta palavra.</p>");
        }
    } catch (erro) {
        console.error(erro);
        $("#result-dicionario").html(`
            
            <div class="d-flex erro-notfound-menu align-content-center flex-column justify-content-center w-100 h-100 align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                <p style="color:#000;" class="text-center">Ops, refaça sua pesquisa: <a href="#">${palavra}</a></p>
            </div>
                
        `);
    } finally {
        if (loading) {
            loading.style.display = 'none';
        }
    }
}


// Conectar o botão de pesquisa ao evento click
document.getElementById('buscarPalavra').addEventListener('click', async function () {
    const palavra = document.getElementById('search-input').value.trim();
    if (palavra) {
        await buscarPalavra(palavra);

        const listaProcurar = document.querySelector("#enchant");
        if (listaProcurar) {
            const a = listaProcurar.querySelectorAll("._sugg");
            a.forEach((ancho, index) => {
                // console.log(ancho)
                ancho.href = "#"
                ancho.onclick = async (event) => {

                    // alert(link.innerHTML)
                    const link = ancho.querySelector(".list-link");
                    document.getElementById('search-input').value = link.innerHTML.toLowerCase();
                    await buscarPalavra(link.innerHTML.toLowerCase());
                    fecharMenuDicionario();
                    abrirDicionario();

                }
            })
        }


    } else {
        alert("Por favor, digite uma palavra!");
    }
});

checkEmptyDicionarioContainer();
abrirDicionario();