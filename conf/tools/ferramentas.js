document.addEventListener('DOMContentLoaded', function () {
    // Iniciar Evento
    eventButton();
});


function eventButton() {
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

            const toolBoxes = document.querySelectorAll('.box-tools-inline');

            if (toolBoxes[index]) {
                const toolBox = toolBoxes[index];
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
    document.querySelectorAll('#close_box').forEach((closeButton, index) => {
        closeButton.addEventListener('click', () => {

            const toolBoxes = document.querySelectorAll('.box-tools-inline');

            if (toolBoxes[index]) {
                const toolBox = toolBoxes[index];

                toggleToolBox(toolBox, false); // Fechar a caixa ao clicar no botão de fechar
            }
        });
    });


    // =============== Modulos de Aceite ===================== //


    const abri_anotacao = document.querySelectorAll('.abrir-annotation');
    abri_anotacao.forEach((openAnnotation,index) =>{
        openAnnotation.addEventListener("click",function(event){
            eventButton();
            createAnnotation()
            abrirConfigurcoesBaseMenu();
        })

        
    })

    // ======================================================= \\
    




}