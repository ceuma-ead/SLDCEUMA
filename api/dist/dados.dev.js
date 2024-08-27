"use strict";

var api = [// PAGINA 1
{
  "pagina": 1,
  "nome_page": "Apresenta\xE7\xE3o da disciplina",
  "tipo": "Texto",
  "id_page": ".content-render-api",
  "id_component": ".c-carousel__slides",
  "id_elemento_para_modificar": "container-imagem",
  "data": {
    "container_render": "\n                 <div class=\"pagina-tipo-texto\">\n                    <div class=\"pagina-tipo-texto--box-texto\">\n                        <p>Ol\xE1, estudante! </p>\n\n                        <p>\n                           Seja bem-vindo (a) ao estudo de Hematologia Cl\xEDnica, uma disciplina essencial para um melhor desenvolvimento acad\xEAmico com vistas ao sucesso profissional. Sou Milena Mendon\xE7a, professora desta disciplina. \n                        </p>\n\n                        <p>\n                            A disciplina de Hematologia Cl\xEDnica \xE9 essencial para a sua forma\xE7\xE3o enquanto estudante de Biomedicina, considerando a realidade social , econ\xF4mica e cultural , tanto em \xE2mbito nacional quanto mundial.  \n                        </p>\n\n                        <p>\n                          Trata-se de uma disciplina que contribui em in\xFAmeras esferas para a sua forma\xE7\xE3o acad\xEAmica e pode ser aplicada em diversos contextos da vida real, possibilitando a interpreta\xE7\xE3o de exames laboratoriais e identifica\xE7\xE3o de condi\xE7\xF5es como anemias, leucemias e coagulopatias. Este conhecimento \xE9 fundamental para o diagn\xF3stico cl\xEDnico, al\xE9m de proporcionar uma base s\xF3lida para a realiza\xE7\xE3o de pesquisas cient\xEDficas em \xE1reas como a fisiologia das c\xE9lulas-tronco e o desenvolvimento de novas terapias.\n                        </p>\n\n                        <p>\n                        Ao final da disciplina voc\xEA estar\xE1 capacitado para implementar e monitorar processos de controle de qualidade em laborat\xF3rios, garantindo a precis\xE3o e confiabilidade dos resultados. Ademais, ensina sobre a pol\xEDtica de sangue, normas t\xE9cnicas e imunohematologia, preparando o futuro profissional para trabalhar em bancos de sangue e compreender a import\xE2ncia dos testes pr\xE9-transfusionais.\n                        </p>\n\n                        <p>Com base nos perfis e recursos de compet\xEAncias da disciplina, \xE9 esperado que, ao final da disciplina, voc\xEA</p>\n    \n\n                    </div> \n                    \n                \n                    \n                 </div>\n            "
  },
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
      "estilo_marcador_inject": "\n                    \n                    .bt-1 {\n                       background: #011c41;\n                       color: #fff;\n                       display: inline-block;\n                       transition: all .4s ease-in-out;\n                       transform-style: preserve-3d;\n                       animation-name: zoom;\n                       animation-duration: 1s;\n                    }\n\n                    .bt-1:hover {\n                      background: #024db3;\n                      transform: rotate3d(1, 0, 0, -360deg);\n            }\n\n                    @keyframes zoom 0% {\n                    transform: scale(0)\n                    \n                    }\n                    \n                    @keyframes zoom 100% {\n                    transform: scale(1)\n                    \n                    } \n                    \n                     .bt-2 {\n                        background:red;\n                        color:#fff; display: inline-block;\n                        transition: all .4s ease-in-out;\n                        transform-style: preserve-3d;\n                        animation-name: zoom;\n            animation-duration: 1s;\n                    }\n\n                    .bt-2:hover {\n                      background: #024db3;\n                      transform: rotate3d(1, 0, 0, -360deg);\n            }\n\n                    @keyframes zoom 0% {\n                    transform: scale(0)\n                    \n                    }\n                    \n                    @keyframes zoom 100% {\n                    transform: scale(1)\n                    \n                    } \n\n                    .bt-3 {\n                        background:#FF8A00;\n                        color:#fff; display: inline-block;\n                       transition: all .4s ease-in-out;\n                       transform-style: preserve-3d;\n                        animation-name: zoom;\n            animation-duration: 1s;\n                    }\n\n                    .bt-3:hover {\n                      background: #024db3;\n                      transform: rotate3d(1, 0, 0, -360deg);\n            }\n\n                    @keyframes zoom 0% {\n                    transform: scale(0)\n                    \n                    }\n                    \n                    @keyframes zoom 100% {\n                    transform: scale(1)\n                    \n                    } \n\n                    .my-poup{\n\n                       background:#FF8A00;\n                    }\n\n                ",
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
    "menu": {}
  }
}, // PAGINA 2
{
  "pagina": 2,
  "nome_page": "Rela\xE7\xF5es \xE9tnicas-raciais e hist\xF3ria a cultura afro-brasileira e africana",
  "tipo": "imagem",
  "id_page": ".content-render-api",
  "id_component": ".c-carousel__slides",
  "id_elemento_para_modificar": "container-imagem",
  "data": {
    "container_render": "\n            <div class=\"container-img-lightbox-fluid\">\n            <div class=\"item-ligthbox\">\n            <div class=\"item-ligthbox-img img-photo-actions\">\n            \n            <img src='./assets/unidade_01/Figura_01.png' alt=\"figura - 01\"/>    \n            \n            </div>\n            <p class=\"description\">Descri\xE7\xE3o da imagem 1</p>\n            </div>\n            <div class=\"item-ligthbox\">\n            <div class=\"item-ligthbox-img img-photo-actions\">\n            \n            <img src='./assets/unidade_01/Figura_02.png' alt=\"figura - 02\" class=\"example-1\"/>\n            \n            </div>\n            <p class=\"description\">Descri\xE7\xE3o da imagem 2</p>\n                        </div>\n                        </div>\n            "
  },
  "paramentros": {
    "lupa": "Yes",
    "cores": {// "sidebar": "black",
      // "fundo": "black",
      // "icones": "rgb(0, 110, 201)"
    },
    "fonte": {// "titulo":"1rem",
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
      "ativar": true,
      // True || False
      "img": "url(../assets/logopreta.png)",
      "posicaoY": "bottom 1.8%",
      "posicaoX": "left 0.5%",
      "tamanho": "10%"
    }
  }
}];