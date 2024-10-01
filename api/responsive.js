const responsivo = [
    {   
        // Onde o Estilo tem que aparecer 
        "Tipo": "All", // Pode ser "All" para todas as páginas ou um número específico para uma página
        // Que tipo de quebra Tem que Fazer
        "media" : "(max-width: 1248px)", // Apenas a condição dentro dos parênteses
        // Estilos que podem vir adicionais
        "synchronous" : `
             .pagina-tipo-texto--box-texto p{
             margin-bottom: 0.3rem !important;
                    font-size: 0.8rem !important;
                    // background-color: aqua;
             }

            .header-title p {
                margin-bottom: 0.3rem !important;

            }

            svg {
                padding: 2px !important;
            
            }

            #dots {
                bottom: 8%;
                align-items: normal;
                position: relative !important;
        left: 0% !important;
                        }

            .animated-text {
                font-size: 4vw;
            }

            #second-text {
                font-size: 2.5vw;
            }

            #animated-button {
                margin-top: 15px;
                font-size: 1.8vw;
            }

            .sidebar-menu {
                width: 300px;
                height: 21rem;
                padding: 0.8rem;
            }

            .sidebar-menu header {
                padding: 0.2rem;
            }



            .mola-encardernamento {
                width: 9%;
                height: 92%;
                margin-left: -1.85rem;
                background-size: 100%;
            }

            .render-menu a {
                height: 35px;
                font-size: 13px !important;
            }


            .searcListMateria {
                margin: 0.3rem 0;
            }

            .sidebar-menu-Annotation {
                width: 300px;
                height: 20rem;
            }

            .sidebar-menu-Annotation header {
                    padding: 0.2rem;
            }
                
            hr {
                margin: 0.2rem 0;
            }

            .searcListKeyWord {
                margin: 0.1rem 0;
            }

            .searcListKeyWord span {
                padding: 0 0.5rem;
            }


            .container-searcListKeyWord button {
                margin: 0.2rem;
            }

            .render-menu-Annotation {
                padding-right: 0;
            }

            .sidebar-menu header p:nth-of-type(1){
                font-size:1.2rem;
            }

            .sidebar-menu header p:nth-of-type(2){
                font-size:1rem;
            }

            #image-capaOverlay {
                max-width: 12.5% !important;
            }  
                
            .olcards li .content .text {
             font-size: 0.8rem !important;
             text-align: justify;
            }

            .olcards, .olcards * {
                margin: -1px 0 !important;
                }


            .olcards li .content {
                padding: 0.6rem !important;
            }

            .message-text {
                font-size: 18px;
            }

            .dicionario-menu {
                width: 300px;
                height: 21rem;
                padding: 0.8rem;
                gap: 0.5rem;
            }
            .dicionario-menu header {                
                 padding: 0.2rem;
                }

            .dicionario-menu header p:nth-of-type(1) {
            font-size: calc(var(--tamanho-do-texto-do-paragrafo-header) - 0.2rem);
            }
                .mt-3 {
                margin-top: 0.25rem !important;
            }       

            .btn {
                    padding: .175rem .45rem !important;
                    font-size: 0.8rem !important;
                    margin-top: 0.25rem !important;

                }

            .titulo {
                font-size: 1.2rem;
            }

            .searchDicionario {
                    margin: 0;
                }

                .form-select {
                padding: .275rem 2.25rem .275rem .30rem !important;
                font-size: 0.85rem !important;

                }

                label {
                    font-size: 0.8rem;
                }


                .accordion-body {
                gap: 0 1rem !important;
                display: flex !important;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
            }

                /*
                    .modal-content{
                    width: 81% !important;                
                    }

                */

                #button-Dowload-Ouvinte{
                max-width: 82%;
                height: 2rem !important;
                }

                .resumo-menu {
                width: 375px;
                height: 21rem;
                padding: 0.8rem;
                gap: 0.5rem;
                }

                .text-success { 
                font-size: 0.8rem;
                            }


                            strong.data-generacao {
                            font-size: 0.8rem;
                }

                .resumo-menu header p:nth-of-type(1) {
                font-size: 1rem !important;
                }
                .result-resumo-items p {
                    font-size: calc(var(--font-para-paragrafos) - 4px) !important;
                    }

                .dropdown-item {
                font-size: .8rem;

                    }

                    .modal-content-imagem {
                    max-width: 500px;
                    }
    `,



        // Atualização Forçada onde ele está aparecendo
        "variantes":`
            --tamanho-de-font-para-paragrafo-sidebar=[1rem];
            --tamanho-dos-icones-siderbar=[2rem];
            --tamanho-x-y-imagem=[7%];
            --width=[40px];
           --height=[40px];
        //    --tamanho-do-texto-do-paragrafo-header=[1.2rem];
            // --font-para-paragrafos=[1rem]
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
    },
    {   
    //Onde o Estilo tem que aparecer 
        "Tipo": "All", // Pode ser "All" para todas as páginas ou um número específico para uma página
    //Que tipo de quebra Tem que Fazer
        "media" : "(max-width: 480px)", // Apenas a condição dentro dos parênteses
    //Estilos que podem vir adicionais
        "synchronous" : `
                .message-box {
                display: block !important;
                }

                .olcards--divisor {
                display: contents !important;
                }

                .olcards {
                align-items: flex-start !important;
                }

                .olcards li .content {
                text-align: justify !important;
                }

                #accordionApresentacao {
                display: block !important;
                }

                .accordion-flush .accordion-item {
                margin-top: 0.5rem !important;
                }

                .marca-da-agua {
                display:none !important;

                }

                .glider-prev {
                    left: 0px !important;
                }

                .glider-next {
                    right: 0px !important;
                }

                .pagina-tipo-texto--box-texto p {
                    font-size: 1rem !important;
                }

                .carrosel--container {            
                
                background-size: 370% !important;
                background-position-x: 36% !important;
            }


            .container-img-lightbox-fluid {
                flex-direction: column !important;
                height: auto !important;
                padding: 4rem !important;
                
            }

            .transcritor--box-audio {
            display: none;
            
            }

            
           .container-audio-render-result {
            flex-direction: column;
            }        
    
            #carrosel-audio {
            height: auto;
            }

            .plyr{
            min-width: 280px;
            }

            
            .container-toools-info-audio {
            width: 85% !important;
            }

            .pagina-tipo-video--box-video{
            height: 30%;
            width: 100%;
            flex-wrap: wrap;
            }

            .f-thumbs__track {
            flex-direction: row
            }

            .f-carousel__thumbs {
            width: 100%
            }

    `,

        // Atualização Forçada onde ele está aparecendo
        "variantes":`
            --tamanho-de-font-para-paragrafo-sidebar=[1rem];
            --tamanho-dos-icones-siderbar=[2rem];
            --tamanho-x-y-imagem=[7%];
            --width=[40px];
           --height=[40px];
        //    --tamanho-do-texto-do-paragrafo-header=[1.2rem];
            // --font-para-paragrafos=[1rem];
            
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
    },
    {   
        //Onde o Estilo tem que aparecer 
            "Tipo": "All", // Pode ser "All" para todas as páginas ou um número específico para uma página
        //Que tipo de quebra Tem que Fazer
            "media" : "(max-width: 980px)", // Apenas a condição dentro dos parênteses
        //Estilos que podem vir adicionais
            "synchronous" : `
                    .message-box {
                    display: block !important;
                    }
    
                    .olcards--divisor {
                    display: contents !important;
                    }
    
                    .olcards {
                    align-items: flex-start !important;
                    }
    
                    .olcards li .content {
                    text-align: justify !important;
                    }
    
                    #accordionApresentacao {
                display: block !important;
                }
    
                .accordion-flush .accordion-item {
                margin-top: 0.5rem !important;
                }
    
                .marca-da-agua {
                display:none !important;
                }
    
                .glider-prev {
                    left: 0px !important;
                }
    
                .glider-next {
                    right: 0px !important;
                }
    
                #accordionApresentacao {
                display: block !important;
                font-size: 1.5rem !important;
                }

                .accordion-flush .accordion-item {
                margin-top: 0.5rem !important;
                }

                .pagina-tipo-texto--box-texto p {
                 font-size: 1.5rem !important;
                 }

                .olcards li .content .text {
                    font-size: 1.5rem !important;
                    text-align: left !important;
                    
                }

                    .message-text {
                        font-size: 1.5rem !important;
                    }


                    .accordion-button {
                    font-size: 1.5rem !important;
                    }

                    .message-box--divisor {
                    justify-content: center;
                }

                .container-img-lightbox-fluid {   
                padding: 8rem;
                    flex-direction: column;
                    width: 80%;
                    height: auto;
            }

                    .modal-content-imagem {
                     max-width: 700px !important;
                }
        `,
    
            // Atualização Forçada onde ele está aparecendo
            "variantes":`
                --tamanho-de-font-para-paragrafo-sidebar=[1rem];
                --tamanho-dos-icones-siderbar=[2rem];
                --tamanho-x-y-imagem=[7%];
                --width=[40px];
               --height=[40px];
            //    --tamanho-do-texto-do-paragrafo-header=[1.2rem];
                // --font-para-paragrafos=[1rem];
                --imgem-fundo-tamanho-x-y-imagem=[260%];
                --imgem-fundo-carrosel-posicao-x-imagem=[left 31.5%];
                
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
