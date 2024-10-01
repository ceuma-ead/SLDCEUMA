
function renderTools(sliderIndex) {
    const pageData = api[sliderIndex];

    // Seleciona todos os contêineres onde as ferramentas podem ser inseridas
    const allContainers = document.querySelectorAll('.icons-action--container');

    // Limpa os contêineres antes de inserir novas ferramentas
    allContainers.forEach(container => container.innerHTML = '');

    // Limpa os contêineres móveis
    const allContainersMobile = document.querySelectorAll('.icons-action--container-mobile');
    allContainersMobile.forEach(container => container.innerHTML = '');


    // Limpa os contêineres Inline
    const allContainersInlines = document.querySelectorAll('.box-tools-inline');
    allContainersInlines.forEach(container => container.innerHTML = '');

    // Verifica se a página possui ferramentas
    if (pageData && pageData.paramentros && pageData.paramentros.ferramentas) {
        const ferramentas = pageData.paramentros.ferramentas;

        ferramentas.forEach(ferramentaGrupo => {
            for (const key in ferramentaGrupo) {
                if (key !== 'container' && ferramentaGrupo[key].ativa) {
                    const containerClass = ferramentaGrupo.container || 'icons-action--container';
                    const container = document.querySelector(`.${containerClass}`);

                    if (container) {
                        // Insere o HTML da ferramenta no contêiner correspondente
                        container.insertAdjacentHTML('beforeend', ferramentaGrupo[key].html);
                    } else {
                        console.error(`Contêiner com a classe ${containerClass} não encontrado.`);
                    }
                }
            }
        });

        
        // Aplica novamente os ícones
        lucide.createIcons();
        if(typeof eventButton === "function"){
            eventButton(ferramentas,pageData.pagina,api)
            
        }
        else{
            // console.log("Funçao Não Renderizada...")
        }

    } else {
        console.log('Nenhuma ferramenta ativa para esta página.');
    }

    // Atualiza o glider se ele estiver definido
    if (typeof glider !== 'undefined') {
        glider.refresh(true);
        glider.updateControls();
    } else {
        console.error('O objeto glider não está definido.');
    }
}


// Exemplo de chamada da função
renderTools(savedPosition);



