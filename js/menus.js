document.addEventListener('DOMContentLoaded', function () {
    abrirSumario();
    abrirAnotacoes();
});

// Função para abrir o sumário
function abrirSumario() {
    const botaoAbrirSumario = document.getElementById('btnOpenSumario');
    const menuSumario = document.querySelector('.sidebar-menu');
    botaoAbrirSumario.addEventListener('click', function (evento) {
        
        evento.stopPropagation();
        // Fecha o menu de anotações, se estiver aberto
        fecharMenuAnotacoes();
        menuSumario.classList.toggle('open');

        
        if (menuSumario.classList.contains('open')) {
            botaoAbrirSumario.innerHTML = `
                 <i class="bi bi-x-lg "></i>
            `
        } else {
            botaoAbrirSumario.innerHTML = `
                <i class="bi bi-journal-bookmark"></i>
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
             <i class="bi bi-journal-bookmark"></i>
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
                ${ iconAnnotation ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticker"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M14 3v4a2 2 0 0 0 2 2h4"/><path d="M8 13h.01"/><path d="M16 13h.01"/><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"/></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticker"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M14 3v4a2 2 0 0 0 2 2h4"/><path d="M8 13h.01"/><path d="M16 13h.01"/><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"/></svg>`}
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
        ${ iconAnnotation ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticker"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M14 3v4a2 2 0 0 0 2 2h4"/><path d="M8 13h.01"/><path d="M16 13h.01"/><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"/></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticker"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M14 3v4a2 2 0 0 0 2 2h4"/><path d="M8 13h.01"/><path d="M16 13h.01"/><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"/></svg>`}
        `
        botaoAbrirAnotacoes.setAttribute('vizioon-tip', 'Suas Anotações 🤩 !!');

        if (vizioon_anotation) {
            vizioon_anotation.innerHTML = 'Suas Anotações 🤩 !!';
            vizioon_anotation.style.display = 'none';
        }

       
    }
}
