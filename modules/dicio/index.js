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


async function buscarPalavra(palavra) {
    const loading = document.getElementById('loading-dicionario');
    const resultContainer = document.getElementById('result-dicionario');
    const url = `https://www.dicio.com.br/${palavra}/`;

    if (loading) {
        // Exibe o loader antes de iniciar a busca
        loading.style.display = 'block';
        resultContainer.innerHTML = ""; // Limpa os resultados anteriores
    }

    try {
        const dados = await requisicao(url);

        const parser = new DOMParser();
        const doc = parser.parseFromString(dados, 'text/html');
        const titulo = doc.querySelector(".tit-significado");
        const content = doc.querySelector(".significado");

        if (titulo && content) {
            // Criar o botão de áudio dinamicamente
            const html = `
                <button id="audio-button" class="btn btn-secondary mt-3">🔊 Ouvir Texto</button>
                <div class="titulo">
                    ${titulo.innerHTML}
                </div>
                <div class="conteudo">
                    ${content.innerHTML}
                </div>
            `;

            $("#result-dicionario").html(html);

            // Atualizar o botão de áudio para ler o novo texto
            const audioButton = document.getElementById("audio-button");
            audioButton.onclick = function () {
                const speechText = `${titulo.innerText}, ${content.innerText}`;
                lerTexto(speechText);
            };
        } else {
            const notfound = parser.parseFromString(dados, 'text/html');
            const content = notfound.querySelector("#content");

            const html = `
                <div>
                    ${content.querySelector(".card").innerHTML}
                </div>
            `;
            $("#result-dicionario").html(html);
        }
    } catch (erro) {
        console.error(erro);
        $("#result-dicionario").html("<p>Erro ao buscar a palavra.</p>");
    } finally {
        if (loading) {
            // Esconde o loader após a busca ser concluída (com sucesso ou erro)
            loading.style.display = 'none';
        }
    }
}

// Função para ler o texto em voz alta
function lerTexto(texto) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    synth.speak(utterance);
}

// Conectar o botão de pesquisa ao evento click
document.getElementById('buscarPalavra').addEventListener('click', async function () {
    const palavra = document.getElementById('search-input').value.trim();
    if (palavra) {
        await buscarPalavra(palavra);

        const listaProcurar = document.querySelector("#enchant");
        if (listaProcurar) {
            const a = listaProcurar.querySelectorAll("._sugg")
            a.forEach((ancho, index) => {
                // console.log(ancho)
                ancho.href = "#"
                ancho.onclick = async (event) => {
                    
                    // alert(link.innerHTML)
                    const link = ancho.querySelector(".list-link")
                    document.getElementById('search-input').value = link.innerHTML;
                    await buscarPalavra(link.innerHTML);
                    fecharMenuDicionario()
                    abrirDicionario();

                }
            })
        }

      
    } else {
        alert("Por favor, digite uma palavra!");
    }
});

checkEmptyDicionarioContainer()