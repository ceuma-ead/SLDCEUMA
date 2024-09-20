// Função para limitar o texto e adicionar "..."
function reduzirTexto(texto, tamanhoMaximo) {
    if (texto.length > tamanhoMaximo) {
        return texto.substring(0, tamanhoMaximo) + '...';
    } else {
        return texto;
    }
}

// Função para verificar se o texto é um parágrafo válido
function validarParagrafo(tema) {
    return tema.trim().length > 0; // Verifica se o tema não está vazio ou só tem espaços
}


function addDataResumo() {
    document.getElementById('text-typing-ai').innerHTML = "Eva :"
    const data = document.querySelector('.data-generacao');

    if (data) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;
        data.innerHTML = `${formattedToday}`;
    }


}

addDataResumo()


// Função para obter o resumo usando a API de forma dinâmica
async function resumoAI(tema, analisarContexto = "", _temperado = "completo", _tipo = "um estudante leigo", tamanhoTexto = 10, paragrafos = "1 linha", apiUrl = null, apiKey = null) {
    const configuracoes = {
        temperado: _temperado, // completo || detalhado com referência
        tipo: _tipo,
        paragrafos: paragrafos,
        apiKey: apiKey || "AIzaSyBu-iiNt4oFyjwHFnsTXMJatjn7m70gp6I", // Usa uma chave padrão se nenhuma chave for passada
    };

    // const question = `
    //     Analise o Sequinte tema "${analisarContexto}" veja se a palavra ou paragrafo que é esse aqui
    //     input:${tema}
    //     está no contexto.
    //     **Deverao ser Aceitos apenas Resumo no Contexto**
    //     *Analise a seguinte questão : ${configuracoes.temperado}*
    //         - com base nessa analise quero que vc criar o seguinte resumo quando criar se tiver referencia ou detlhes vc coloca os links pra 
    //           acesso.

    //     Faça um resumo sobre **${tema}** ${configuracoes.temperado} para ${configuracoes.tipo}.
    //     !importante - Os resumos devem ter no mínimo ${configuracoes.paragrafos}, não pode passar disso.
    //     se passar, encerre logo.

    //     *Observações obrigatórias*:
    //     1 - Não sair do contexto.
    //     2 - Não é permitido falar de outra coisa, apenas o conteúdo solicitado.

    //     !Importante: todo resumo deve ser colocado aqui: """ resumo que você fez """. 

    // `;

    const question = `
    Analise o tema "${analisarContexto}" e verifique se a palavra ou parágrafo fornecido abaixo está no contexto:

    **Entrada:** ${tema}
    - Siga a ordem das instruções: primeiro as instruções primárias, depois as secundárias.

    **Instruções - Primárias:**
    - Gere um título: <span class="titleResumo">"O título será gerado aqui"</span> 

    **Instruções - Secundárias:**

    - Se a seleção tiver menos de 3 palavras, exiba uma mensagem indicando que o usuário precisa selecionar mais de 3 palavras: 
      <p class="removerMenu">Você deve selecionar um texto apropriado para eu analisar e resumir. Tente selecionar o parágrafo inteiro.</p>
    - Se apenas uma palavra for selecionada, mesmo que no contexto, exiba uma mensagem solicitando a seleção de mais palavras: 
      <p class="removerMenu">A seleção não pode ser de apenas uma palavra. Se quiser saber o significado da palavra <span style="text-transform:uppercase; font-weight: 600">${tema}</span> utilize a ferramenta Dicionário.</p>

    - Apenas resumos **relevantes ao contexto** devem ser aceitos.
    - Com base na análise, crie um resumo com estilo **${configuracoes.temperado}**.
    - Caso haja referências ou detalhes importantes, insira os links conforme o formato abaixo:

    Exemplo de links:
    - <a target="_blank" href="https://exemplo1.com">https://exemplo1.com</a>
    - <a target="_blank" href="https://exemplo2.com">https://exemplo2.com</a>

    Crie um resumo sobre **"${tema}"** no estilo **${configuracoes.temperado}** para **${configuracoes.tipo}**.

    **Importante:**
    - O resumo deve ter no mínimo **${configuracoes.paragrafos}** parágrafos. Se o texto exceder esse limite, finalize o resumo imediatamente.

    **Observações obrigatórias:**
    1. Mantenha o foco no contexto.
    2. Não inclua conteúdo irrelevante ao tema.
    3. não cria tags de paragrafo.

    **Formato do Resumo:**
    O resumo deve seguir o formato:
    - **Gere um título do tema ${tema}**: <span class="titleResumo d-none">"O título será gerado aqui"</span> 
    """
    [resumo gerado]
    """
`;

    const dynamicApiUrl = apiUrl || `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${configuracoes.apiKey}`;

    const data = {
        contents: [
            {
                parts: [
                    { text: question }
                ]
            }
        ]
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };


    try {
        // Mostrando o loader enquanto o resumo está sendo gerado
        document.querySelector('.render-resumo-result').innerHTML = "";
        // document.getElementById('loading-resumo').style.display = 'block';

        document.getElementById('loading-resumo').style.display = 'block';
        document.getElementById('text-typing-ai').innerHTML = "Eva Está Digitando..."

        // Fazendo a requisição POST usando fetch e aguardando a resposta
        const response = await fetch(dynamicApiUrl, requestOptions);
        // const response = [{}]

        // Verificando se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const temaReduzido = reduzirTexto(tema, tamanhoTexto);

        // Extraindo e processando a resposta em JSON
        const responseData = await response.json();

        // Extraindo o texto do resumo gerado pela API
        const resumo = responseData.candidates[0].content.parts[0].text;

        // Regex para extrair o conteúdo entre aspas triplas
        const regex = /"""\s*([\s\S]*?)\s*"""/;

        // Certifique-se de que o conteúdo extraído está correto e sem parágrafos desnecessários
        const resumoTextual = resumo.match(regex) ? resumo.match(regex)[1].trim() : resumo.trim(); // Remove espaços e quebras de linha

        // Escondendo o loader

        const btnsFerramentas = `
            <div class="d-flex flex-column gap-1 align-items-center justify-content-center">
                <button class="btn btn-warning btn-dowload-resposta"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-arrow-down-to-line">
                        <path d="M12 17V3" />
                        <path d="m6 11 6 6 6-6" />
                        <path d="M19 21H5" /></svg>
                </button>
                <p class="text-mute">Baixar</p>
            </div>

            <div class="d-flex flex-column gap-1 align-items-center justify-content-center">
                <div class="btn-group">
                    <button id="btn-reprocessar-resposta" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-settings-2">
                            <path d="M20 7h-9" />
                            <path d="M14 17H5" />
                            <circle cx="17" cy="17" r="3" />
                            <circle cx="7" cy="7" r="3" />
                        </svg>
                    </button>
                    <ul class="dropdown-menu reflow-items dropdown-menu-dark">
                        <li><a class="dropdown-item reflow-item-ai"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-bot-message-square">
                                    <path d="M12 6V2H8" />
                                    <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                                    <path d="M2 12h2" />
                                    <path d="M9 11v2" />
                                    <path d="M15 11v2" />
                                    <path d="M20 12h2" /></svg> Modo Simplificado</a></li>
                        <hr class="dropdown-divider">
                        <li><a class="dropdown-item reflow-item-ai"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-bot-message-square">
                                    <path d="M12 6V2H8" />
                                    <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                                    <path d="M2 12h2" />
                                    <path d="M9 11v2" />
                                    <path d="M15 11v2" />
                                    <path d="M20 12h2" /></svg> Com Detalhamento</a></li>
                        <hr class="dropdown-divider">
                        <li><a class="dropdown-item reflow-item-ai"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-bot-message-square">
                                    <path d="M12 6V2H8" />
                                    <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                                    <path d="M2 12h2" />
                                    <path d="M9 11v2" />
                                    <path d="M15 11v2" />
                                    <path d="M20 12h2" /></svg> Com Referências</a></li>
                    </ul>
                </div>
                <p class="text-mute">Reprocessar</p>
            </div>

            <div class="d-flex flex-column gap-1 align-items-center justify-content-center">
                <button id="btn-salvar-historico" class="btn btn-info"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-save">
                        <path
                            d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                        <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
                        <path d="M7 3v4a1 1 0 0 0 1 1h7" /></svg></button>
                <p class="text-mute">Salvar</p>
            </div>

            <div class="d-flex flex-column gap-1 align-items-center justify-content-center">
                <button aria-label="play" id="btn-processar-audio" class="btn btn-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-speech"><path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/><path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"/><path d="M17 15a3.5 3.5 0 0 0-.025-4.975"/></svg>
                </button>
                <p class="text-mute label-audio-voice-recog">Áudio</p>
            </div>
        `;

        // Exibindo o resumo no lugar correto dentro da estrutura HTML
        document.querySelector('.render-resumo-result').innerHTML = `
            <div class="result-resumo-items">
            <!--
                <div class="mt-3 avatar-container d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex gap-2 align-items-center">
                        <div class="position-relative">
                            <div class="pulse position-relative ai-response-loading " style="display:none;">
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                            <img class="rounded-circle" style="width: 40px;" alt="Avatar" src="./assets/eva.jpg" />
                        </div>
                        <span><strong class="text-success border border-2 border-success p-1 rounded">Eva respondeu
                                :</strong></span>
                    </div>
                    <span><strong class="data-generacao">00/00/000</strong></span>
                </div>
            -->
                <p class="processamento-resposta-ai animate__animated ">
                    ${resumoTextual}
                </p>

                <span
                    class=" mt-2 title img-back-resumo d-flex flex-column border border-2 bg-dark text-light p-2 rounded justify-content-center align-items-center">
                    <span id="containerResumo-result-reprocessamento" style="display:none;">
                        <button  id="btn-reprocessar-resumo" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw">
                                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                <path d="M16 16h5v5" /></svg></button>
                    </span>

                    <span class="items-action-btn-ai w-100 gap-2 justify-content-center align-items-center" style="display:flex;">
                        ${btnsFerramentas}
                    </span>
                </span>
            </div>
        `;


        document.getElementById('loading-resumo').style.display = 'none';
        document.getElementById('text-typing-ai').innerHTML = "Eva respondeu :"

        const noneToolbar = document.querySelector(".removerMenu");
        const titleResumo = document.querySelector(".titleResumo");


        if (noneToolbar) {
            const toolbarActions = document.querySelector(".items-action-btn-ai");
            const containerResumoResult = document.getElementById("containerResumo-result-reprocessamento");
            toolbarActions.style.display = "none";
            containerResumoResult.style.display = "block";

            const btnReprocessamento = document.getElementById("btn-reprocessar-resumo");
            btnReprocessamento.addEventListener("click", () => {

                fecharResumo();
                abrirResumo();
            })


        } else {
            const toolbarActions = document.querySelector(".items-action-btn-ai");
            const containerResumoResult = document.getElementById("containerResumo-result-reprocessamento");
            toolbarActions.style.display = "flex";
            containerResumoResult.style.display = "none"
        }

        // Configurando os botões de ação (download e salvar no histórico)
        document.querySelector('.btn-dowload-resposta').addEventListener('click', () => downloadResumo(resumoTextual, titleResumo ? titleResumo.innerHTML : tema));
        document.getElementById('btn-salvar-historico').addEventListener('click', () => salvarHistoricoResumo(titleResumo ? titleResumo.innerHTML : tema, tema, resumoTextual));
        // document.getElementById('btn-processar-audio').addEventListener('click', () => gerarAudioResumo(resumoTextual, "Ligia"));


        // Controle de Play/Pause com base no aria-label
        document.getElementById("btn-processar-audio").addEventListener("click", () => {
            const button = document.getElementById("btn-processar-audio");
            const ariaLabel = button.getAttribute("aria-label");

            // Verifica o valor do aria-label para decidir se o áudio deve ser tocado ou pausado
            if (ariaLabel === "play") {
                if (audio) {
                    updateIcon('pause'); // Atualizar o ícone para "pause" imediatamente
                    audio.play();
                } else {
                    gerarAudioResumo(resumoTextual, "Ligia", "pt-br", 0, 1);
                }
            } else if (ariaLabel === "pause") {
                updateIcon('play'); // Atualizar o ícone para "play"
                audio.pause();
            }
        });


        // paramentros para dar o reflow na AI
        reflowAI(".reflow-items", tema, analisarContexto)

        return resumo;


    } catch (error) {
        // Escondendo o loader em caso de erro
        document.getElementById('loading-resumo').style.display = 'none';
        console.error('Erro:', error);
        document.querySelector('.render-resumo-result').innerHTML = `Erro ao gerar o resumo: ${error.message}`;
    }
}

