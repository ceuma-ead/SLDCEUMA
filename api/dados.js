const _prefixAssets = "./assets/"

const api = [

    // PAGINA 1
    {
        "pagina": 1,
        "nome_page": `Início`,
        "tipo": "Texto",
        "id_page": ".content-render-api",
        "id_component": ".c-carousel__slides",
        "id_elemento_para_modificar": "container-imagem",
        "data": {
            "container_render": `       

                <!-- Container do texto animado -->
                <div id="text-container-capa">
                    <div class="animated-text">Hematologia Clínica</div>
                    <div id="underline"></div>
                    <div id="second-text">unidade 1</div>
                    <button id="animated-button" onclick="iniciar()">iniciar</button>
                </div>

                <!-- Imagem animada -->
                <div id="animated-image"></div>
                
                <!-- Imagem -->
                <div id="image-capaOverlay"></div>
            `,
        },
        "forcarAtualizacao":{
            "variaveis":[
                {
                    "Nome":"--animacao-sidebar",
                    "Entrada":"none",
                    "Saida":"slideDown 2s forwards"
                }
            ]
        },
        "paramentros": {
            "inserir_estilo_pagina": [{
                "url":""
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
                    "tamanho": "100%",
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
                "tamanho": "10%",
            },
            "script_simples": [{
                "posicao": "body", // Aqui pode ficar no header ou body ou footer ou qualquer outro elemento
                // "attr":"defer" // pode ser defer ou async
                // "insert":"beforebegin", // opcional onde ele vai inserir
                "conteudo_script": `

                    function iniciar(){
                        glider.scrollItem(1);
                    };   

                `
            }],
            "animacao_elemento": [{
                "elemento": ".animation", // 0 | all
                "script_animation": `
                    animate__animated animate__fadeInRigth animate__slow
                `
            }]
            
            
        }
    },

    // PAGINA 2
    {
        "pagina": 2,
        "nome_page": `Apresentação da disciplina`,
        "tipo": "Texto",
        "id_page": ".content-render-api",
        "id_component": ".c-carousel__slides",
        "id_elemento_para_modificar": "container-imagem",
        "data": {
            "container_render": `
                 <div class="pagina-tipo-texto">
                    <div class="pagina-tipo-texto--box-texto">
                        <p>Olá, estudante! </p>

                        <p>
                           Seja bem-vindo (a) ao estudo de Hematologia Clínica, uma disciplina essencial para um melhor desenvolvimento acadêmico com vistas ao sucesso profissional. Sou Milena Mendonça, professora desta disciplina. 
                        </p>

                        <p>
                            A disciplina de Hematologia Clínica é essencial para a sua formação enquanto estudante de Biomedicina, considerando a realidade social , econômica e cultural , tanto em âmbito nacional quanto mundial.  
                        </p>

                        <p>
                          Trata-se de uma disciplina que contribui em inúmeras esferas para a sua formação acadêmica e pode ser aplicada em diversos contextos da vida real, possibilitando a interpretação de exames laboratoriais e identificação de condições como anemias, leucemias e coagulopatias. Este conhecimento é fundamental para o diagnóstico clínico, além de proporcionar uma base sólida para a realização de pesquisas científicas em áreas como a fisiologia das células-tronco e o desenvolvimento de novas terapias.
                        </p>

                       <div class="pagina-tipo-texto--box-texto-div-container-presets">
                            <img src="${_prefixAssets}ok.gif" />
                            <p style="padding: 10px; background:#4285f4; font-weight: 700; border-radius: 10px;">
                            Ao final da disciplina você estará capacitado para implementar e monitorar processos de controle de qualidade em laboratórios, garantindo a precisão e confiabilidade dos resultados. Ademais, ensina sobre a política de sangue, normas técnicas e imunohematologia, preparando o futuro profissional para trabalhar em bancos de sangue e compreender a importância dos testes pré-transfusionais.
                            </p>
                       </div>
                    </div> 
            
                 </div>
            `,
        },
        "forcarAtualizacao":{
            "variaveis":[
                {
                    "Nome":"--animacao-sidebar",
                    "Entrada":"none",
                    "Saida":"slideDown 2s forwards"
                }
            ]
        },
        "paramentros": {
            "inserir_estilo_pagina": [{
                "url":"./_css/pagina2.css"
            }],
            "cores": {
                // "sidebar": "red",
                // "fundo": "red",
                // "icones": "rgb(0, 110, 201)"
            },
            "configuracoes_gerais": {

                // Habilitar Procurar de Paragrafos ná Pagina 2
                "_procurar_paragrafos": {
                    "status": true,
                    "onde_procurar": ".pagina-tipo-texto--box-texto",
                },
                "_procurar_animacao":{
                    "status":true,
                    "onde_procurar_animacao":".animation",
                }
            },
            "marcador": [{
                "tipo": "p",
                "posicao": 2,
                "palavras": "social|econômica|cultural",
                // Atributos Gerais
                "attr": `  
                  cursor=[pointer] , border-radius=[5px] , /*border=[2px solid #000]*/
                `,
                // Criar um Estilo Geral
                "attr_inline": `
                    vizioon-tip=[Saiba Mais] , vizioon-posicao=[top] , vizioon-attr=[d-none d-md-block]
                `,
                // Criar uma injeção de Dados para estilizar o Marcador
                "estilo_marcador_inject": ``, // ❌ Depreciada
                // Atributos Especificos
                "attr_unitario": {
                    "social": {
                        // "attr": "background=[red],color=[white]",
                        "attr_inline": "id=[#1], class=[bt-1]",
                    },
                    "econômica": {
                        // "attr": "background=[blue],color=[white]",
                        "attr_inline": "id=[#1], class=[bt-2]"
                    },

                    "cultural": {
                        // "attr": "background=[blue],color=[white]",
                        "attr_inline": "id=[#1], class=[bt-3]"
                    },
                },
                // "fundo": "blue",
                // "corTexto": "black",
                "padding": "0.3rem",
                "onclick": [{
                        "palavra": "social",
                        "acao": "onclick",
                        "funcao_script": `
                            function s_ocial() {
                                Swal.fire(
                                    {   icon:"info",
                                        // title:"Social",
                                        // customClass: {
                                        //     popup:"my-poup"
                                        // },
                                        heightAuto: false,
                                        text:"A compreensão profunda das alterações hematológicas e suas causas permite aos futuros biomédicos diagnosticar e tratar doenças de forma mais eficaz, contribuindo para a melhoria da saúde pública.",
                                        // footer:"<a href='#'>Baixar Conceito</a>"
                                    }
                                );
                            }
                        `,
                        "funcao": "s_ocial()"
                    },
                    {
                        "palavra": "econômica",
                        "acao": "onclick",
                        "funcao_script": `
                            function e_conomica() {
                                Swal.fire(
                                    {   icon:"info",
                                        // title:"econômica",
                                        // customClass: {
                                        //     popup:"my-poup"
                                        // },
                                        heightAuto: false,
                                        text:"Culturalmente, ao entender as particularidades genéticas e epidemiológicas de diferentes populações, o biomédico pode oferecer um cuidado mais personalizado e adequado.",
                                        // footer:"<a href='#'>Baixar Conceito</a>"
                                    }
                                );
                            }
                        `,
                        "funcao": "e_conomica()"
                    },
                    {
                        "palavra": "cultural",
                        "acao": "onclick",
                        "funcao_script": `
                            function c_ultural() {
                                Swal.fire(
                                    {   icon:"info",
                                        // title:"cultural",
                                        // customClass: {
                                        //     popup:"my-poup"
                                        // },
                                        heightAuto: false,
                                        text:"Em um contexto econômico, o diagnóstico preciso e rápido de doenças hematológicas pode reduzir custos com tratamentos prolongados ou ineficazes.",
                                        // footer:"<a href='#'>Baixar Conceito</a>"
                                    }
                                );
                            }
                        `,
                        "funcao": "c_ultural()"
                    },

                ]

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
                "tamanho": "10%",
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
                "indice": "all", // 0 | all
                "script_animation": `
                    animate__animated animate__fadeInDown animate__slow
                `
            }],
            // Animação pra toda Página
            "animacao_elemento": [{
                "elemento": ".animation", // 0 | all
                "script_animation": `
                    animate__animated animate__fadeInRigth animate__slow
                `
            }]

        }
    },
    
    // PAGINA 3
    {
        "pagina": 3,
        "nome_page": `Apresentação da disciplina`,
        "tipo": "Texto",
        "id_page": ".content-render-api",
        "id_component": ".c-carousel__slides",
        "id_elemento_para_modificar": "container-imagem",
        "data": {
            "container_render": `
                 <div class="pagina-tipo-texto animation">
                    <div class="pagina-tipo-texto--box-texto">
                       <p>Com base nos perfis e recursos de competências da disciplina, é esperado que, ao final da disciplina, você: </p>
                    
                       <!-- Lista -->

                       <div class="olcards--divisor">

                            <ol class="olcards">
                                <li style="--cardColor:#fc374e">
                                    <div class="content">
                                        <div class="icon">01</div>

                                        <div class="text">Saiba identificar e interpretar as alterações hematológicas, entendendo suas causas e efeitos</div>
                                    </div>
                                </li>
                                <li style="--cardColor:#36aeb3">
                                    <div class="content">
                                        <div class="icon">02</div>
                    
                                        <div class="text">Compreenda a fisiologia e a fisiopatogenia das células-tronco, a eritropoese e a estrutura da hemoglobina</div>
                                    </div>
                                </li>
                                <li style="--cardColor:#162d59">
                                    <div class="content">
                                        <div class="icon">03</div>
             
                                        <div class="text">Seja capaz de executar e interpretar eritrogramas, diagnosticar anemias, leucemias e coagulopatias, emitindo laudos e pareceres precisos</div>
                                    </div>
                                </li>
                                
                                
                            </ol>
                       
                             <ol class="olcards">
                             <li style="--cardColor:#f15f0e">
                                    <div class="content">
                                        <div class="icon">04</div>

                                        <div class="text">Saiba avaliar e otimizar o controle de qualidade nas etapas pré-analítica, analítica e pós-analítica, com ênfase na automação em hematologia.</div>
                                    </div>
                                </li>

                                <li style="--cardColor:#fc374e">
                                    <div class="content">
                                        <div class="icon">05</div>
     
                                        <div class="text">Entenda a história da hemoterapia, as normas técnicas, a legislação vigente e as práticas de banco de sangue, além de dominar os testes pré-transfusionais e gerenciar reações transfusionais</div>
                                    </div>
                                </li>

                                <p class="olcards--box">
                                    Esta disciplina está estruturada em 3 (três) unidades. Para que você obtenha sucesso, aproveite todas as orientações de estudo apresentadas neste material. Realize as leituras obrigatórias, pois nelas você terá acesso ao conhecimento necessário para o curso e sua carreira e também para a realização das atividades de estudo
                                </p>
                                
                            </ol>

                       </div>
                    </div> 

                   
                 </div>
            `,
        },
        "forcarAtualizacao":{
            "variaveis":[
                {
                    "Nome":"--animacao-sidebar",
                    "Entrada":"none",
                    "Saida":"slideDown 2s forwards"
                }
            ]
        },
        "paramentros": {
            // Injetar estilos na Pagina
            "inserir_estilo_pagina": [{
                "url":"./_css/pagina3.css"
            }],
            "cores": {
                // "sidebar": "red",
                // "fundo": "red",
                // "icones": "rgb(0, 110, 201)"
            },
            "configuracoes_gerais": {

                // Habilitar Procurar de Paragrafos ná Pagina 2
                "_procurar_paragrafos": {
                    "status": true,
                    "onde_procurar": ".pagina-tipo-texto--box-texto",
                },
                "_procurar_animacao":{
                    "status":true,
                    "onde_procurar_animacao":".animation",
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
            }]

        }
    },
    

    // PAGINA 4
    {
        "pagina": 4,
        "nome_page": `Apresentação da disciplina`,
        "tipo": "Texto",
        "id_page": ".content-render-api",
        "id_component": ".c-carousel__slides",
        "id_elemento_para_modificar": "container-imagem",
        "data": {
            "container_render": `
                 <div class="pagina-tipo-texto animation">
                    <div class="pagina-tipo-texto--box-texto">
                
                       <!-- Alert Box -->

                    </div> 

                   
                 </div>
            `,
        },
        "forcarAtualizacao":{
            "variaveis":[
                {
                    "Nome":"--animacao-sidebar",
                    "Entrada":"none",
                    "Saida":"slideDown 2s forwards"
                }
            ]
        },
        "paramentros": {
            // Injetar estilos na Pagina
            "inserir_estilo_pagina": [{
                "url":"./_css/pagina3.css"
            }],
            "cores": {
                // "sidebar": "red",
                // "fundo": "red",
                // "icones": "rgb(0, 110, 201)"
            },
            "configuracoes_gerais": {

                // Habilitar Procurar de Paragrafos ná Pagina 2
                "_procurar_paragrafos": {
                    "status": true,
                    "onde_procurar": ".pagina-tipo-texto--box-texto",
                },
                "_procurar_animacao":{
                    "status":true,
                    "onde_procurar_animacao":".animation",
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
            }]

        }
    },

   

 

];