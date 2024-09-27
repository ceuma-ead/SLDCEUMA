const _prefixAssets = "./assets/"


const imutaveis = [



    // PAGINA 7
    {
        "pagina": 7,
        "nome_page": `Relações étnicas-raciais e história a cultura afro-brasileira e africana`,
        "tipo": "imagem",
        "id_page": ".content-render-api",
        "id_component": ".c-carousel__slides",
        "id_elemento_para_modificar": "container-imagem",
        "data": {
            "container_render": `
                <div class="container-img-lightbox-fluid">
                    <div class="item-ligthbox">
                        <div class="item-ligthbox-img img-photo-actions">

                            <img src='./assets/unidade_01/Figura_01.png' alt="figura - 01" />

                        </div>
                        <p class="description">Descrição da imagem 1</p>
                    </div>
                    <div class="item-ligthbox">
                        <div class="item-ligthbox-img img-photo-actions">

                            <img src='./assets/unidade_01/Figura_02.png' alt="figura - 02" class="example-1" />

                        </div>
                        <p class="description">Descrição da imagem 2</p>
                    </div>
                </div>
                `
        },
        "paramentros": {
            "lupa": "Yes",
            "cores": {
                // "sidebar": "black",
                // "fundo": "black",
                // "icones": "rgb(0, 110, 201)"
            },
            "fonte": {
                // "titulo":"1rem",
                // "paragrafos":"1rem",
                // "font_familly":"Lato",
                // "cor_fonte":"black",
                // "alinhamento_texto":"center"
            },
            "configuracoes_gerais": {
                // Habilitar Procurar de Paragrafos ná Pagina 2
                "_procurar_paragrafos": {
                    "status": true,
                    "onde_procurar": ".item-ligthbox" // onde precisa procurar os Elementos
                }
            },
            // "marcador": [{
            //     "tipo": "p",
            //     "posicao": 0,
            //     "palavras": "imagem",
            //     // "attr": `  
            //     //     font-weight=[500], font-style=[lighter], text-decoration=[overline #ffff] ,          text-underline-offset=[8px]
            //     // `,
            //     "attr": `  
            //       border-bottom=[dashed black]
            //     `,
            //     "attr_inline": `id=[#1] , class=[px-1 , bg-success]`,
            //     // "fundo": "blue",
            //     "corTexto": "black",
            //     "padding": "0.3rem",
            //     // "onclick":[
            //     //     {
            //     //         "palavra":"imagem",
            //     //         "acao":"onclick",
            //     //         "funcao_script":`
            //     //             function sejas() {
            //     //                 alert('Estudantes')
            //     //             }
            //     //         `,
            //     //         "funcao":"sejas()",
            //     //     }
            //     // ]

            // }],
            "logo": {
                "ativar": true, // True || False
                "img": "url(../assets/logopreta.png)",
                "posicaoY": "bottom 1.8%",
                "posicaoX": "left 0.5%",
                "tamanho": "10%",
            }
        }
    },

    // PAGINA 8
    {
        "pagina": 8,
        "nome_page": `Video Aula`,
        "tipo": "Video",
        "id_page": ".content-render-api",
        "id_component": ".c-carousel__slides",
        "id_elemento_para_modificar": "container-imagem",
        "data": {
            "container_render": `
                <div class="pagina-tipo-video animation">

                  <div class="pagina-tipo-video--box-video">
                        <div class="f-carousel render-video-container" id="carrosel-video">
                            <!-- Renderizador de Video -->
                            <!-- 
                            <div class="f-carousel__slide" data-thumb-src="https://i.vimeocdn.com/video/112836958_192x144.jpg">
                                <iframe class="iframe-video" src="https://player.vimeo.com/video/112836958" ></iframe>
                            </div>
                            -->
                            
                        </div>
                  </div>

                  <div class="transcritor--box-video">
                    <div>
                        <!-- cabeçalho -->
                        <p class="header-transcritor-video">Transcrição</p>
                    </div>

                    <div class="body-transcritor-video">
                        <!-- body -->
                       
                    </div>

                    <div class="footer-transcritor-video">
                        <!-- footer -->
                        <button>Gerar Transcrição</button>
                    </div>
                  </div>
                
                </div>
            `,
        },
        "forcarAtualizacao": {
            "variaveis": [
                {
                    "Nome": "--animacao-sidebar",
                    "Entrada": "none",
                    "Saida": "slideDown 2s forwards"
                }
            ]
        },
        "paramentros": {
            // Injetar estilos na Pagina
            "inserir_estilo_pagina": [{
                "url": "./conf/css/pagina5.css"
            }],
            "inserir_escript_pagina": [{
                "onde": "body",
                "posicao": "",
                "src": ""
            }],
            "ferramentas": [
                {
                    "container": "icons-action--container",
                    "Podcast": {
                        "ativa": true,
                        "html": `
                            <button class="tooltip-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Podcast">
                                <i data-lucide="audio-lines"></i>
                            </button>
                        `
                    },
                    "Videoaula": {
                        "ativa": true,
                        "html": `
                            <button class="tooltip-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Videoaula">
                                <i data-lucide="video"></i>
                            </button>
                        `
                    },
                    "Ferramentas": {
                        "ativa": true,
                        "html": `
                            <button class="btn-ferramentas tooltip-btn" aria-label="close" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ferramentas">
                                <i data-lucide="pencil-ruler"></i>
                            </button>
                        `
                    },
                    "FullScreen": {
                        "ativa": true,
                        "html": `
                            <button class="btn-fullscreen tooltip-btn" aria-label="min" data-bs-toggle="tooltip" data-bs-placement="bottom" title="FullScreen">
                                <i data-lucide="maximize-2"></i>
                            </button>
                        `
                    },

                },
                {
                    "container": "icons-action--container-mobile",
                    "Podcast": {
                        "ativa": true,
                        "html": `
                            <button vizioon-tip="Podcast" vizioon-attr="d-none d-md-block" vizioon-posicao="gbottom">
                                <i data-lucide="audio-lines"></i>
                            </button>
                        `
                    },
                    "Videoaula": {
                        "ativa": true,
                        "html": `
                            <button vizioon-tip="Videoaula" vizioon-attr="d-none d-md-block" vizioon-posicao="gbottom">
                                <i data-lucide="video"></i>
                            </button>
                        `
                    },
                    "Ferramentas": {
                        "ativa": true,
                        "html": `
                            <button class="btn-ferramentas" aria-label="close" vizioon-attr="d-none d-md-block" vizioon-tip="Ferramentas" vizioon-posicao="gbottom">
                                <i data-lucide="pencil-ruler"></i>
                            </button>
                        `
                    },

                },
                {
                    "container": "box-tools-inline",
                    "Resulmo": {
                        "ativa": true,
                        "html": `
                            <button class="abrir-resumo"><i data-lucide="file-text"></i>Resumo</button>
                            
                        `
                    },
                    "Destacar": {
                        "ativa": true,
                        "html": `
                             <button class="acionador abrir-destacar"><i data-lucide="pencil"></i>Destacar</button>
                        `,
                        "acionador": `

                            <div class="box-marca-cores-inline-btn" id="boxMarcaCores-inline-btn">
                                <div class="cores-destaque-inline-btn">
                                        <span class="corTexto" style="background-color: red;" data-cor="red" data-color="white"></span>
                                        <span class="corTexto" style="background-color: green;" data-cor="green"  data-color="white"></span>
                                        <span class="corTexto" style="background-color: blue;" data-cor="blue"  data-color="white"></span>
                                        <button class="toolbar-button" id="limpar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eraser"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
                                            Limpar
                                        </button>
                                 </div>
                            </div>

                        `
                    },
                    "Notas": {
                        "ativa": true,
                        "html": `
                             <button class="abrir-annotation"><i data-lucide="sticky-note"></i>Notas</button>
                        `
                    },
                    "Ouvinte": {
                        "ativa": true,
                        "html": `
                             <button class="btn-ouvinte" data-bs-toggle="modal" data-bs-target="#modal-ouvinte"><i data-lucide="ear"></i>Ouvinte</button>
                        `
                    },
                    "Download": {
                        "ativa": true,
                        "html": `
                            <button pdf-data="../pdf/unidade-01.pdf"  class="baixar-pdf" ><i data-lucide="download"></i>Download</button>
                        `
                    },
                    "Dicionario": {
                        "ativa": true,
                        "html": `
                             <button class="abrir-dicionario"><i data-lucide="search"></i>Dicionario</button>
                        `
                    },
                    "close": {
                        "ativa": true,
                        "html": `
                              <button><i data-lucide="x" id="close_box"></i></button>
                        `
                    },
                }

            ],
            "marcador": [{
                "tipo": "p",
                "posicao": 0,
                "palavras": "Olá, estudante! Bem-vindo à Unidade 1!",
                "attr_unitario": {
                    "Olá, estudante! Bem-vindo à Unidade 1!": {
                        "attr": "font-weight=[999], Font-size=[18px]",

                    },

                },
                // "fundo": "blue",
                // "corTexto": "black",
                // "padding": "0.3rem",


            }],
            "cores": {
                "sidebar": "#000000",
                "fundo": "#011C41",
                "icones": "white"
            },
            "configuracoes_gerais": {

                // Habilitar Procurar de Paragrafos ná Pagina 8 e Transcritor
                "_procurar_paragrafos": {
                    "status": true,
                    "onde_procurar": ".transcritor--box-video",
                },
                "_procurar_animacao": {
                    "status": true,
                    "onde_procurar_animacao": ".animation",
                },
                "_renderizadar_video": {
                    "status": true,
                    "onde_colocar_video": ".render-video-container",
                },
               
            },
            "fonte": {
                // "titulo":"1rem",
                "paragrafos": "1rem",
                // "font_familly":"Lato",
                // "cor_fonte":"black",
                "alinhamento_texto": "justify",
                "hifens": "auto"
            },
            "logo": {
                "ativar": true,
                "img": "url(../assets/logobranca.png)",
                "posicaoY": "bottom 1.8%",
                "posicaoX": "left 0.5%",
                "tamanho": "10%",
            },
            // Animação para Texto API
            // "animacao_texto": [{
            //     "indice": "all", // 0 | all
            //     "script_animation": `
            //         animate__animated animate__fadeInDown animate__slow
            //     `
            // }],
            // Animação pra toda Página
            "animacao_elemento": [{
                "elemento": ".animation", // 0 | all
                "script_animation": `
                    animate__animated animate__fadeInDown animate__slow
                `
            }],
            "modulos": [
                {
                    "audio": {
                        "ativo": true,
                        "idRef": ".transcritor--box"
                    }
                }
            ]
        }
    },

    


];