let audio = null; // Variável global para armazenar a instância do áudio
let pauseTimeout = null; // Timer para o tempo de pausa
let countdownInterval = null; // Intervalo para o contador regressivo
const tempoAudio = 5000; // 3 segundos em milissegundos
let tempoRestante = tempoAudio / 1000; // Tempo restante em segundos
let reiniciarAudio = false; // Controla se o áudio deve ser reiniciado

// Função para trocar os ícones entre "play" e "pause"
function updateIcon(state) {
    const button = document.getElementById("btn-processar-audio");
    button.innerHTML = ``;
    if (state === 'play') {
        button.setAttribute("aria-label", "play");

        button.innerHTML = `
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-speech">
                <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/>
                <path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"/>
                <path d="M17 15a3.5 3.5 0 0 0-.025-4.975"/>
             </svg>`;
    } else {
        button.setAttribute("aria-label", "pause");
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause">
                <rect x="14" y="4" width="4" height="16" rx="1" />
                <rect x="6" y="4" width="4" height="16" rx="1" />
            </svg>`;
    }
}

function gerarAudioResumo(resumo, voz = "Ligia", langCode = "pt-br", velocidade = 0, tom = 1) {

    const labelTempo = document.querySelector(".label-audio-voice-recog"); // Elemento que será atualizado com o tempo
    console.log(labelTempo)
    // Função para gerar e tocar o áudio
    function AudioResumo(resumo, voz = "Ligia", langCode = "pt-br", velocidade = 0, tom = 1) {
        const tokens = [];
        const languages = {};

        // Requisição AJAX para carregar as configurações
        $.ajax({
            url: "./modules/config.json",
            method: "GET",
            cache: false,
            success: (data) => {
                if (data.voiceSSR && data.voiceSSR.tokens) {
                    tokens.length = 0;
                    data.voiceSSR.tokens.forEach(token => tokens.push(token));
                }

                if (data.voiceSSR && data.voiceSSR.config) {
                    Object.keys(data.voiceSSR.config).forEach(lang => {
                        languages[lang] = data.voiceSSR.config[lang];
                    });
                }

                function sintetizarAudio(apiKey, texto, velocidade, tom, langCode, voz) {
                    const apiUrl = `https://api.voicerss.org/`;
                    const params = new URLSearchParams({
                        key: apiKey,
                        src: texto,
                        hl: langCode,
                        v: voz,
                        r: velocidade,
                        c: 'MP3',
                        f: '44khz_16bit_stereo'
                    });

                    return fetch(`${apiUrl}?${params.toString()}`, {
                        method: 'GET',
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.blob();
                            } else {
                                throw new Error('Erro ao gerar áudio');
                            }
                        });
                }



                const buttonProcessAudio = document.getElementById("btn-processar-audio");
                buttonProcessAudio.innerHTML = `
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`;

                sintetizarAudio(tokens[0], resumo, velocidade, tom, langCode, voz)
                    .then(blob => {
                        const audioURL = URL.createObjectURL(blob);
                        if (audio) {
                            audio.pause();
                        }

                        audio = new Audio(audioURL);
                        updateIcon('pause'); // Atualizar o ícone para "pause"
                        limparTempoLabel(); // Limpar o tempo exibido ao reiniciar o áudio
                        audio.play();

                        audio.addEventListener("timeupdate", updateTempoLabel); // Atualiza o label com o tempo decorrido

                        audio.onended = () => {
                            updateIcon('play'); // Voltar para o ícone "play" quando o áudio terminar
                        };

                        audio.onpause = () => {
                            updateIcon('play'); // Atualizar o ícone para "play" ao pausar
                            iniciarContagemRegressiva(); // Iniciar a contagem regressiva ao pausar
                        };

                        audio.onplay = () => {
                            updateIcon('pause'); // Atualizar o ícone para "pause" ao tocar
                            cancelarContagemRegressiva(); // Cancelar a contagem regressiva se o áudio for retomado
                            if (reiniciarAudio) {
                                audio.currentTime = 0; // Reinicia o áudio se pausado por mais de 3 segundos
                                limparTempoLabel(); // Limpar a exibição de tempo ao reiniciar o áudio
                                reiniciarAudio = false; // Reseta a flag de reinício
                            }
                        };
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });
            },
            error: (error) => {
                console.error('Erro ao carregar as configurações:', error);
            }
        });
    }


    AudioResumo(resumo, voz, langCode, velocidade, tom);



    // Função para iniciar a contagem regressiva quando o áudio for pausado
    function iniciarContagemRegressiva() {
        limparTempoLabel(); // Limpar o label quando começar a contagem regressiva
        tempoRestante = tempoAudio / 1000; // Definir o tempo restante em segundos

        countdownInterval = setInterval(() => {
            tempoRestante -= 1;
            updateLabelTempoRestante(tempoRestante);

            if (tempoRestante <= 0) {
                limparTempoLabel()
                clearInterval(countdownInterval); // Parar o intervalo quando chegar a 0
                reiniciarAudio = true; // Indicar que o áudio deve ser reiniciado quando o usuário apertar "play"
            }
        }, 1000); // Contagem regressiva de 1 em 1 segundo
    }

    // Função para cancelar a contagem regressiva se o áudio for retomado
    function cancelarContagemRegressiva() {
        if (countdownInterval) {
            clearInterval(countdownInterval); // Cancelar a contagem regressiva
            countdownInterval = null;
        }
    }

    // Função para limpar o tempo no label
    function limparTempoLabel() {
        if (labelTempo) {
            labelTempo.innerHTML = 'Áudio'; // Limpar o tempo quando o áudio reiniciar
        }
    }

    // Função para mostrar o tempo restante no label
    function updateLabelTempoRestante(tempoRestante) {
        if (labelTempo) {
            labelTempo.innerHTML = `
                ${tempoRestante}s         
            `;
        }
    }

    // Função para atualizar o tempo decorrido no label
    function updateTempoLabel() {
        if (audio && labelTempo) {
            // const currentTime = formatTime(audio.currentTime);
            // labelTempo.innerHTML = `
            //     ${currentTime}s         
            // `;
        }
    }

    // Função auxiliar para formatar o tempo em mm:ss
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
}






