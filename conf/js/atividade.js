function processarIframeH5P() {
    const h5pContainerWrapper = document.querySelector(".h5p-iframe-wrapper");

    if (h5pContainerWrapper) {
        // Procurar Elemento Iframe
        const iframeSearch = h5pContainerWrapper.querySelector("iframe");
        if (iframeSearch) {
            const iframeMount = iframeSearch.id;
            const iframe = document.getElementById(iframeMount);

            // Verifica se o iframe está disponível
            if (iframe) {
                const fluxoIframe = iframe.contentDocument || iframe.contentWindow.document;

                if (fluxoIframe) {
                    const container = fluxoIframe.querySelector(".h5p-question-content");
                    const listaMulti = container.querySelector("ul");

                    if (container) {
                        function organizarListaResponsiva() {
                            if (!listaMulti) {
                                console.log("Lista não encontrada.");
                                return;
                            }

                            const itens = Array.from(listaMulti.children);
                            const colunas = 3; 

                            // Cria um novo contêiner para organizar as colunas
                            const container = document.createElement("div");
                            container.className = "w-100";
                            container.style.display = "flex";
                            container.style.flexWrap = "wrap";
                            container.style.gap = "5px"; // Espaçamento entre as colunas

                            // Remove os itens da lista original
                            listaMulti.innerHTML = '';

                            // Organiza os itens em colunas
                            let colunaAtual;
                            itens.forEach((item, index) => {
                                // A cada `colunas` itens, cria uma nova coluna
                                if (index % colunas === 0) {
                                    colunaAtual = document.createElement("ul");
                                    colunaAtual.style.flex = "1"; // Faz as colunas ocuparem o mesmo espaço
                                    colunaAtual.style.padding = "0"; // Remove o padding do ul
                                    colunaAtual.style.listStyleType = "none"; // Remove bullets
                                    container.appendChild(colunaAtual);
                                }

                                // Ajusta o item da lista para ocupar 100% da largura da coluna
                                item.style.width = "100%";
                                colunaAtual.appendChild(item);
                            });

                            // Adiciona o novo container com colunas na lista original
                            listaMulti.appendChild(container);
                        }

                        // Chama a função para organizar a lista responsivamente
                        organizarListaResponsiva();
                    } else {
                        console.log("Elemento .h5p-question-content não encontrado dentro do iframe.");
                    }
                } else {
                    console.log("Não foi possível acessar o conteúdo do iframe.");
                }


            } else {
                console.log("Iframe não encontrado.");
            }
        } else {
            console.log("Elemento iframe não encontrado dentro do wrapper.");
        }
    } else {
        console.log("Iframe h5p não renderizado ainda...");
    }
}

// Verifica se o documento já está pronto ou aguarda a renderização completa
processarIframeH5P();
