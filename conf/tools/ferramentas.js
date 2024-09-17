document.addEventListener('DOMContentLoaded', function () {
    // Iniciar Evento
    eventButton();

});


function eventButton(API = "", INDEX = "") {
    // Função para entrar/sair da tela cheia
    function Screen(tipo, elemento) {
        const elem = document.documentElement; // Seleciona o elemento raiz (html)

        if (tipo === "min") {
            elemento.ariaLabel = "max";
            // elemento.innerHTML = `<i data-lucide="minimize-2"></i>`;

            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { // Firefox
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { // IE/Edge
                elem.msRequestFullscreen();
            }

        } else if (tipo === "max") {
            elemento.ariaLabel = "min";
            // elemento.innerHTML = `<i data-lucide="maximize-2"></i>`;

            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }

    }


    // Reaplica o evento de clique para o botão de tela cheia
    const btnScreen = document.querySelector(".btn-fullscreen");
    if (btnScreen) {
        btnScreen.onclick = () => {
            Screen(btnScreen.ariaLabel, btnScreen);
        };
    } else {
        console.log("Botão de tela cheia não encontrado.");
    }

    const btnFerramentas = document.querySelectorAll('.btn-ferramentas');
    const _animationShow = "animate__fadeInDown";
    const _animationHide = "animate__backOutUp";

    // Função para abrir/fechar a caixa de ferramentas
    function toggleToolBox(toolBox, show) {
        if (show) {
            // Abrir a caixa de ferramentas com animação
            toolBox.style.display = 'flex';
            toolBox.classList.remove(_animationHide); // Remove a animação de saída
            toolBox.classList.add('animate__animated', _animationShow); // Adiciona a animação de entrada
        } else {
            // Fechar a caixa de ferramentas com animação
            toolBox.classList.remove(_animationShow); // Remove a animação de entrada
            toolBox.classList.add('animate__animated', _animationHide); // Adiciona a animação de saída

            // Aguarda o término da animação para ocultar o elemento
            toolBox.addEventListener('animationend', () => {
                toolBox.style.display = 'none';
                toolBox.classList.remove('animate__animated', _animationHide); // Remove a animação de saída
            }, {
                once: true
            });
        }
    }



    // Evento para abrir/fechar caixas de ferramentas ao clicar no botão correspondente
    btnFerramentas.forEach((button, index) => {
        button.addEventListener('click', () => {
            const toolBoxes = document.querySelector('.box-tools-inline');
            if (toolBoxes) {
                const toolBox = toolBoxes;
                const isVisible = toolBox.style.display === 'flex';
                toggleToolBox(toolBox, !isVisible); // Alterna a exibição da caixa
            } else {
                console.error('Caixa de ferramentas não encontrada para este botão.');
            }
        });
    });

    // // Função para Fechar o Toobox quando o sumario ou anotações for Aberto
    // function closeToggleBox(toolBox) {
    //     if (toolBox.style.display === 'flex') {
    //         // Chama a função toggleToolBox para fechar a caixa de ferramentas
    //         toggleToolBox(toolBox, false);
    //     }
    // }
    // const toolBox = document.querySelector('.box-tools-inline');
    // // Chamando a função para fechar a caixa de ferramentas
    // closeToggleBox(toolBox);



    // Evento para fechar a caixa de ferramentas ao clicar no botão de fechar
    document.querySelectorAll('#close_box').forEach((closeButton) => {
        closeButton.addEventListener('click', () => {
            const toolBoxes = document.querySelector('.box-tools-inline');
            if (toolBoxes) {
                const toolBox = toolBoxes;
                toggleToolBox(toolBox, false); // Fechar a caixa ao clicar no botão de fechar
            }
        });
    });


    // =============== Modulos de Aceite ===================== //


    const abri_anotacao = document.querySelectorAll('.abrir-annotation');
    abri_anotacao.forEach((openAnnotation, index) => {
        openAnnotation.addEventListener("click", function (event) {
            createAnnotation();
        })
    })


    const abri_dicionario = document.querySelectorAll('.abrir-dicionario');
    const fechar_dicionario = document.querySelector('.close_dicionario');
    fechar_dicionario.addEventListener("click", function (event) {
        fecharMenuDicionario();
    });

    abri_dicionario.forEach((openDict, index) => {
        openDict.addEventListener("click", function (event) {
            event.stopPropagation();
            abrirDicionario();
        });
    });


    const abri_resumo = document.querySelectorAll('.abrir-resumo');
    const fechar_resumo = document.querySelector('.close_resumo');
    fechar_resumo.addEventListener("click", function (event) {
        fecharResumo();
    });

    abri_resumo.forEach((openResumo, index) => {
        openResumo.addEventListener("click", function (event) {
            event.stopPropagation();
            abrirResumo();
        });
    });



    const download_pdf = document.querySelectorAll('.baixar-pdf');


    download_pdf.forEach((button, index) => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
        
            // Obter o valor do atributo 'pdf-data'
            const pdfUrl = button.getAttribute('pdf-data');
    
            // Criar um link de download dinamicamente
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1); // Nome do arquivo extraído da URL
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);  // Remover o link após o download
        });
    });
    


    const containerBoxMarcador = API;
    // Verifica se a API não é nula ou indefinida antes de prosseguir
    if (containerBoxMarcador && Array.isArray(containerBoxMarcador)) {
        containerBoxMarcador.forEach((ferramentaGrupo) => {
            if (ferramentaGrupo) {
                for (const key in ferramentaGrupo) {
                    if (ferramentaGrupo.hasOwnProperty(key)) { // Verifica se a chave pertence ao objeto
                        if (key !== 'container' && ferramentaGrupo[key].ativa) {

                            if (ferramentaGrupo.container === "box-tools-inline") {
                                const _acionadorConteudo = ferramentaGrupo[key].acionador;

                                if (_acionadorConteudo) {
                                    const btnMarcador = document.querySelectorAll(".abrir-destacar");
                                    const containerMarcador = document.createElement("div");
                                    containerMarcador.innerHTML = _acionadorConteudo;

                                    const containerMarcadorBTN = document.querySelector(".acionador");
                                    if (containerMarcadorBTN) {
                                        containerMarcadorBTN.appendChild(containerMarcador);
                                    } else {
                                        console.error("Elemento .acionador não encontrado");
                                    }

                                    btnMarcador.forEach((btn, index) => {
                                        btn.addEventListener("click", function (event) {
                                            event.stopPropagation();
                                            const containerMarcadorCores = document.querySelector("#boxMarcaCores-inline-btn");


                                            Swal.fire({
                                                title: "<strong>Como usar <u>Marca Texto</u></strong>",
                                                icon: "info",
                                                html: `
                                                 você pode usar <b class="text-success">Selecione um Texto ou paragrafo</b>,
                                                  <a href="#" autofocus>saiba mais sobre é função</a>.
                                                  
                                                `,
                                                showCloseButton: true,
                                                showCancelButton: true,
                                                focusConfirm: false,
                                                heightAuto: false,
                                                confirmButtonText: `
                                                  <i class="fa fa-thumbs-up"></i> Essa dica foi útil!
                                                `,
                                                confirmButtonAriaLabel: "Thumbs up, great!",
                                                cancelButtonText: `
                                                  <i class="fa fa-thumbs-down"></i>
                                                `,
                                                cancelButtonAriaLabel: "Thumbs down"
                                              });

                                            // if (containerMarcadorCores) {
                                            //     containerMarcadorCores.style.display = "block";
                                            // } else {
                                            //     console.error("#boxMarcaCores-inline-btn não encontrado");
                                            // }
                                        });
                                    });
                                } else {
                                    // console.warn("Marcador não encontrado para chave:", key);
                                }
                            }
                        }
                    }
                }
            } else {
                console.warn("Grupo de ferramenta inválido:", ferramentaGrupo);
            }
        });
    }


    // ======================================================= \\





}