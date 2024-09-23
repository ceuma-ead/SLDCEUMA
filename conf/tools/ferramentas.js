document.addEventListener('DOMContentLoaded', function () {
    // Iniciar Evento
    eventButton();
    exibirHistoricoResumos();
});

// Cria a coleção de resumos (usando LocalDB.js)
var historicoResumos = new LDB.Collection('historicoResumos');

function salvarHistoricoResumo(titleResumo, tema, resumo) {
    const novoResumo = {
        title: titleResumo,
        tema: tema,
        resumo: resumo,
        data: new Date().toLocaleString()
    };

    const iconHistory = document.getElementById("history-icon");

    // Configura o tippy no ícone de histórico para aparecer automaticamente
    const tooltipInstance = tippy(iconHistory, {
        content: 'Seu resumo está aqui. Clique para ver 👉',
        placement: 'left',
        arrow: true, // Exibe uma seta no tooltip
        theme: 'light', // Define o tema claro para o tooltip
        // duration: [300, 200], // Define a duração da animação de entrada e saída
        // delay: [200, 0], // Define o atraso para mostrar o tooltip
        interactive: true, // Torna o tooltip interativo
        allowHTML: true, // Permite HTML no conteúdo
        trigger: 'manual', // Define o trigger manual (sem precisar de interação do usuário)
        showOnCreate: true, // Mostra o tooltip imediatamente ao ser criado
        hideOnClick: 'toggle',
        onShown(instance) {
            // Tooltip é mostrado uma vez e depois destruído
            setTimeout(() => {
                instance.destroy(); // Destroi o tooltip após ser mostrado por 3 segundos
            }, 4000); // Tempo de exibição do tooltip (3 segundos)
        }
    });

    // Salva o novo resumo na coleção "historicoResumos"
    historicoResumos.save(novoResumo, function (_novoResumo) {
        console.log("Resumo salvo no histórico:", _novoResumo);

        // Exibe um alerta de sucesso com SweetAlert
        Swal.fire({
            title: "Resumo Salvo com Sucesso",
            text: "Seu resumo foi salvo...",
            icon: "success",
            heightAuto: false,
        });

        // Atualiza a visualização do histórico após salvar
        exibirHistoricoResumos();
    });
}



// Função para exibir os resumos salvos no histórico usando LocalDB.js
function exibirHistoricoResumos() {
    const historicoContainer = document.querySelector('.render-resumo-result-historico');
    historicoContainer.innerHTML = '';

    // Limpa o container antes de adicionar novos itens
    
    // Busca todos os resumos salvos na coleção "historicoResumos"
    historicoResumos.find({}, function (resumos) {
        if (resumos.length === 0) {
            checkEmptyResumoHistoricoContainer();
            return;
        }

        // Itera sobre os resumos e renderiza cada um na página
        resumos.forEach(function (resumo) {
            const temaReduzido = reduzirTexto(resumo.title, 15);

            const resumoHTML = `
                <div class="result-historico-items">
                    <small class="text-muted">Data: ${resumo.data}</small>
                    <span class="title img-back-history d-flex flex-column border border-2 bg-dark text-dark p-2 rounded justify-content-center align-items-center">
                        ${temaReduzido}
                        <span class="w-100 d-flex gap-2 justify-content-center align-items-center">
                            <button class="btn btn-warning btn-dowload-resposta-historico" data-id-historico="${resumo._id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line">
                                    <path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" />
                                </svg>
                            </button>
                            <button class="btn btn-danger btn-apagar-historico" data-id-historico="${resumo._id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
                                    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                                </svg>
                            </button>
                        </span>
                    </span>
                    <p>${resumo.resumo}</p>
                </div>
            `;
            historicoContainer.innerHTML += resumoHTML;
        });

        // Adiciona evento para os botões de download
        document.querySelectorAll('.btn-dowload-resposta-historico').forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id-historico');
                baixarResumo(id);
            });
        });

        // Adiciona evento para os botões de apagar
        document.querySelectorAll('.btn-apagar-historico').forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id-historico');
                apagarResumo(id);
            });
        });
    });
}

