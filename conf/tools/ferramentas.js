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

        // Atualiza os ícones
        lucide.createIcons();
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


    // Butão de Caixa de Ferramentas
    const btnFerramentas = document.querySelectorAll('.btn-ferramentas');

    btnFerramentas.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Seleciona todas as caixas de ferramentas
            const toolBoxes = document.querySelectorAll('.box-tools-inline');
            
            // Verifica se a caixa correspondente existe
            if (toolBoxes[index]) {
                // Alterna a exibição da caixa de ferramentas
                const toolBox = toolBoxes[index];
                toolBox.style.display = (toolBox.style.display === 'none' || toolBox.style.display === '') ? 'flex' : 'none';
            } else {
                console.error('Caixa de ferramentas não encontrada para este botão.');
            }
        });
    });
    








 
}

// Iniciar Evento
eventButton();
