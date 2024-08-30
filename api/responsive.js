const responsivo = [
    {   
        // Onde o Estilo tem que aparecer 
        "Tipo": 2, // Pode ser "All" para todas as páginas ou um número específico para uma página
        // Que tipo de quebra Tem que Fazer
        "media" : "(max-width: 1366px)", // Apenas a condição dentro dos parênteses
        // Estilos que podem vir adicionais
        "synchronous" : `
             .pagina-tipo-texto--box-texto p{
                    // font-size: 0.9rem;
                    // background-color: aqua;
             }
        `,
        // Atualização Forçada onde ele está aparecendo
        "variantes":`
            // --tamanho-de-font-para-paragrafo-sidebar=[1rem];
            --font-para-paragrafos=[1rem]
        `,
        "atualizacaoBrutaElementos":[
            // Exemplos de atualizações brutas de elementos
            // {
            //     "Elemento":"p",
            //     "Ranger":[...10] // ranger 1 a 10 Ex: [1,2,3,4] ou [...10] ou all
            //      "scriptAtualizacao":`
            //          [document.querySelectorAll(p)] => var[p] {
            //              p.fontSize = 2rem;
            //          }
            //      `
            // }
        ]
    }
];

function aplicarVariantes(variantes, media) {
    // Verificar se a condição da media query é verdadeira
    if (window.matchMedia(media).matches) {
        // Dividir as variantes por ponto e vírgula
        const variaveis = variantes.split(';');
        
        variaveis.forEach(variavel => {
            if (variavel.trim()) {
                // Remover espaços em branco
                variavel = variavel.trim();
                
                // Encontrar o índice do símbolo '=' para separar o nome e o valor
                const index = variavel.indexOf('=');
                
                if (index !== -1) {
                    // Extrair o nome da variável
                    const nomeVariavel = variavel.substring(0, index).trim();
                    
                    // Extrair o valor da variável, removendo os colchetes
                    const valorVariavel = variavel.substring(index + 1).replace('[', '').replace(']', '').trim();
                    
                    // Aplicar a variável CSS dinamicamente
                    document.documentElement.style.setProperty(nomeVariavel, valorVariavel);
                }
            }
        });
    }
}

function responsivePage(slideIndex){
    const pageData = api[slideIndex];

    // Página para Exibir Estilos
    const idPage = pageData.pagina;
    
    // Verificar se é para todas as páginas ou uma página específica
    responsivo.forEach(config => {
        // Se for "All", aplica para todas as páginas
        if (config.Tipo === "All") {
            aplicarVariantes(config.variantes, config.media);
            adicionarEstilos(config.media, config.synchronous);
        } 
        // Senão, aplica apenas para a página especificada
        else if (config.Tipo === idPage) {
            aplicarVariantes(config.variantes, config.media);
            adicionarEstilos(config.media, config.synchronous);
        }
    });
}

function adicionarEstilos(media, estilos) {
    const estilo = document.createElement('style');
    estilo.type = 'text/css';

    // Adiciona os estilos na media query especificada
    estilo.innerHTML = `@media screen and ${media} { ${estilos} }`;

    document.head.appendChild(estilo);
}

// Chama a função responsiva para o slide atual
responsivePage(savedPosition);