// Função para baixar o resumo em um arquivo .txt
function baixarResumo(id) {
    // Busca o resumo pelo ID
    historicoResumos.find({ _id: id }, function (resumos) {
        if (resumos.length > 0) {
            const resumo = resumos[0];
            const temaReduzido = reduzirTexto(resumo.tema, 20);
            const blob = new Blob([resumo.tema + '\n\n' + resumo.resumo], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${temaReduzido}.txt`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }
    });
}


// Função para pesquisar um registro no histórico (agora retorna uma Promise)
function pesquisarRegistro(id) {
    return new Promise((resolve, reject) => {
        historicoResumos.find({ _id: id }, function (resumos) {
            if (resumos.length > 0) {
                const resumo = resumos[0];
                resolve(resumo); // Resolve a Promise com o resumo encontrado
            } else {
                reject('Registro não encontrado');
            }
        });
    });
}

// Função para apagar um resumo do histórico com confirmação
function apagarResumo(id) {
    // Pesquisar o registro antes de tentar apagar
    pesquisarRegistro(id)
        .then((resumo) => {
            // Exibe uma mensagem de confirmação antes de apagar o resumo
            Swal.fire({
                title: 'Tem certeza?',
                text: "Você não poderá reverter esta ação!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, apagar!',
                cancelButtonText: 'Cancelar',
                heightAuto: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    // Apaga o resumo pelo ID se o usuário confirmar
                    resumo.delete(function () {
                        Swal.fire({
                            title: "Resumo Apagado",
                            icon: "success",
                            html: `
                                <div class="d-flex gap-1 flex-column">
                                    <p class>ID: ${resumo._id}</p>
                                    <strong>${resumo.title}</strong>
                                </div>
                            `,
                            heightAuto: false,
                        });

                        // Atualiza a visualização do histórico após apagar
                        exibirHistoricoResumos();
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // Se a ação for cancelada, nada acontece
                    // Swal.fire({
                    //     title: "Cancelado",
                    //     text: "O resumo não foi apagado.",
                    //     icon: "info",
                    //     heightAuto: false,
                    // });
                }
            });
        })
        .catch((error) => {
            console.error(error);
            Swal.fire({
                title: "Erro",
                text: "Registro não encontrado.",
                icon: "error",
                heightAuto: false,
            });
        });
}



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


    // const download_pdf = document.querySelectorAll('.baixar-pdf');
    // download_pdf.forEach((button, index) => {
    //     button.addEventListener("click", function (event) {
    //         event.stopPropagation();
    
    //         var myModal = new bootstrap.Modal(document.getElementById('modal-pdf'), {
    //             keyboard: true
    //         });
    //         myModal.show();

    //         // // Obter o valor do atributo 'pdf-data'
    //         // const pdfUrl = button.getAttribute('pdf-data');

    //         // // Criar um link de download dinamicamente
    //         // const link = document.createElement('a');
    //         // link.href = pdfUrl;
    //         // link.download = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1); // Nome do arquivo extraído da URL
    //         // document.body.appendChild(link);
    //         // link.click();
    //         // document.body.removeChild(link);  // Remover o link após o download
    //     });
    // });



    const download_pdf = document.querySelectorAll('.baixar-pdf');


    download_pdf.forEach((button, index) => {


        button.addEventListener("click", function (event) {
            event.stopPropagation();

            $(".modal-pdf-content").html();

            $(".modal-pdf-content").html(`
                <div id="flipbookContainer">
                </div>
            `);


            const pdfUrl = button.getAttribute('pdf-data');

            var pdf = pdfUrl;
            var options = {
                height:400,
                duration: 700,
                backgroundColor: "#2F2D2F"
              };

            var flipBook = $("#flipbookContainer").flipBook(pdf, options);

            var myModal = new bootstrap.Modal(document.getElementById('modal-pdf'), {
                keyboard: true
            });
            myModal.show();

            // // Obter o valor do atributo 'pdf-data'
            // const pdfUrl = button.getAttribute('pdf-data');

            // // Criar um link de download dinamicamente
            // const link = document.createElement('a');
            // link.href = pdfUrl;
            // link.download = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1); // Nome do arquivo extraído da URL
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);  // Remover o link após o download
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
                                                title: "<strong>Como usar o <u>Marca Texto</u></strong>",
                                                icon: "info",
                                                html: `
                                                <div class="alert alert-info mt-3 p-3">
                                                    <p class="mb-0">
                                                        Você pode usar da seguinte maneira: <b class="text-success">Selecione um texto ou parágrafo</b>.
                                                        <br>
                                                        <a href="#" class="text-primary text-decoration-underline" autofocus>Se tiver alguma dúvida, consulte o tutorial disponível</a>.
                                                    </p>
                                                </div>
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

    const btn_historico = document.querySelector("#history-icon");
    const containerFlip = document.querySelector("#flip-container");
    const nomeHeaderResumo = document.querySelector(".nome-header-resumo");
    
    btn_historico.onclick = () => {
        // Alterna a classe 'flip-active' no container
        containerFlip.classList.toggle('flip-active');
    
        // Verifica o estado do container e atualiza o título
        if (containerFlip.classList.contains('flip-active')) {
            nomeHeaderResumo.innerHTML = "Histórico"; // Muda para 'Histórico' quando flipado
        } else {
            nomeHeaderResumo.innerHTML = "Resumo"; // Muda para 'Resumo' quando não flipado
        }
    };
    


    // document.getElementById('btn-menu-chat-ai').addEventListener('click', function (event) {
    //     const menuInterno = document.getElementById('menu-interno');

    //     // Alterna a classe 'open' para exibir/esconder o menu com animação
    //     menuInterno.classList.toggle('open');
        
    //     // Impede que o clique no botão feche o menu
    //     event.stopPropagation();
    // });
    
    // // Fecha o menu quando clicar fora dele
    // document.addEventListener('click', function (event) {
    //     const menuInterno = document.getElementById('menu-interno');
        
    //     // Verifica se o menu está aberto e se o clique foi fora do menu
    //     if (!menuInterno.contains(event.target) && !event.target.matches('#btn-menu')) {
    //         menuInterno.classList.remove('open');
    //     }
    // });
    


    // ======================================================= \\





}