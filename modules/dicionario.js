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
    const loading = document.getElementById('loader-annotation'); // Certifique-se que o ID está correto
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

document.addEventListener('DOMContentLoaded', function () {
    const buscarButton = document.querySelector('.buscarPalavra');
    const searchInput = document.getElementById('search-input'); // Verificação direta do input

    buscarButton.addEventListener('click', async () => {
        if (searchInput) { // Verifica se o campo de entrada foi encontrado
            const palavra = searchInput.value.trim();
            if (palavra) {
                await buscarPalavra(palavra);

                const sugestoes_lista = document.querySelector("#sugestoes-lista");

                if (sugestoes_lista) {
                    const items = sugestoes_lista.querySelectorAll("a")
                    items.forEach((a, index) => {
                        a.href = "#"
                        a.onclick = async () => {
                            // cal<ei>1</ei>
                            // alert(a.innerHTML)

                            await buscarPalavra(a.innerHTML);
                        }
                    })
                } else {
                    console.log("Sugestões não Encontradas...")
                }

            }
        } else {
            console.error('Campo de busca não encontrado!');
        }
    });
});