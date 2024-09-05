document.addEventListener('DOMContentLoaded', function () {
    abrirSumario();
    abrirAnotacoes();
});


const toolBox = document.querySelector('.box-tools-inline');
const _animationShow = "animate__fadeInDown";
const _animationHide = "animate__backOutUp";
// Função para Fechar o Toobox quando o sumário ou anotações for Aberto
function closeToggleBox(toolBox) {
    toolBox.classList.remove(_animationShow); // Remove a animação de entrada
    toolBox.classList.add('animate__animated', _animationHide); // Adiciona a animação de saída
    toolBox.addEventListener('animationend', () => {
        toolBox.style.display = 'none';
        toolBox.classList.remove('animate__animated', _animationHide); // Remove a animação de saída
    }, {once: true});
}

// Função para abrir o sumário
function abrirSumario() {
    const botaoAbrirSumario = document.getElementById('btnOpenSumario');
    const menuSumario = document.querySelector('.sidebar-menu');
    botaoAbrirSumario.addEventListener('click', function (evento) {

        evento.stopPropagation();
        // Fecha o menu de anotações, se estiver aberto
        fecharMenuAnotacoes();

        // Chamando a função para fechar a caixa de ferramentas
        closeToggleBox(toolBox);

        menuSumario.classList.toggle('open');


        if (menuSumario.classList.contains('open')) {
            botaoAbrirSumario.innerHTML = `
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            `
        } else {
            botaoAbrirSumario.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-notebook-text"><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9.5 8h5"/><path d="M9.5 12H16"/><path d="M9.5 16H14"/></svg>
            `
        }

    });

    document.addEventListener('click', function (evento) {
        if (menuSumario.classList.contains('open') && !menuSumario.contains(evento.target) && evento.target !== botaoAbrirSumario) {
            fecharMenuSumario();
        }
    });
}

// Função para fechar o menu de sumário
function fecharMenuSumario() {
    const menuSumario = document.querySelector('.sidebar-menu');
    const botaoAbrirSumario = document.getElementById('btnOpenSumario');

    if (menuSumario.classList.contains('open')) {
        menuSumario.classList.remove('open');

        botaoAbrirSumario.innerHTML = `
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-notebook-text"><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9.5 8h5"/><path d="M9.5 12H16"/><path d="M9.5 16H14"/></svg>
       `
    }
}


// Função para abrir o menu de anotações
function abrirAnotacoes() {
    const botaoAbrirAnotacoes = document.querySelector('.openAnnotation');
    const menuAnotacoes = document.querySelector('.sidebar-menu-Annotation');

    botaoAbrirAnotacoes.addEventListener('click', function (evento) {
        evento.stopPropagation();

        // verificar se container é vazio pra mudar o icon
        const iconAnnotation = checkEmptyAnnotationsContainer();

        // Verificar e remover a classe 'close-annotation' se ela existir pois ele fecha a 
        // esquerda
        if (menuAnotacoes.classList.contains('close-annotation')) {
            menuAnotacoes.classList.remove('close-annotation');
        }

        // Verificar se está à esquerda e adicionar a classe 'close-annotation'
        if (menuAnotacoes.classList.contains('left')) {
            menuAnotacoes.classList.remove('left');
            menuAnotacoes.classList.add('close-annotation');
        }

        // Fecha o menu de sumário, se estiver aberto
        fecharMenuSumario();

          // Chamando a função para fechar a caixa de ferramentas
        // closeToggleBox(toolBox);

        menuAnotacoes.classList.toggle('open-annotation');

        // Pegar ID Personalizado para Mudar o Nome do Tooltip...
        const vizioon_anotation = document.querySelector(".vizion-annotation")

        // console.log(vizioon_anotation)


        if (menuAnotacoes.classList.contains('open-annotation')) {
            botaoAbrirAnotacoes.innerHTML = `<i class="bi bi-x-lg "></i>`
            botaoAbrirAnotacoes.setAttribute('vizioon-tip', 'Fechar Anotações ❌');
            vizioon_anotation.innerHTML = `Fechar Anotações ❌`
        } else {

            botaoAbrirAnotacoes.innerHTML = `
                ${ iconAnnotation ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticker"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M14 3v4a2 2 0 0 0 2 2h4"/><path d="M8 13h.01"/><path d="M16 13h.01"/><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"/></svg>`
                                : 
                `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/></svg> `}
            `
            botaoAbrirAnotacoes.setAttribute('vizioon-tip', 'Suas Anotações 🤩 !!');
            vizioon_anotation.innerHTML = `Suas Anotações 🤩 !!`
        }

    });

    document.addEventListener('click', function (evento) {
        if (menuAnotacoes.classList.contains('open-annotation') && !menuAnotacoes.contains(evento.target) && evento.target !== botaoAbrirAnotacoes) {
            fecharMenuAnotacoes();
        }
    });
}



function fecharMenuAnotacoes() {

    const menuAnotacoes = document.querySelector('.sidebar-menu-Annotation');
    const botaoAbrirAnotacoes = document.querySelector('.openAnnotation');
    const vizioon_anotation = document.querySelector(".vizion-annotation");

    // Verificar se o container é vazio para mudar o ícone
    const iconAnnotation = checkEmptyAnnotationsContainer();

    if (menuAnotacoes.classList.contains('open-annotation')) {
        menuAnotacoes.classList.remove('open-annotation');


        // Verificar se está à esquerda e adicionar a classe 'close-annotation'
        if (menuAnotacoes.classList.contains('left')) {
            menuAnotacoes.classList.remove('left');
            menuAnotacoes.classList.add('close-annotation');
        }

        // Atualizar o ícone e o tooltip
        botaoAbrirAnotacoes.innerHTML = `
        ${ iconAnnotation ? 
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticker"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M14 3v4a2 2 0 0 0 2 2h4"/><path d="M8 13h.01"/><path d="M16 13h.01"/><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"/></svg>` 
                 : 
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/></svg> `}
        `
        botaoAbrirAnotacoes.setAttribute('vizioon-tip', 'Suas Anotações 🤩 !!');

        if (vizioon_anotation) {
            vizioon_anotation.innerHTML = 'Suas Anotações 🤩 !!';
            vizioon_anotation.style.display = 'none';
        }


    }
}