// Função para realizar o download do resumo
function downloadResumo(resumo, nomeArquivo = 'resumo.txt') {
    const blob = new Blob([resumo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
}

function reflowAI(_class, tema, analisarContexto = "") {
    // Limpar Container
    const clearContainer = document.querySelector('.render-resumo-result')

    const reflow = document.querySelector(_class);

    const reflowItems = reflow.querySelectorAll("li > a");
    reflowItems.forEach(btn => {
        btn.addEventListener("click", function (event) {
            // console.log(event.target.innerText)
            // console.log(tema, analisarContexto)

            const prompt = event.target.innerText.trim();
            // console.log(prompt)

            if (prompt === "Com Referências") {
                clearContainer.innerHTML = ``;
                resumoAI(tema, analisarContexto, "Faça com links e Referenicas pra me clicar gera no minimo 10 links em forma de lista enumerada", "Universitario", 10, "1 linhas").then(resumo => {
                    soundBipe()
                    // console.log('Resumo retornado:', resumo);
                });
            } else if (prompt === "Com Detalhamento") {
                clearContainer.innerHTML = ``;
                resumoAI(tema, analisarContexto, "Faça um Resumo detalhado", "Universitario avançado", 10, "3 paragrafos").then(resumo => {
                    soundBipe()
                    // console.log('Resumo retornado:', resumo);
                });
            } else if (prompt === "Modo Simplificado") {
                clearContainer.innerHTML = ``;
                resumoAI(tema, analisarContexto, "Faça um Resumo bem siplificadinho pra uma pessoa leiga", "Estudante Leigo", 10, "1 linha").then(resumo => {
                    soundBipe()
                    // console.log('Resumo retornado:', resumo);
                });
            }

        })
    });

};




