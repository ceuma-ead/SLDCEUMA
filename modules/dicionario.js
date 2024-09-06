async function requisicao(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject('Erro ao buscar dados.');
            }
        };

        xhr.onerror = function () {
            reject('Erro de rede.');
        };

        xhr.send();
    });
}

async function buscarPalavra(palavra) {
    const loading = document.getElementById('loading-dicionario'); // Certifique-se que o ID está correto
    const resultContainer = document.getElementById('result');

    if (loading) {
        // Exibe o loader
        loading.style.display = 'block';
        resultContainer.innerHTML = ''; // Limpa os resultados anteriores
    }

    try {
        const dados = await requisicao(
            `https://michaelis.uol.com.br/moderno-portugues/busca/portugues-brasileiro/${palavra}/`
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(dados, 'text/html');
        const verbete = doc.querySelector('#content');

        if (verbete) {
            renderizarResultado(verbete.innerHTML, palavra);
        } else {
            renderizarResultado('Definição não encontrada.', palavra);
        }
    } catch (erro) {
        renderizarResultado(erro, palavra);
    } finally {
        if (loading) {
            // Esconde o loader
            loading.style.display = 'none';
        }
    }
}

function renderizarResultado(definicao, palavra) {
    const resultContainer = document.getElementById('result');

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('render-dicionario-result');

    const palavraSpan = document.createElement('span');
    palavraSpan.textContent = palavra;

    const definicaoP = document.createElement('p');
    definicaoP.innerHTML = definicao;

    itemDiv.appendChild(palavraSpan);
    itemDiv.appendChild(definicaoP);

    resultContainer.appendChild(itemDiv);
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


document.addEventListener('DOMContentLoaded', function () {
    const buscarButton = document.querySelector('.buscarPalavra');
    const searchInput = document.getElementById('search-input'); // Verificação direta do input

    buscarButton.addEventListener('click', async () => {
        if (searchInput) { // Verifica se o campo de entrada foi encontrado
            const palavra = searchInput.value.trim();
            // verificar se o campo é vazio 
            if(searchInput.value !== ""){
                if (palavra) {
                    await buscarPalavra(palavra);
    
                    const sugestoes_lista = document.querySelector("#sugestoes-lista");
    
                    if (sugestoes_lista) {
                        const items = sugestoes_lista.querySelectorAll("a")
                        items.forEach((a, index) => {
                            a.href = "#"
                            a.onclick = async (event) => {
    
                                // cal<ei>1</ei>
                                // alert(a.innerHTML)
                                searchInput.value = a.innerHTML;
                                await buscarPalavra(a.innerHTML);
                                fecharMenuDicionario()
                                abrirDicionario();
    
                            }
                        })
                    } else {
                        console.log("Sugestões não Encontradas...")
                    }
    
                }else{
                    checkEmptyDicionarioContainer()
                }
            }
            else{
                console.log("Dicionario Não encontrou Verbete...")
            }
        } else {
            console.error('Campo de busca não encontrado!');
        }
    });
});

checkEmptyDicionarioContainer()

