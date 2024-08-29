

  async function requisicao(url) {
    const resposta = await fetch(url, {
        method: 'GET',
    });

    const contentType = resposta.headers.get('content-type');
    let dados;

    if (contentType && contentType.includes('application/json')) {
        dados = await resposta.json();
    } else {
        dados = await resposta.text();
    }

    return dados;
}

async function buscarPalavra(palavra) {
    const dados = await requisicao(
        `https://michaelis.uol.com.br/moderno-portugues/busca/portugues-brasileiro/${palavra}/`
    );

    if (typeof dados === 'string') {
        const parser = new DOMParser();
        const doc = parser.parseFromString(dados, 'text/html');
        const verbete = doc.querySelector('#content');

        if (verbete) {
            return verbete.innerHTML;
        } else {
            return 'Definição não encontrada.';
        }
    } else {
        return 'Erro ao processar a requisição.';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const palavra = document.getElementById('search-input').value;
        const resultado = await buscarPalavra(palavra);
        document.getElementById('result').innerHTML = resultado;
    });
});
