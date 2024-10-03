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
                // Fluxo de dados pelo iframe => dados /\ 
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
                            let colunas; // Número de itens por coluna será ajustado dinamicamente
                
                            // Verifica o número total de itens e ajusta o número de colunas
                            if (itens.length === 4) {
                                colunas = 2; // Se houver 4 itens, 2 itens por coluna
                            } else if (itens.length === 5) {
                                colunas = 3; // Se houver 5 itens, 3 na primeira coluna e 2 na segunda
                            } else {
                                colunas = 3; // Para outros casos, 3 itens por coluna
                            };
                
                            // Cria um novo contêiner para organizar as colunas
                            const container = document.createElement("div");
                            container.className = "w-100";
                            container.style.display = "flex";
                            container.style.flexWrap = "wrap";
                            container.style.gap = "5px"; // Espaçamento entre as colunas
                
                            // Remove os itens da lista original
                            listaMulti.innerHTML = '';
                
                            // Calcula o número de colunas necessárias com base no número total de itens
                            const numeroColunas = Math.ceil(itens.length / colunas);
                            let contadorItens = 0;
                
                            for (let i = 0; i < numeroColunas; i++) {
                                // Ajusta o número de itens por coluna dinamicamente
                                let itensNestaColuna;
                                if (itens.length === 5 && i === 0) {
                                    itensNestaColuna = 3; // Primeira coluna com 3 itens se houver 5
                                } else {
                                    itensNestaColuna = colunas; // Caso padrão: 3 itens por coluna
                                }
                
                                // Cria uma nova coluna (ul)
                                const colunaAtual = document.createElement("ul");
                                colunaAtual.style.flex = "1"; // Cada coluna ocupa a mesma proporção
                                colunaAtual.style.padding = "0";
                                colunaAtual.style.listStyleType = "none";
                
                                // Adiciona os itens à coluna
                                for (let j = 0; j < itensNestaColuna; j++) {
                                    if (contadorItens >= itens.length) break; // Para quando todos os itens forem adicionados
                                    const item = itens[contadorItens];
                                    item.style.width = "100%"; // Cada item ocupa 100% da largura da coluna
                                    colunaAtual.appendChild(item);
                                    contadorItens++;
                                }
                
                                // Adiciona a coluna ao contêiner
                                container.appendChild(colunaAtual);
                            }
                
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
