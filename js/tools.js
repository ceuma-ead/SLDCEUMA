function renderTools(sliderIndex) {
    const pageData = api[sliderIndex];

    // Seleciona todos os contêineres onde as ferramentas podem ser inseridas
    const allContainers = document.querySelector('.icons-action--container');

    // Limpa os contêineres antes de inserir novas ferramentas
    allContainers.forEach(container => container.innerHTML = '');

    if (pageData && pageData.paramentros && pageData.paramentros.ferramentas) {
        const ferramentas = pageData.paramentros.ferramentas;

        for (const [key, ferramenta] of Object.entries(ferramentas)) {
            // Verifica se a ferramenta está ativa
            if (ferramenta.ativa) {
                const containerClass = ferramenta.container || 'icons-action--container';
                const container = document.querySelector(`.${containerClass}`);

                if (container) {
                    // Insere o HTML da ferramenta no contêiner correspondente
                    container.insertAdjacentHTML('beforeend', ferramenta.html);
                } else {
                    console.error(`Contêiner com a classe ${containerClass} não encontrado.`);
                }
            }
        }
    } else {
        console.log('Nenhuma ferramenta ativa nesta página.');
    }

    // Atualiza o controle do glider se necessário
    if (typeof glider !== 'undefined') {
        glider.refresh(true);
        glider.updateControls();
    } else {
        console.error('O objeto glider não está definido.');
    }
}

// Renderiza as ferramentas da página atual
renderTools(savedPosition);
