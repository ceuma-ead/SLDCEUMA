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
  "cabecalho_link_script": "\n        <!-- Link para a biblioteca de \xEDcones Font Awesome -->\n        <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\" crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />\n        <!-- Link para a fonte Lato do Google Fonts -->\n        <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n        <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n        <link href=\"https://fonts.googleapis.com/css2?family=Lato\" rel=\"stylesheet\">\n    ",
  "data": {
    "container_render": "       \n\n            <!-- Container do texto animado -->\n            <div id=\"text-container-capa\">\n                <div class=\"animated-text\">Hematologia Cl\xEDnica</div>\n                <div id=\"underline\"></div>\n                <div id=\"second-text\">unidade 1</div>\n                <button id=\"animated-button\" onclick=\"iniciar()\">iniciar</button>\n            </div>\n\n            <!-- Imagem animada -->\n            <div id=\"animated-image\"></div>\n            \n            <!-- Imagem -->\n            <div id=\"image-capaOverlay\"></div>\n        "
  },
  "forcarAtualizacao": {
    "variaveis": [{
      "Nome": "--animacao-sidebar",
      "Entrada": "none",
      "Saida": "slideDown 2s forwards"
    }]
  },
  "paramentros": {
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
    "script_simples": [{
      "posicao": "body",
      // Aqui pode ficar no header ou body ou footer ou qualquer outro elemento
      // "attr":"defer" // pode ser defer ou async
      // "insert":"beforebegin", // opcional onde ele vai inserir
      "conteudo_script": "\n\n                function iniciar(){\n                    glider.scrollItem(1);\n                };   \n\n            "
    }],
    "animacao_elemento": [{
      "elemento": ".animation",
      // 0 | all
      "script_animation": "\n                animate__animated animate__fadeInRigth animate__slow\n            "
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
    "container_render": "\n             <div class=\"pagina-tipo-texto\">\n                <div class=\"pagina-tipo-texto--box-texto\">\n                    <p>Ol\xE1, estudante! </p>\n\n                    <p>\n                       Seja bem-vindo (a) ao estudo de Hematologia Cl\xEDnica, uma disciplina essencial para um melhor desenvolvimento acad\xEAmico com vistas ao sucesso profissional. Sou Milena Mendon\xE7a, professora desta disciplina. \n                    </p>\n\n                    <p>\n                        A disciplina de Hematologia Cl\xEDnica \xE9 essencial para a sua forma\xE7\xE3o enquanto estudante de Biomedicina, considerando a realidade social , econ\xF4mica e cultural , tanto em \xE2mbito nacional quanto mundial.  \n                    </p>\n\n                    <p>\n                      Trata-se de uma disciplina que contribui em in\xFAmeras esferas para a sua forma\xE7\xE3o acad\xEAmica e pode ser aplicada em diversos contextos da vida real, possibilitando a interpreta\xE7\xE3o de exames laboratoriais e identifica\xE7\xE3o de condi\xE7\xF5es como anemias, leucemias e coagulopatias. Este conhecimento \xE9 fundamental para o diagn\xF3stico cl\xEDnico, al\xE9m de proporcionar uma base s\xF3lida para a realiza\xE7\xE3o de pesquisas cient\xEDficas em \xE1reas como a fisiologia das c\xE9lulas-tronco e o desenvolvimento de novas terapias.\n                    </p>\n\n                   <div class=\"pagina-tipo-texto--box-texto-div-container-presets\">\n                        <img src=\"".concat(_prefixAssets, "ok.gif\" />\n                        <p style=\"padding: 10px; background:#4285f4; font-weight: 700; border-radius: 10px;\">\n                        Ao final da disciplina voc\xEA estar\xE1 capacitado para implementar e monitorar processos de controle de qualidade em laborat\xF3rios, garantindo a precis\xE3o e confiabilidade dos resultados. Ademais, ensina sobre a pol\xEDtica de sangue, normas t\xE9cnicas e imunohematologia, preparando o futuro profissional para trabalhar em bancos de sangue e compreender a import\xE2ncia dos testes pr\xE9-transfusionais.\n                        </p>\n                   </div>\n                </div> \n        \n             </div>\n        ")
  },
  "forcarAtualizacao": {
    "variaveis": [{
      "Nome": "--animacao-sidebar",
      "Entrada": "none",
      "Saida": "slideDown 2s forwards"
    }]
  },
  // Injetar estilos na Pagi
  "paramentros": {
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
      "attr": "  \n              cursor=[pointer] , border-radius=[5px] , /*border=[2px solid #000]*/\n            ",
      // Criar um Estilo Geral
      "attr_inline": "\n                vizioon-tip=[Saiba Mais] , vizioon-posicao=[top] , vizioon-attr=[d-none d-md-block]\n            ",
      // Criar uma injeção de Dados para estilizar o Marcador
      "estilo_marcador_inject": "",
      // Depreciada ❌
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
        "funcao_script": "\n                        function s_ocial() {\n                            Swal.fire(\n                                {   icon:\"info\",\n                                    // title:\"Social\",\n                                    // customClass: {\n                                    //     popup:\"my-poup\"\n                                    // },\n                                    heightAuto: false,\n                                    text:\"A compreens\xE3o profunda das altera\xE7\xF5es hematol\xF3gicas e suas causas permite aos futuros biom\xE9dicos diagnosticar e tratar doen\xE7as de forma mais eficaz, contribuindo para a melhoria da sa\xFAde p\xFAblica.\",\n                                    // footer:\"<a href='#'>Baixar Conceito</a>\"\n                                }\n                            );\n                        }\n                    ",
        "funcao": "s_ocial()"
      }, {
        "palavra": "econômica",
        "acao": "onclick",
        "funcao_script": "\n                        function e_conomica() {\n                            Swal.fire(\n                                {   icon:\"info\",\n                                    // title:\"econ\xF4mica\",\n                                    // customClass: {\n                                    //     popup:\"my-poup\"\n                                    // },\n                                    heightAuto: false,\n                                    text:\"Culturalmente, ao entender as particularidades gen\xE9ticas e epidemiol\xF3gicas de diferentes popula\xE7\xF5es, o biom\xE9dico pode oferecer um cuidado mais personalizado e adequado.\",\n                                    // footer:\"<a href='#'>Baixar Conceito</a>\"\n                                }\n                            );\n                        }\n                    ",
        "funcao": "e_conomica()"
      }, {
        "palavra": "cultural",
        "acao": "onclick",
        "funcao_script": "\n                        function c_ultural() {\n                            Swal.fire(\n                                {   icon:\"info\",\n                                    // title:\"cultural\",\n                                    // customClass: {\n                                    //     popup:\"my-poup\"\n                                    // },\n                                    heightAuto: false,\n                                    text:\"Em um contexto econ\xF4mico, o diagn\xF3stico preciso e r\xE1pido de doen\xE7as hematol\xF3gicas pode reduzir custos com tratamentos prolongados ou ineficazes.\",\n                                    // footer:\"<a href='#'>Baixar Conceito</a>\"\n                                }\n                            );\n                        }\n                    ",
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
      "script_animation": "\n                animate__animated animate__fadeInDown animate__slow\n            "
    }],
    // Animação pra toda Página
    "animacao_elemento": [{
      "elemento": ".animation",
      // 0 | all
      "script_animation": "\n                animate__animated animate__fadeInRigth animate__slow\n            "
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
    "container_render": "\n             <div class=\"pagina-tipo-texto\">\n                <div class=\"pagina-tipo-texto--box-texto\">\n                   <p>Com base nos perfis e recursos de compet\xEAncias da disciplina, \xE9 esperado que, ao final da disciplina, voc\xEA: </p>\n                \n                   <!-- Lista -->\n\n                   <div class=\"olcards--divisor\">\n\n                        <ol class=\"olcards\">\n                            <li style=\"--cardColor:#fc374e\">\n                                <div class=\"content\">\n                                    <div class=\"icon\">01</div>\n\n                                    <div class=\"text\">Saiba identificar e interpretar as altera\xE7\xF5es hematol\xF3gicas, entendendo suas causas e efeitos</div>\n                                </div>\n                            </li>\n                            <li style=\"--cardColor:#36aeb3\">\n                                <div class=\"content\">\n                                    <div class=\"icon\">02</div>\n                \n                                    <div class=\"text\">Compreenda a fisiologia e a fisiopatogenia das c\xE9lulas-tronco, a eritropoese e a estrutura da hemoglobina</div>\n                                </div>\n                            </li>\n                            <li style=\"--cardColor:#162d59\">\n                                <div class=\"content\">\n                                    <div class=\"icon\">03</div>\n         \n                                    <div class=\"text\">Seja capaz de executar e interpretar eritrogramas, diagnosticar anemias, leucemias e coagulopatias, emitindo laudos e pareceres precisos</div>\n                                </div>\n                            </li>\n                            \n                            \n                        </ol>\n                   \n                         <ol class=\"olcards\">\n                         <li style=\"--cardColor:#f15f0e\">\n                                <div class=\"content\">\n                                    <div class=\"icon\">04</div>\n\n                                    <div class=\"text\">Saiba avaliar e otimizar o controle de qualidade nas etapas pr\xE9-anal\xEDtica, anal\xEDtica e p\xF3s-anal\xEDtica, com \xEAnfase na automa\xE7\xE3o em hematologia.</div>\n                                </div>\n                            </li>\n\n                            <li style=\"--cardColor:#fc374e\">\n                                <div class=\"content\">\n                                    <div class=\"icon\">05</div>\n \n                                    <div class=\"text\">Entenda a hist\xF3ria da hemoterapia, as normas t\xE9cnicas, a legisla\xE7\xE3o vigente e as pr\xE1ticas de banco de sangue, al\xE9m de dominar os testes pr\xE9-transfusionais e gerenciar rea\xE7\xF5es transfusionais</div>\n                                </div>\n                            </li>\n\n                            <p class=\"olcards--box\">\n                                Esta disciplina est\xE1 estruturada em 3 (tr\xEAs) unidades. Para que voc\xEA obtenha sucesso, aproveite todas as orienta\xE7\xF5es de estudo apresentadas neste material. Realize as leituras obrigat\xF3rias, pois nelas voc\xEA ter\xE1 acesso ao conhecimento necess\xE1rio para o curso e sua carreira e tamb\xE9m para a realiza\xE7\xE3o das atividades de estudo\n                            </p>\n                            \n                        </ol>\n\n                   </div>\n                </div> \n\n               \n             </div>\n        "
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
      "url": "./_css/olcards.css"
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
      "script_animation": "\n                animate__animated animate__fadeInDown animate__slow\n            "
    }],
    // Animação pra toda Página
    "animacao_elemento": [{
      "elemento": ".animation",
      // 0 | all
      "script_animation": "\n                animate__animated animate__fadeInRigth animate__slow\n            "
    }]
  }
} // PAGINA PARA IMAGENS
// {
//     "pagina": 3,
//     "nome_page": `Relações étnicas-raciais e história a cultura afro-brasileira e africana`,
//     "tipo": "imagem",
//     "id_page": ".content-render-api",
//     "id_component": ".c-carousel__slides",
//     "id_elemento_para_modificar": "container-imagem",
//     "data": {
//         "container_render": `
//         <div class="container-img-lightbox-fluid">
//         <div class="item-ligthbox">
//         <div class="item-ligthbox-img img-photo-actions">
//         <img src='./assets/unidade_01/Figura_01.png' alt="figura - 01"/>    
//         </div>
//         <p class="description">Descrição da imagem 1</p>
//         </div>
//         <div class="item-ligthbox">
//         <div class="item-ligthbox-img img-photo-actions">
//         <img src='./assets/unidade_01/Figura_02.png' alt="figura - 02" class="example-1"/>
//         </div>
//         <p class="description">Descrição da imagem 2</p>
//                     </div>
//                     </div>
//         `
//     },
//     "paramentros": {
//         "lupa": "Yes",
//         "cores": {
//             // "sidebar": "black",
//             // "fundo": "black",
//             // "icones": "rgb(0, 110, 201)"
//         },
//         "fonte": {
//             // "titulo":"1rem",
//             // "paragrafos":"1rem",
//             // "font_familly":"Lato",
//             // "cor_fonte":"black",
//             // "alinhamento_texto":"center"
//         },
//         "configuracoes_gerais": {
//             // Habilitar Procurar de Paragrafos ná Pagina 2
//             "_procurar_paragrafos": {
//                 "status": true,
//                 "onde_procurar": ".item-ligthbox" // onde precisa procurar os Elementos
//             }
//         },
//         // "marcador": [{
//         //     "tipo": "p",
//         //     "posicao": 0,
//         //     "palavras": "imagem",
//         //     // "attr": `  
//         //     //     font-weight=[500], font-style=[lighter], text-decoration=[overline #ffff] ,          text-underline-offset=[8px]
//         //     // `,
//         //     "attr": `  
//         //       border-bottom=[dashed black]
//         //     `,
//         //     "attr_inline": `id=[#1] , class=[px-1 , bg-success]`,
//         //     // "fundo": "blue",
//         //     "corTexto": "black",
//         //     "padding": "0.3rem",
//         //     // "onclick":[
//         //     //     {
//         //     //         "palavra":"imagem",
//         //     //         "acao":"onclick",
//         //     //         "funcao_script":`
//         //     //             function sejas() {
//         //     //                 alert('Estudantes')
//         //     //             }
//         //     //         `,
//         //     //         "funcao":"sejas()",
//         //     //     }
//         //     // ]
//         // }],
//         "logo": {
//             "ativar": true, // True || False
//             "img": "url(../assets/logopreta.png)",
//             "posicaoY": "bottom 1.8%",
//             "posicaoX": "left 0.5%",
//             "tamanho": "10%",
//         }
//     }
// },
];