"use strict";

var _prefixAssets = "./assets/";
var api = [// PAGINA 1
{
  "pagina": 1,
  "nome_page": "In\xEDcio",
  "tipo": "Texto",
  "id_page": ".content-render-api",
  "id_component": ".c-carousel__slides",
  "id_elemento_para_modificar": "container-imagem",
  "data": {
    "container_render": "       \n\n                <!-- Container do texto animado -->\n                <div id=\"text-container-capa\">\n                    <div class=\"animated-text\">Hematologia Cl\xEDnica</div>\n                    <div id=\"underline\"></div>\n                    <div id=\"second-text\">unidade 1</div>\n                    <button id=\"animated-button\" onclick=\"iniciar()\">iniciar</button>\n                </div>\n\n                <!-- Imagem animada -->\n                <div id=\"animated-image\"></div>\n                \n                <!-- Imagem -->\n                <div id=\"image-capaOverlay\"></div>\n            "
  },
  "forcarAtualizacao": {
    "variaveis": [{
      "Nome": "--animacao-sidebar",
      "Entrada": "none",
      "Saida": "slideDown 2s forwards"
    }]
  },
  "paramentros": {
    "inserir_estilo_pagina": [{
      "url": ""
    }],
    "inserir_escript_pagina": [{
      "onde": "body",
      "posicao": "beforeend",
      "src": "./conf/js/pagina1.js"
    }],
    "ferramentas": [{
      "container": "icons-action--container",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-ferramentas\" aria-label=\"close\" vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      },
      "FullScreen": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-fullscreen\" aria-label=\"min\" vizioon-tip=\"Tela cheia\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"maximize-2\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "icons-action--container-mobile",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-attr=\"d-none d-md-block\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-attr=\"d-none d-md-block\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-ferramentas\" aria-label=\"close\" vizioon-attr=\"d-none d-md-block\" vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "box-tools-inline",
      "Resulmo": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"file-text\"></i>Resumo</button>\n                        "
      },
      "Destacar": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"pencil\"></i>Destacar</button>\n                        "
      },
      "Notas": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-annotation\"><i data-lucide=\"sticky-note\"></i>Notas</button>\n                        "
      },
      "Ouvinte": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"ear\"></i>Ouvinte</button>\n                        "
      },
      "Download": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"download\"></i>Download</button>\n                        "
      },
      "Dicionario": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-dicionario\"><i data-lucide=\"search\"></i>Dicionario</button>\n                        "
      },
      "close": {
        "ativa": true,
        "html": "\n                              <button><i data-lucide=\"x\" id=\"close_box\"></i></button>\n                        "
      }
    }],
    "cores": {
      // "sidebar": "red",
      "fundo": ":#00000000",
      // "icones": "rgb(0, 110, 201)"
      "imagemFundo": {
        "ativar": true,
        "img": "url(../assets/fundo.gif)",
        "posicaoY": "bottom 1.8%",
        "posicaoX": "left 0.5%",
        "tamanho": "100%"
      }
    },
    "configuracoes_gerais": {
      // Habilitar Procurar de Paragrafos ná Pagina 2
      "_procurar_paragrafos": {
        "status": true,
        "onde_procurar": ".pagina-tipo-texto--box-texto"
      }
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
      "img": "url(../assets/logopreta.png)",
      "posicaoY": "bottom 1.8%",
      "posicaoX": "left 0.5%",
      "tamanho": "10%"
    },
    "animacao_elemento": [{
      "elemento": ".animation",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInRigth animate__slow\n                "
    }]
  }
}, // PAGINA 2
{
  "pagina": 2,
  "nome_page": "Apresenta\xE7\xE3o da disciplina",
  "tipo": "Texto",
  "id_page": ".content-render-api",
  "id_component": ".c-carousel__slides",
  "id_elemento_para_modificar": "container-imagem",
  "data": {
    "container_render": "\n                 <div class=\"pagina-tipo-texto\">\n                    <div class=\"pagina-tipo-texto--box-texto\">\n                        <p>Ol\xE1, estudante! </p>\n\n                        <p>\n                           Seja bem-vindo (a) ao estudo de Hematologia Cl\xEDnica, uma disciplina essencial para um melhor desenvolvimento acad\xEAmico com vistas ao sucesso profissional. Sou Milena Mendon\xE7a, professora desta disciplina. \n                        </p>\n\n                        <p>\n                            A disciplina de Hematologia Cl\xEDnica \xE9 essencial para a sua forma\xE7\xE3o enquanto estudante de Biomedicina, considerando a realidade social , econ\xF4mica e cultural , tanto em \xE2mbito nacional quanto mundial.  \n                        </p>\n\n                        <p>\n                          Trata-se de uma disciplina que contribui em in\xFAmeras esferas para a sua forma\xE7\xE3o acad\xEAmica e pode ser aplicada em diversos contextos da vida real, possibilitando a interpreta\xE7\xE3o de exames laboratoriais e identifica\xE7\xE3o de condi\xE7\xF5es como anemias, leucemias e coagulopatias. Este conhecimento \xE9 fundamental para o diagn\xF3stico cl\xEDnico, al\xE9m de proporcionar uma base s\xF3lida para a realiza\xE7\xE3o de pesquisas cient\xEDficas em \xE1reas como a fisiologia das c\xE9lulas-tronco e o desenvolvimento de novas terapias.\n                        </p>\n\n                       <div class=\"pagina-tipo-texto--box-texto-div-container-presets\">\n                            <img src=\"".concat(_prefixAssets, "ok.gif\" />\n                            <p style=\"padding: 10px; background:#4285f4; font-weight: 700; border-radius: 10px;\">\n                            Ao final da disciplina voc\xEA estar\xE1 capacitado para implementar e monitorar processos de controle de qualidade em laborat\xF3rios, garantindo a precis\xE3o e confiabilidade dos resultados. Ademais, ensina sobre a pol\xEDtica de sangue, normas t\xE9cnicas e imunohematologia, preparando o futuro profissional para trabalhar em bancos de sangue e compreender a import\xE2ncia dos testes pr\xE9-transfusionais.\n                            </p>\n                       </div>\n                    </div> \n            \n                 </div>\n            ")
  },
  "forcarAtualizacao": {
    "variaveis": [{
      "Nome": "--animacao-sidebar",
      "Entrada": "none",
      "Saida": "slideDown 2s forwards"
    }]
  },
  "paramentros": {
    "inserir_estilo_pagina": [{
      "url": "./conf/css/pagina2.css"
    }],
    "inserir_escript_pagina": [{
      "onde": "body",
      "posicao": "",
      "src": ""
    }],
    "ferramentas": [{
      "container": "icons-action--container",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-ferramentas\" aria-label=\"close\" vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      },
      "FullScreen": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-fullscreen\" aria-label=\"min\" vizioon-tip=\"Tela cheia\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"maximize-2\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "icons-action--container-mobile",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "box-tools-inline",
      "Resulmo": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"file-text\"></i>Resumo</button>\n                        "
      },
      "Destacar": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"pencil\"></i>Destacar</button>\n                        "
      },
      "Notas": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-annotation\"><i data-lucide=\"sticky-note\"></i>Notas</button>\n                        "
      },
      "Ouvinte": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"ear\"></i>Ouvinte</button>\n                        "
      },
      "Download": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"download\"></i>Download</button>\n                        "
      },
      "Dicionario": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-dicionario\"><i data-lucide=\"search\"></i>Dicionario</button>\n                        "
      },
      "close": {
        "ativa": true,
        "html": "\n                              <button><i data-lucide=\"x\" id=\"close_box\"></i></button>\n                        "
      }
    }],
    "cores": {// "sidebar": "red",
      // "fundo": "red",
      // "icones": "rgb(0, 110, 201)"
    },
    "configuracoes_gerais": {
      // Habilitar Procurar de Paragrafos ná Pagina 2
      "_procurar_paragrafos": {
        "status": true,
        "onde_procurar": ".pagina-tipo-texto--box-texto"
      },
      "_procurar_animacao": {
        "status": true,
        "onde_procurar_animacao": ".animation"
      }
    },
    "marcador": [{
      "tipo": "p",
      "posicao": 2,
      "palavras": "social|econômica|cultural",
      // Atributos Gerais
      "attr": "  \n                  cursor=[pointer] , border-radius=[5px] , /*border=[2px solid #000]*/\n                ",
      // Criar um Estilo Geral
      "attr_inline": "\n                    vizioon-tip=[Saiba Mais] , vizioon-posicao=[top] , vizioon-attr=[d-none d-md-block]\n                ",
      // Criar uma injeção de Dados para estilizar o Marcador
      "estilo_marcador_inject": "",
      // ❌ Depreciada
      // Atributos Especificos
      "attr_unitario": {
        "social": {
          // "attr": "background=[red],color=[white]",
          "attr_inline": "id=[#1], class=[bt-1]"
        },
        "econômica": {
          // "attr": "background=[blue],color=[white]",
          "attr_inline": "id=[#1], class=[bt-2]"
        },
        "cultural": {
          // "attr": "background=[blue],color=[white]",
          "attr_inline": "id=[#1], class=[bt-3]"
        }
      },
      // "fundo": "blue",
      // "corTexto": "black",
      "padding": "0.3rem",
      "onclick": [{
        "palavra": "social",
        "acao": "onclick",
        "funcao_script": "\n                            function s_ocial() {\n                                Swal.fire(\n                                    {   icon:\"info\",\n                                        // title:\"Social\",\n                                        // customClass: {\n                                        //     popup:\"my-poup\"\n                                        // },\n                                        heightAuto: false,\n                                        text:\"A compreens\xE3o profunda das altera\xE7\xF5es hematol\xF3gicas e suas causas permite aos futuros biom\xE9dicos diagnosticar e tratar doen\xE7as de forma mais eficaz, contribuindo para a melhoria da sa\xFAde p\xFAblica.\",\n                                        // footer:\"<a href='#'>Baixar Conceito</a>\"\n                                    }\n                                );\n                            }\n                        ",
        "funcao": "s_ocial()"
      }, {
        "palavra": "econômica",
        "acao": "onclick",
        "funcao_script": "\n                            function e_conomica() {\n                                Swal.fire(\n                                    {   icon:\"info\",\n                                        // title:\"econ\xF4mica\",\n                                        // customClass: {\n                                        //     popup:\"my-poup\"\n                                        // },\n                                        heightAuto: false,\n                                        text:\"Culturalmente, ao entender as particularidades gen\xE9ticas e epidemiol\xF3gicas de diferentes popula\xE7\xF5es, o biom\xE9dico pode oferecer um cuidado mais personalizado e adequado.\",\n                                        // footer:\"<a href='#'>Baixar Conceito</a>\"\n                                    }\n                                );\n                            }\n                        ",
        "funcao": "e_conomica()"
      }, {
        "palavra": "cultural",
        "acao": "onclick",
        "funcao_script": "\n                            function c_ultural() {\n                                Swal.fire(\n                                    {   icon:\"info\",\n                                        // title:\"cultural\",\n                                        // customClass: {\n                                        //     popup:\"my-poup\"\n                                        // },\n                                        heightAuto: false,\n                                        text:\"Em um contexto econ\xF4mico, o diagn\xF3stico preciso e r\xE1pido de doen\xE7as hematol\xF3gicas pode reduzir custos com tratamentos prolongados ou ineficazes.\",\n                                        // footer:\"<a href='#'>Baixar Conceito</a>\"\n                                    }\n                                );\n                            }\n                        ",
        "funcao": "c_ultural()"
      }]
    }],
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
      "img": "url(../assets/logopreta.png)",
      "posicaoY": "bottom 1.8%",
      "posicaoX": "left 0.5%",
      "tamanho": "10%"
    },
    // "script_simples":[
    //     {
    //         "posicao":"head", // Aqui pode ficar no header ou body ou footer ou qualquer outro elemento
    //         // "attr":"defer" // pode ser defer ou async
    //         "insert":"afterbegin", // opcional onde ele vai inserir
    //         "conteudo_script":`
    //             alert('oi')
    //         `
    //     }
    // ],
    // Animação para Texto API
    "animacao_texto": [{
      "indice": "all",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInDown animate__slow\n                "
    }],
    // Animação pra toda Página
    "animacao_elemento": [{
      "elemento": ".animation",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInRigth animate__slow\n                "
    }]
  }
}, // PAGINA 3
{
  "pagina": 3,
  "nome_page": "Apresenta\xE7\xE3o da disciplina",
  "tipo": "Texto",
  "id_page": ".content-render-api",
  "id_component": ".c-carousel__slides",
  "id_elemento_para_modificar": "container-imagem",
  "data": {
    "container_render": "\n                 <div class=\"pagina-tipo-texto animation\">\n                    <div class=\"pagina-tipo-texto--box-texto\">\n                       <p>Com base nos perfis e recursos de compet\xEAncias da disciplina, \xE9 esperado que, ao final da disciplina, voc\xEA: </p>\n                    \n                       <!-- Lista -->\n\n                       <div class=\"olcards--divisor\">\n\n                            <ol class=\"olcards\">\n                                <li style=\"--cardColor:#fc374e\" class=\"box1\">\n                                    <div class=\"content\">\n                                        <div class=\"icon\"></div>\n\n                                        <div class=\"text\">Saiba identificar e interpretar as altera\xE7\xF5es hematol\xF3gicas, entendendo suas causas e efeitos</div>\n                                    </div>\n                                </li>\n                                <li style=\"--cardColor:#36aeb3\"  class=\"box2\">\n                                    <div class=\"content\">\n                                        <div class=\"icon\"></div>\n                    \n                                        <div class=\"text\">Compreenda a fisiologia e a fisiopatogenia das c\xE9lulas-tronco, a eritropoese e a estrutura da hemoglobina</div>\n                                    </div>\n                                </li>\n                                <li style=\"--cardColor:#162d59\"  class=\"box3\">\n                                    <div class=\"content\">\n                                        <div class=\"icon\"></div>\n             \n                                        <div class=\"text\">Seja capaz de executar e interpretar eritrogramas, diagnosticar anemias, leucemias e coagulopatias, emitindo laudos e pareceres precisos</div>\n                                    </div>\n                                </li>\n                                \n                                \n                            </ol>\n                       \n                             <ol class=\"olcards\">\n                             <li style=\"--cardColor:#f15f0e\" class=\"box4\">\n                                    <div class=\"content\">\n                                        <div class=\"icon\"></div>\n\n                                        <div class=\"text\">Saiba avaliar e otimizar o controle de qualidade nas etapas pr\xE9-anal\xEDtica, anal\xEDtica e p\xF3s-anal\xEDtica, com \xEAnfase na automa\xE7\xE3o em hematologia.</div>\n                                    </div>\n                                </li>\n\n                                <li style=\"--cardColor:#fc374e\" class=\"box5\">\n                                    <div class=\"content\">\n                                        <div class=\"icon\"></div>\n     \n                                        <div class=\"text\">Entenda a hist\xF3ria da hemoterapia, as normas t\xE9cnicas, a legisla\xE7\xE3o vigente e as pr\xE1ticas de banco de sangue, al\xE9m de dominar os testes pr\xE9-transfusionais e gerenciar rea\xE7\xF5es transfusionais</div>\n                                    </div>\n                                </li>\n                                \n                            </ol>\n\n                       </div>\n                       \n                    </div> \n\n                   \n                 </div>\n            "
  },
  "forcarAtualizacao": {
    "variaveis": [{
      "Nome": "--animacao-sidebar",
      "Entrada": "none",
      "Saida": "slideDown 2s forwards"
    }]
  },
  "paramentros": {
    // Injetar estilos na Pagina
    "inserir_estilo_pagina": [{
      "url": "./conf/css/pagina3.css"
    }],
    "inserir_escript_pagina": [{
      "onde": "body",
      "posicao": "",
      "src": ""
    }],
    "ferramentas": [{
      "container": "icons-action--container",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-ferramentas\" aria-label=\"close\" vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      },
      "FullScreen": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-fullscreen\" aria-label=\"min\" vizioon-tip=\"Tela cheia\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"maximize-2\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "icons-action--container-mobile",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "box-tools-inline",
      "Resulmo": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"file-text\"></i>Resumo</button>\n                        "
      },
      "Destacar": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"pencil\"></i>Destacar</button>\n                        "
      },
      "Notas": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-annotation\"><i data-lucide=\"sticky-note\"></i>Notas</button>\n                        "
      },
      "Ouvinte": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"ear\"></i>Ouvinte</button>\n                        "
      },
      "Download": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"download\"></i>Download</button>\n                        "
      },
      "Dicionario": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-dicionario\"><i data-lucide=\"search\"></i>Dicionario</button>\n                        "
      },
      "close": {
        "ativa": true,
        "html": "\n                              <button><i data-lucide=\"x\" id=\"close_box\"></i></button>\n                        "
      }
    }],
    "cores": {// "sidebar": "red",
      // "fundo": "red",
      // "icones": "rgb(0, 110, 201)"
    },
    "configuracoes_gerais": {
      // Habilitar Procurar de Paragrafos ná Pagina 2
      "_procurar_paragrafos": {
        "status": true,
        "onde_procurar": ".pagina-tipo-texto--box-texto"
      },
      "_procurar_animacao": {
        "status": true,
        "onde_procurar_animacao": ".animation"
      }
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
      "img": "url(../assets/logopreta.png)",
      "posicaoY": "bottom 1.8%",
      "posicaoX": "left 0.5%",
      "tamanho": "10%"
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
      "elemento": ".animation",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInDown animate__slow\n                "
    }, {
      "elemento": ".box1",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInLeft animate__slow animate__delay-1s\n                "
    }, {
      "elemento": ".box2",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInLeft animate__slow animate__delay-2s\n                "
    }, {
      "elemento": ".box3",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInLeft animate__slow animate__delay-3s\n                "
    }, {
      "elemento": ".box4",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInRight animate__slow animate__delay-4s\n                "
    }, {
      "elemento": ".box5",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInRight animate__slow animate__delay-5s\n                "
    }]
  }
}, // PAGINA 4
{
  "pagina": 4,
  "nome_page": "Apresenta\xE7\xE3o da disciplina",
  "tipo": "Texto",
  "id_page": ".content-render-api",
  "id_component": ".c-carousel__slides",
  "id_elemento_para_modificar": "container-imagem",
  "data": {
    "container_render": "\n                 <div class=\"pagina-tipo-texto animation\">\n                    <div class=\"pagina-tipo-texto--box-texto\">\n                \n                       <!-- Alert Box -->\n                        <p>\n                            Esta disciplina est\xE1 estruturada em 3 (tr\xEAs) unidades. Para que voc\xEA obtenha sucesso, aproveite todas as orienta\xE7\xF5es de estudo apresentadas neste material. Realize as leituras obrigat\xF3rias, pois nelas voc\xEA ter\xE1 acesso ao conhecimento necess\xE1rio para o curso e sua carreira e tamb\xE9m para a realiza\xE7\xE3o das atividades de estudo. \n                        </p>\n                        \n                       <div class=\"message-box message-box-warn\">\n                        <div class=\"message-box--divisor\">\n                            <i class=\"fa fa-warning fa-2x warn\"></i>\n                            <span class=\"message-text\"><strong>Lembrete:</strong> </span>\n                        </div>\n                        <span class=\"message-text\">Lembre-se de ler os materiais complementares, eles s\xE3o essenciais para o aprofundamento dos conte\xFAdos abordados ao longo da disciplina.</span>\n                        <!-- <i class=\"fa fa-times fa-2x exit-button \"></i> -->\n                        </div>\n\n                    </div> \n\n                   \n                 </div>\n            "
  },
  "forcarAtualizacao": {
    "variaveis": [{
      "Nome": "--animacao-sidebar",
      "Entrada": "none",
      "Saida": "slideDown 2s forwards"
    }]
  },
  "paramentros": {
    // Injetar estilos na Pagina
    "inserir_estilo_pagina": [{
      "url": "./conf/css/pagina3.css"
    }],
    "inserir_escript_pagina": [{
      "onde": "body",
      "posicao": "",
      "src": ""
    }],
    "ferramentas": [{
      "container": "icons-action--container",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-ferramentas\" aria-label=\"close\" vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      },
      "FullScreen": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-fullscreen\" aria-label=\"min\" vizioon-tip=\"Tela cheia\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"maximize-2\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "icons-action--container-mobile",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "box-tools-inline",
      "Resulmo": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"file-text\"></i>Resumo</button>\n                        "
      },
      "Destacar": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"pencil\"></i>Destacar</button>\n                        "
      },
      "Notas": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-annotation\"><i data-lucide=\"sticky-note\"></i>Notas</button>\n                        "
      },
      "Ouvinte": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"ear\"></i>Ouvinte</button>\n                        "
      },
      "Download": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"download\"></i>Download</button>\n                        "
      },
      "Dicionario": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-dicionario\"><i data-lucide=\"search\"></i>Dicionario</button>\n                        "
      },
      "close": {
        "ativa": true,
        "html": "\n                              <button><i data-lucide=\"x\" id=\"close_box\"></i></button>\n                        "
      }
    }],
    "cores": {// "sidebar": "red",
      // "fundo": "red",
      // "icones": "rgb(0, 110, 201)"
    },
    "configuracoes_gerais": {
      // Habilitar Procurar de Paragrafos ná Pagina 2
      "_procurar_paragrafos": {
        "status": true,
        "onde_procurar": ".pagina-tipo-texto--box-texto"
      },
      "_procurar_animacao": {
        "status": true,
        "onde_procurar_animacao": ".animation"
      }
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
      "img": "url(../assets/logopreta.png)",
      "posicaoY": "bottom 1.8%",
      "posicaoX": "left 0.5%",
      "tamanho": "10%"
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
      "elemento": ".animation",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInDown animate__slow\n                "
    }, {
      "elemento": ".warn",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__flash animate__infinite animate__slow\n                "
    }]
  }
}, // PAGINA 5
{
  "pagina": 5,
  "nome_page": "Apresenta\xE7\xE3o da Unidade",
  "tipo": "Texto",
  "id_page": ".content-render-api",
  "id_component": ".c-carousel__slides",
  "id_elemento_para_modificar": "container-imagem",
  "data": {
    "container_render": "\n                 <div class=\"pagina-tipo-texto\">\n                    <div class=\"pagina-tipo-texto--box-texto\">\n                \n                       <!-- Apresenta\xE7\xE3o da Unidade -->\n\n                        <p>\n                            Ol\xE1, estudante! Bem-vindo \xE0 Unidade 1! \n                        </p>\n\n                        <p>\n                            Nesta unidade, voc\xEA aprender\xE1 os fundamentos essenciais da hematologia, com foco na interpreta\xE7\xE3o de altera\xE7\xF5es hematol\xF3gicas e compreens\xE3o da fisiologia das c\xE9lulas-tronco e da hemoglobina. Este conhecimento \xE9 valioso para a sua forma\xE7\xE3o como biom\xE9dico, permitindo que voc\xEA entenda e diagnostique diversas condi\xE7\xF5es hematol\xF3gicas, contribuindo significativamente para o campo da sa\xFAde. Ao final desta unidade, voc\xEA ter\xE1 desenvolvido compet\xEAncias fundamentais para a an\xE1lise laboratorial, pesquisa cient\xEDfica e pr\xE1tica cl\xEDnica.\n                            Os objetos de conhecimento que exploraremos incluem a composi\xE7\xE3o e fun\xE7\xF5es do sangue, os processos de eritropoiese e as metodologias para interpreta\xE7\xE3o de exames hematol\xF3gicos. Os materiais disponibilizados para esta unidade incluem textos explicativos, exerc\xEDcios e v\xEDdeos demonstrativos. Cada material foi selecionado para proporcionar uma compreens\xE3o profunda e aplicada dos conceitos abordados. \n                        </p>\n\n                    </div> \n\n                 </div>\n            "
  },
  "forcarAtualizacao": {
    "variaveis": [{
      "Nome": "--animacao-sidebar",
      "Entrada": "none",
      "Saida": "slideDown 2s forwards"
    }]
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
    "ferramentas": [{
      "container": "icons-action--container",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-ferramentas\" aria-label=\"close\" vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      },
      "FullScreen": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-fullscreen\" aria-label=\"min\" vizioon-tip=\"Tela cheia\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"maximize-2\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "icons-action--container-mobile",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "box-tools-inline",
      "Resulmo": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"file-text\"></i>Resumo</button>\n                        "
      },
      "Destacar": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"pencil\"></i>Destacar</button>\n                        "
      },
      "Notas": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-annotation\"><i data-lucide=\"sticky-note\"></i>Notas</button>\n                        "
      },
      "Ouvinte": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"ear\"></i>Ouvinte</button>\n                        "
      },
      "Download": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"download\"></i>Download</button>\n                        "
      },
      "Dicionario": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-dicionario\"><i data-lucide=\"search\"></i>Dicionario</button>\n                        "
      },
      "close": {
        "ativa": true,
        "html": "\n                              <button><i data-lucide=\"x\" id=\"close_box\"></i></button>\n                        "
      }
    }],
    "marcador": [{
      "tipo": "p",
      "posicao": 0,
      "palavras": "Olá, estudante! Bem-vindo à Unidade 1!",
      "attr_unitario": {
        "Olá, estudante! Bem-vindo à Unidade 1!": {
          "attr": "font-weight=[999], font-size=[20px],",
          "attr_inline": "class=[subtitulo],id=[]"
        }
      } // "fundo": "blue",
      // "corTexto": "black",
      // "padding": "0.3rem",

    }],
    "cores": {// "sidebar": "red",
      // "fundo": "red",
      // "icones": "rgb(0, 110, 201)"
    },
    "configuracoes_gerais": {
      // Habilitar Procurar de Paragrafos ná Pagina 2
      "_procurar_paragrafos": {
        "status": true,
        "onde_procurar": ".pagina-tipo-texto--box-texto"
      },
      "_procurar_animacao": {
        "status": true,
        "onde_procurar_animacao": ".animation"
      }
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
      "img": "url(../assets/logopreta.png)",
      "posicaoY": "bottom 1.8%",
      "posicaoX": "left 0.5%",
      "tamanho": "10%"
    },
    // Animação para Texto API
    "animacao_texto": [{
      "indice": "all",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInDown animate__slow\n                "
    }] // Animação pra toda Página
    // "animacao_elemento": [{
    //     "elemento": ".animation", // 0 | all
    //     "script_animation": `
    //         animate__animated animate__fadeInDown animate__slow
    //     `
    // }]

  }
}, // PAGINA 6
{
  "pagina": 6,
  "nome_page": "Apresenta\xE7\xE3o da Unidade",
  "tipo": "Texto",
  "id_page": ".content-render-api",
  "id_component": ".c-carousel__slides",
  "id_elemento_para_modificar": "container-imagem",
  "data": {
    "container_render": "\n                <div class=\"pagina-tipo-texto animation\">\n\n                    <div class=\"pagina-tipo-texto--box-texto align-accordion\">\n                \n                       <!-- Apresenta\xE7\xE3o da Unidade -->\n       \n                        <article class=\"accordion\">\n                            <section id=\"acc1\" style=\"--cardColor:#fc374e;--font-color:#fff;\">\n                                <h2><a href=\"#acc1\">Compet\xEAncias a serem desenvolvidas</a></h2>\n                   \n                                <div class=\"box\">\n                                    <ul>\n                                        <li>Capacidade de identificar e interpretar altera\xE7\xF5es hematol\xF3gicas.</li>\n                                        <li>Habilidade em realizar e interpretar exames hematol\xF3gicos</li>\n                                        <li>Conhecimento profundo sobre a fisiologia das c\xE9lulas-tronco e a estrutura da hemoglobina. </li>\n                                    </ul>\n                                </div>\n                            </section>\n                            \n                            <section id=\"acc2\" style=\"--cardColor:#36aeb3;--font-color:#fff;\" >\n                                <h2><a href=\"#acc2\">Objetos de conhecimento</a></h2>\n                                <div class=\"box\">\n                                    <ul>\n                                        <li><strong>Composi\xE7\xE3o e fun\xE7\xF5es do sangue:</strong> Entendimento dos componentes sangu\xEDneos e suas fun\xE7\xF5es vitais. </li>\n                                        <li><strong>Eritropoese</strong>: A forma\xE7\xE3o da hem\xE1cia</li>\n                                        <li><strong>Interpreta\xE7\xE3o de altera\xE7\xF5es hematol\xF3gicas</strong>: T\xE9cnicas para an\xE1lise de hemogramas</li>\n                                        <li><strong>Fisiologia das c\xE9lulas-tronco</strong>: Estudo das propriedades das c\xE9lulas-tronco e seu papel</li>\n                                        <li><strong>Estrutura e fun\xE7\xE3o da hemoglobina</strong>: An\xE1lise da mol\xE9cula de hemoglobina e seu papel no transporte de oxig\xEAnio. </li>\n                                        <li><strong>Eritrograma</strong>: Procedimentos para realiza\xE7\xE3o e interpreta\xE7\xE3o deste exame crucial.</li>\n                                    </ul>\n                                </div>\n                            </section>\n\n                            <section id=\"acc3\" style=\"--cardColor:#f15f0e;--font-color:#fff;\" >\n                                <h2><a href=\"#acc3\">Materiais Disponibilizados para Estudo</a></h2>\n                                <div class=\"box\">\n                                    <ul>\n                                        <li><strong>Composi\xE7\xE3o do sangue:</strong> Detalhamento dos componentes do sangue e suas fun\xE7\xF5es. </li>\n                                        <li><strong>Fisiologia das c\xE9lulas-tronco</strong>: Explica\xE7\xE3o sobre a origem, propriedades e fun\xE7\xF5es das c\xE9lulas-tronco.</li>\n                                        <li><strong>Estrutura da hemoglobina</strong>: Descri\xE7\xE3o da estrutura molecular da hemoglobina e suas fun\xE7\xF5es.</li>\n                                        <li><strong>Exerc\xEDcios pr\xE1ticos</strong>: Atividades e quest\xF5es de estudo que permitem ao estudante aplicar os conhecimentos adquiridos e testar sua compreens\xE3o.</li>\n                                        <li><strong>V\xEDdeos educativos</strong>: V\xEDdeos que demonstram t\xE9cnicas de coleta de amostras, manejo de materiais inerentes \xE0 hematologia cl\xEDnica e aparelhos para auxiliar na compreens\xE3o. </li>\n                                        <li><strong>Coleta de amostras sangu\xEDneas</strong>: Demonstra\xE7\xE3o das melhores dicas para coleta de sangue.</li>\n                                    </ul>\n                                </div>\n                            </section>\n                            \n                         \n                        </article>\n                        \n                       \n                    </div> \n                \n                </div>\n            "
  },
  "forcarAtualizacao": {
    "variaveis": [{
      "Nome": "--animacao-sidebar",
      "Entrada": "none",
      "Saida": "slideDown 2s forwards"
    }]
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
    "ferramentas": [{
      "container": "icons-action--container",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-ferramentas\" aria-label=\"close\" vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      },
      "FullScreen": {
        "ativa": true,
        "html": "\n                            <button class=\"btn-fullscreen\" aria-label=\"min\" vizioon-tip=\"Tela cheia\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"maximize-2\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "icons-action--container-mobile",
      "Podcast": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Podcast\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"audio-lines\"></i>\n                            </button>\n                        "
      },
      "Videoaula": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Videoaula\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"video\"></i>\n                            </button>\n                        "
      },
      "Ferramentas": {
        "ativa": true,
        "html": "\n                            <button vizioon-tip=\"Ferramentas\" vizioon-posicao=\"gbottom\">\n                                <i data-lucide=\"pencil-ruler\"></i>\n                            </button>\n                        "
      }
    }, {
      "container": "box-tools-inline",
      "Resulmo": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"file-text\"></i>Resumo</button>\n                        "
      },
      "Destacar": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"pencil\"></i>Destacar</button>\n                        "
      },
      "Notas": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-annotation\"><i data-lucide=\"sticky-note\"></i>Notas</button>\n                        "
      },
      "Ouvinte": {
        "ativa": true,
        "html": "\n                             <button><i data-lucide=\"ear\"></i>Ouvinte</button>\n                        "
      },
      "Download": {
        "ativa": true,
        "html": "\n                            <button><i data-lucide=\"download\"></i>Download</button>\n                        "
      },
      "Dicionario": {
        "ativa": true,
        "html": "\n                             <button class=\"abrir-dicionario\"><i data-lucide=\"search\"></i>Dicionario</button>\n                        "
      },
      "close": {
        "ativa": true,
        "html": "\n                              <button><i data-lucide=\"x\" id=\"close_box\"></i></button>\n                        "
      }
    }],
    "marcador": [{
      "tipo": "p",
      "posicao": 0,
      "palavras": "Olá, estudante! Bem-vindo à Unidade 1!",
      "attr_unitario": {
        "Olá, estudante! Bem-vindo à Unidade 1!": {
          "attr": "font-weight=[999], Font-size=[18px]"
        }
      } // "fundo": "blue",
      // "corTexto": "black",
      // "padding": "0.3rem",

    }],
    "cores": {// "sidebar": "red",
      // "fundo": "red",
      // "icones": "rgb(0, 110, 201)"
    },
    "configuracoes_gerais": {
      // Habilitar Procurar de Paragrafos ná Pagina 2
      "_procurar_paragrafos": {
        "status": true,
        "onde_procurar": ".pagina-tipo-texto--box-texto"
      },
      "_procurar_animacao": {
        "status": true,
        "onde_procurar_animacao": ".animation"
      }
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
      "img": "url(../assets/logopreta.png)",
      "posicaoY": "bottom 1.8%",
      "posicaoX": "left 0.5%",
      "tamanho": "10%"
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
      "elemento": ".animation",
      // 0 | all
      "script_animation": "\n                    animate__animated animate__fadeInDown animate__slow\n                "
    }]
  }
}];