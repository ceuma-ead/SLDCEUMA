async function requisicao(url) {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const fullUrl = proxyUrl + encodeURIComponent(url);  // Adicionei encodeURIComponent para evitar erros de URL

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
    if (!renderMenuDiv) return false;

    // Obtém todos os filhos, exceto a mensagem de "vazio"
    const children = Array.from(renderMenuDiv.children);
    const nonEmptyChildren = children.filter(child => !child.classList.contains('render-dicionario-result'));

    // Verifica se o contêiner está vazio, desconsiderando a mensagem de "vazio"
    if (nonEmptyChildren.length === 0) {
        // Se a mensagem de "vazio" não estiver presente, adicione-a
        let emptyMessage = renderMenuDiv.querySelector('.empty-annotation-message');
        renderMenuDiv.innerHTML = ""; // Limpa o conteúdo
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

// Função para carregar vozes disponíveis e salvar no localStorage
function carregarVozes() {
    const voces = synth.getVoices();
    const selectVoz = document.getElementById('select-voz');

    // Populando o select com as vozes
    voces.forEach((voz, index) => {
        
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voz.name} (${voz.lang})`;
        selectVoz.appendChild(option);
    });

    // Verifica se há voz selecionada no localStorage
    const vozSelecionada = localStorage.getItem('vozSelecionada');
    if (vozSelecionada) {
        selectVoz.value = vozSelecionada;
    }
}

// Função para salvar a voz escolhida no localStorage
function salvarVozEscolhida() {
    pararAudioDicionario();
    const selectVoz = document.getElementById('select-voz');
    localStorage.setItem('vozSelecionada', selectVoz.value);
}

// Função para ler o texto em voz alta
function lerTexto(texto) {
    const loadingVoz = document.querySelector(".loading-voz");

    // Mostra o loading enquanto a voz está sendo carregada ou processada
    loadingVoz.style.display = 'block';

    // Se o navegador não suporta SpeechSynthesis, sair da função
    if (!synth) {
        loadingVoz.style.display = "none";
        alert("Seu navegador não suporta a síntese de voz.");
        return;
    }

    // Função para iniciar a síntese de voz
    function iniciarFala() {
        if (synth.speaking && !isPaused) {
            synth.pause();  // Pausa o áudio se já estiver falando
            isPaused = true;
        } else if (synth.paused && isPaused) {
            synth.resume();  // Retoma o áudio se estiver pausado
            isPaused = false;
        } else {
            // Cria um novo utterance se nenhum áudio estiver sendo reproduzido
            utterance = new SpeechSynthesisUtterance(texto);

            // Definir a voz selecionada
            const selectVoz = document.getElementById('select-voz');
            const selectedVoiceIndex = selectVoz.value;
            const voices = synth.getVoices();

            // Esperar até que as vozes estejam carregadas antes de continuar
            if (voices.length === 0) {
                synth.onvoiceschanged = iniciarFala;
                return;
            }

            utterance.voice = voices[selectedVoiceIndex];

            // Garantir que apenas um utterance seja reproduzido por vez
            utterance.onend = function () {
                loadingVoz.style.display = "none";  // Esconde o loading quando terminar de falar
                utterance = null;  // Reseta o utterance
            };

            utterance.onerror = function() {
                loadingVoz.style.display = "none";  // Esconde o loading em caso de erro
                // alert("Ocorreu um erro durante a síntese de voz.");
            };

            // Adiciona um pequeno atraso para permitir que o loading seja renderizado
            setTimeout(() => {
                synth.speak(utterance);  // Inicia a fala
                isPaused = false;
            }, 100);  // 100ms de atraso
        }
    }

    // Verifica se as vozes já estão disponíveis
    if (synth.getVoices().length > 0) {
        iniciarFala();
    } else {
        // Espera que as vozes sejam carregadas
        synth.onvoiceschanged = iniciarFala;
    }
}


// Função para parar o áudio
function pararAudioDicionario() {
    if (synth.speaking) {
        synth.cancel();  // Cancela a síntese de voz em execução
        isPaused = false;
        utterance = null;  // Reseta o utterance
    }
}



async function buscarPalavra(palavra) {
    const loading = document.getElementById('loading-dicionario');
    const resultContainer = document.getElementById('result-dicionario');
    const url = `https://michaelis.uol.com.br/moderno-portugues/busca/portugues-brasileiro/${palavra}/`;

    if (loading) {
        // Exibe o loader
        loading.style.display = 'block';
        resultContainer.innerHTML = ''; // Limpa os resultados anteriores
    }

    try {
        const dados = await requisicao(url);

        if (!dados) {
            throw new Error('Nenhum dado retornado');
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(dados, 'text/html');
        const content = doc.querySelector("#content");

        if (content) {
            const html = `
                <label for="select-voz">Escolha a voz:</label>
                <select id="select-voz" class="form-select"></select>
                <button id="audio-button" class="btn btn-secondary mt-3">🔊 Ouvir</button>
                <button id="stop-button" class="btn btn-secondary mt-3">⏹ Parar</button>
                <span class="loading-voz" style="display: none;"></span>
                <div class="titulo">
                    <strong>${palavra}</strong>
                </div>
                <div class="conteudo">
                    ${content.innerHTML}
                </div>
            `;

            $("#result-dicionario").html(html);


            carregarVozes();  // Carregar as vozes no select
            const loadingVoz = document.querySelector(".loading-voz");
            // Mostra o loading enquanto a voz está sendo carregada ou processada


            // Botão para iniciar, pausar ou retomar
            const audioButton = document.getElementById("audio-button");
            audioButton.onclick = function () {
                const speechText = `${palavra}, ${content.innerText}`;

                if (!utterance) {
                    // Inicia a leitura do texto
                    pararAudioDicionario();
                    lerTexto(speechText);
                    audioButton.innerHTML = '⏸ Pausar';  // Muda ícone para "Pausar"
                } else if (synth.speaking && !synth.paused) {
                    // Pausa o áudio se estiver falando
                    loadingVoz.style.display = 'none';
                    synth.pause();
                    audioButton.innerHTML = '🔊 Ouvir';  // Muda ícone para "Continuar"
                } else if (synth.paused) {
                    // Retoma o áudio se estiver pausado
                    loadingVoz.style.display = 'block';
                    synth.resume();
                    audioButton.innerHTML = '⏸ Pausar';  // Muda ícone para "Pausar"
                }
            };
            // Botão de parar
            const stopButton = document.getElementById("stop-button");
            stopButton.onclick = function () {
                audioButton.innerHTML = '🔊 Ouvir';  // Reseta o ícone para "Player"
                pararAudioDicionario();  // Para completamente o áudio
            };

            // Listener para salvar a voz escolhida
            const selectVoz = document.getElementById('select-voz');
            selectVoz.onchange = salvarVozEscolhida;

        } else {
            // Caso não encontre o conteúdo esperado, exiba uma mensagem apropriada
            $("#result-dicionario").html(`
                <div class="d-flex align-content-center flex-column justify-content-center w-100 h-100  align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                            <p style="color:#000;" class="text-center">Ops refaça sua Pesquisa <a href="#">${palavra}</a> </p>
                    </div>         
            `);
        }

    } catch (erro) {
        console.error(erro);
        $("#result-dicionario").html(`
            <div class="d-flex align-content-center flex-column justify-content-center w-100 h-100  align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                        <p style="color:#000;" class="text-center">Ops refaça sua Pesquisa <a href="#">${palavra}</a> </p>
                </div>         
        `);
    } finally {
        if (loading) {
            // Esconde o loader após a busca ser concluída (com sucesso ou erro)
            loading.style.display = 'none';
        }
    }
}


// Conectar o botão de pesquisa ao evento click
document.getElementById('buscarPalavra').addEventListener('click', async function () {
    const palavra = document.getElementById('search-input').value.trim();
    if (palavra) {
        await buscarPalavra(palavra);

        const sugestoes_lista = document.querySelector("#sugestoes-lista");
        if (sugestoes_lista) {
            const items = sugestoes_lista.querySelectorAll("a")
            items.forEach((a, index) => {
                a.href = "#";
                a.onclick = async (event) => {
                    event.preventDefault();

                    const regex = /<ei>.*<\/ei>/g;
                    const resultado = a.innerHTML.replace(regex, '').toLowerCase();

                    document.getElementById('search-input').value = resultado;
                    await buscarPalavra(resultado);
                    fecharMenuDicionario();
                    abrirDicionario();
                };
            });
        } else {
            console.log("Sugestões não encontradas...");
        }

    } else {
        alert("Por favor, digite uma palavra!");
    }
});

// Exemplo inicial: buscar a palavra 'amor'
// buscarPalavra('amor');

checkEmptyDicionarioContainer();
