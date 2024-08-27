// Inicializa a coleção 'annotation' para armazenar as anotações
var annotation = new LDB.Collection('annotation');
// Função para renderizar uma anotação na interface

// Função para verificar se o contêiner de anotações está vazio
function checkEmptyAnnotationsContainer() {
    const renderMenuDiv = document.querySelector('.render-menu-Annotation');

    // Obtém todos os filhos, exceto a mensagem de "vazio"
    const children = Array.from(renderMenuDiv.children);
    const nonEmptyChildren = children.filter(child => !child.classList.contains('empty-annotation-message'));

    // Verifica se o contêiner está vazio, desconsiderando a mensagem de "vazio"
    if (nonEmptyChildren.length === 0) {
        // Se a mensagem de "vazio" não estiver presente, adicione-a
        let emptyMessage = renderMenuDiv.querySelector('.empty-annotation-message');
        if (!emptyMessage) {
            emptyMessage = document.createElement('div');
            emptyMessage.classList.add('empty-annotation-message');
            emptyMessage.innerHTML = `
                <div class="d-flex align-content-center flex-column justify-content-center w-100 h-100 align-items-center">
                    <img src="./assets/list.gif" alt="list-is-empty-unscreen1.gif" style="width:20%;" >
                    <p style="color:#000;">Nenhuma Anotação no Momento</p>
                </div>
            `;
            renderMenuDiv.appendChild(emptyMessage);
        }
        return false; // Retorna false porque o contêiner está vazio
    } else {
        // Remove a mensagem de "vazio" se ela existir
        const emptyMessage = renderMenuDiv.querySelector('.empty-annotation-message');
        if (emptyMessage) {
            renderMenuDiv.removeChild(emptyMessage);
        }
        return true; // Retorna true porque o contêiner tem anotações
    }
}

function Update() {
    // Exemplo de uso

        const iconAnnotation = checkEmptyAnnotationsContainer();
        const iconeMenuAnotacoes = document.getElementById("iconAnnotatio");

        if (iconAnnotation) {
            // console.log("Container não está vazio");
            iconeMenuAnotacoes.setAttribute('data-lucide', 'sticker'); // Defina o ícone correto aqui
        } else {
            // console.log("Container está vazio");
            iconeMenuAnotacoes.setAttribute('data-lucide', 'sticky-note'); // Defina o ícone correto aqui
        }

        // Atualize os ícones para garantir que a nova configuração seja aplicada
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(); // Certifique-se de que lucide está definido e carregado corretamente
        }



}


checkEmptyAnnotationsContainer()

// Função para renderizar uma anotação na interface
function renderAnnotation(annotationItem) {
    const renderMenuDiv = document.querySelector('.render-menu-Annotation');

    // Cria o elemento para a nova anotação
    const newAnnotation = document.createElement('div');
    newAnnotation.classList.add('content-box-anotation');
    newAnnotation.dataset.id = annotationItem.id; // Armazena o ID da anotação

    // Configura o conteúdo da nova anotação, incluindo o título editável, texto e ícones de ações
    newAnnotation.innerHTML = `
        <div class="ribbon rb d-inline-block text-truncate" style="max-width: 80%;" 
             title='${annotationItem.title}' contenteditable="true">${annotationItem.title}</div>
        
        <p contenteditable="true">${annotationItem.Texto}</p>
        <div class="line"></div>
        <div class="render-menu-Annotation--icons">
            <button class="delete-icon"><i data-lucide="trash-2"></i></button>
            <button class="download-icon"><i data-lucide="cloud-download"></i></button>
            <button class="color-icon"><i data-lucide="palette"></i></button>
        </div>
    `;

    // Aplica a cor salva na anotação, se existir
    if (annotationItem.color) {
        newAnnotation.style.background = annotationItem.color.background;

        // Força a aplicação da cor do texto ao parágrafo
        const paragraph = newAnnotation.querySelector('p');
        paragraph.style.color = annotationItem.color.text;

        newAnnotation.dataset.colorIndex = annotationItem.color.index;

        // Aplica a cor salva nos botões
        const buttons = newAnnotation.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.backgroundColor = annotationItem.color.buttonColor;
            button.style.color = annotationItem.color.textButtonColor;
        });
    }

    // Evento para remover a anotação ao clicar no ícone de lixeira
    newAnnotation.querySelector('.delete-icon').addEventListener('click', function () {
        abrirConfigurcoesBaseMenu();
        removeAnnotation(annotationItem.id);
        checkEmptyAnnotationsContainer(); // Verifica se o contêiner está vazio após remover
    });

    // Evento para baixar a anotação como um arquivo .txt
    newAnnotation.querySelector('.download-icon').addEventListener('click', function () {
        downloadAnnotation(annotationItem);
    });

    // Evento para alterar a cor da anotação ao clicar no ícone de paleta
    newAnnotation.querySelector('.color-icon').addEventListener('click', function () {
        changeAnnotationColor(newAnnotation, annotationItem.id);
    });

    // Evento para salvar o novo título quando o usuário editar e sair do campo (blur)
    newAnnotation.querySelector('.ribbon').addEventListener('blur', function () {
        const updatedTitle = this.innerText.trim();
        if (updatedTitle !== annotationItem.title) {
            // Atualiza o título da anotação
            updateAnnotationField(annotationItem.id, { title: updatedTitle });
           
        }
    });

    // Evento para salvar o texto quando o usuário editar e sair do campo (blur)
    newAnnotation.querySelector('p').addEventListener('blur', function () {
        const updatedText = this.innerText.trim();
        if (updatedText !== annotationItem.Texto) {
            // Atualiza o texto da anotação
            updateAnnotationField(annotationItem.id, { Texto: updatedText });
        }
    });

    // Adiciona a nova anotação na interface
    renderMenuDiv.appendChild(newAnnotation);

    // Atualiza os ícones para usar o Lucide Icons
    lucide.createIcons();

    // Verifica se o contêiner está vazio após adicionar a nova anotação
    checkEmptyAnnotationsContainer();
}

// Função para atualizar campos específicos da anotação
function updateAnnotationField(id, updates) {
    // Implementar a lógica para atualizar o título ou texto da anotação no banco de dados
    // Exemplo fictício:
    annotation.update({ id }, updates);
}


// Função para alterar as cores da anotação
function changeAnnotationColor(annotationElement, annotationId) {
    const colorConfigurations = [{
            background: '#ff0000',
            text: '#ffffff',
            buttonColor: '#ffffff',
            textButtonColor: '#000000',
            iconColor: '#000000'
        }, // Vermelho com texto branco e ícones pretos
        {
            background: '#0000ff',
            text: '#ffffff',
            buttonColor: '#00ff00',
            textButtonColor: '#ffffff',
            iconColor: '#ffffff'
        }, // Azul com texto branco e ícones brancos
        {
            background: '#00ff00',
            text: '#000000',
            buttonColor: '#ff00ff',
            textButtonColor: '#ffffff',
            iconColor: '#ffffff'
        }, // Verde com texto preto e ícones brancos
        {
            background: 'none',
            text: '#000000',
            buttonColor: '#cccccc',
            textButtonColor: '#000000',
            iconColor: '#000000'
        } // Sem fundo, texto preto, ícones pretos
    ];

    // Verifica o índice da cor atual e avança para a próxima configuração
    let currentColorIndex = annotationElement.dataset.colorIndex || 0;
    currentColorIndex = (parseInt(currentColorIndex) + 1) % colorConfigurations.length;

    // Aplica a nova cor de fundo à anotação
    annotationElement.style.background = colorConfigurations[currentColorIndex].background;

    // Atualiza a cor do texto especificamente no parágrafo
    const paragraph = annotationElement.querySelector('p');
    if (paragraph) {
        paragraph.style.color = colorConfigurations[currentColorIndex].text;
    }

    // Atualiza as cores dos botões e dos ícones SVG dentro da anotação
    const buttons = annotationElement.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.backgroundColor = colorConfigurations[currentColorIndex].buttonColor;
        button.style.color = colorConfigurations[currentColorIndex].textButtonColor;

        // Atualiza a cor dos ícones SVG dentro do botão
        const svgIcon = button.querySelector('i[data-lucide]');
        if (svgIcon) {
            svgIcon.style.fill = colorConfigurations[currentColorIndex].iconColor;
        }
    });

    annotationElement.dataset.colorIndex = currentColorIndex; // Armazena o índice da cor atual

    // Salva a cor atualizada no banco de dados
    annotation.update({
        id: annotationId
    }, {
        color: {
            background: colorConfigurations[currentColorIndex].background,
            text: colorConfigurations[currentColorIndex].text,
            buttonColor: colorConfigurations[currentColorIndex].buttonColor,
            textButtonColor: colorConfigurations[currentColorIndex].textButtonColor,
            iconColor: colorConfigurations[currentColorIndex].iconColor,
            index: currentColorIndex
        }
    });
}

// Função para abrir/fechar o menu de configurações de anotações automatico
function abrirConfigurcoesBaseMenu() {
    const menuAnotacoes = document.querySelector('.sidebar-menu-Annotation');
    const iconeMenuAnotacoes = document.getElementById('iconAnnotatio');
    const vizioon_anotation = document.querySelector(".vizion-annotation");

    if (!menuAnotacoes || !iconeMenuAnotacoes || !vizioon_anotation) {
        console.error('abrirConfigurcoesBaseMenu: Elementos não encontrados.');
        return;
    }

    menuAnotacoes.classList.toggle('open-annotation');

    // Atualiza o ícone e o texto com base no estado do menu
    if (menuAnotacoes.classList.contains('open-annotation')) {
        iconeMenuAnotacoes.setAttribute('data-lucide', 'x');
        vizioon_anotation.innerHTML = 'Fechar Anotações ❌';
        console.log('abrirConfigurcoesBaseMenu: Menu aberto.');
    } else {
        iconeMenuAnotacoes.setAttribute('data-lucide', 'sticker');
        vizioon_anotation.innerHTML = 'Veja Suas Anotações Aqui 🤩!!!';
        console.log('abrirConfigurcoesBaseMenu: Menu fechado.');
    }

    // Atualiza os ícones, se necessário
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

// Função para exibir o alerta com fechamento automático e logs
function showAutoCloseAlert(logs) {
    let timerInterval;
    Swal.fire({
        title: 'Escrevendo seu texto...',
        html: `
            <div>
                <p>Aguarde em <b></b> milissegundos.</p>
                <!-- <textarea class="swal2-textarea" style="width:80%;" id="swal2-textarea" readonly>${logs}</textarea> -->
            </div>
        `,
        timer: 2000,
        heightAuto: false,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector('b');
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('showAutoCloseAlert: Alerta fechado pelo timer.');
            abrirConfigurcoesBaseMenu();
        }
    }).catch((error) => {
        console.error('showAutoCloseAlert: Erro ao exibir alerta.', error);
    });
}

// Função para criar uma anotação
async function createAnnotation() {
    // console.log('createAnnotation: Iniciando a criação de uma anotação.');

    try {
        const {
            value: texto
        } = await Swal.fire({
            title: 'Crie sua anotação',
            input: 'textarea',
            inputLabel: 'Texto da Anotação',
            inputPlaceholder: 'Digite o texto da anotação aqui...',
            inputAttributes: {
                'aria-label': 'Digite o texto da anotação aqui'
            },
            showCancelButton: true,
            heightAuto: false,
        });

        if (texto) {
            console.log('createAnnotation: Texto fornecido para anotação.');

            const title = texto.split(' ')[0] || 'Anotação sem título';

            const newAnnotation = {
                id: new Date().getTime().toString(),
                title: title,
                Texto: texto
            };

            console.log('createAnnotation: Criando nova anotação.', newAnnotation);

            annotation.save(newAnnotation, function (savedAnnotation) {
                console.log(`createAnnotation: Anotação salva: ${savedAnnotation.id}`);
                renderAnnotation(savedAnnotation);
            });

            const logs = `
====== Anotação criada com sucesso =====

> ID: ${newAnnotation.id}
> Título: ${title}
> Texto: ${texto}
            `;

            showAutoCloseAlert(logs);

            checkEmptyAnnotationsContainer();
        } else {
            console.log('createAnnotation: Nenhum texto fornecido.');
        }
    } catch (error) {
        console.error('createAnnotation: Erro ao criar anotação.', error);
    }
}

// Adiciona o evento de clique no botão de adicionar anotação
document.querySelector('footer button').addEventListener('click', createAnnotation);

// Função para remover uma anotação com confirmação
async function removeAnnotation(id) {
    try {
        // Exibe o SweetAlert2 para confirmação com ícone de perigo
        const result = await Swal.fire({
            title: 'Você tem certeza?',
            text: "Esta anotação será removida permanentemente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, remover!',
            cancelButtonText: 'Cancelar',
            heightAuto: false,
        });

        if (result.isConfirmed) {
            // Se confirmado, encontra e remove a anotação
            annotation.find({
                id: id
            }, function (results) {
                if (results[0]) {
                    results[0].delete();
                    document.querySelector(`[data-id="${id}"]`).remove();
                    console.log(`removeAnnotation: Anotação removida: ${id}`);

                    // Abre o menu após a remoção

                    // Exibe um alerta de sucesso após a remoção
                    Swal.fire({
                        title: 'Removido!',
                        text: 'A anotação foi removida com sucesso.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        heightAuto: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            checkEmptyAnnotationsContainer();
                            Update() 
                        }
                    })


                } else {
                    console.log(`removeAnnotation: Anotação com ID ${id} não encontrada.`);
                }
            });
        } else {
            console.log('removeAnnotation: Remoção da anotação cancelada.');
        }
    } catch (error) {
        console.error('removeAnnotation: Erro ao remover anotação.', error);
    }
}

// Função para baixar uma anotação como arquivo de texto (.txt)
function downloadAnnotation(annotationItem) {
    const element = document.createElement('a');
    const fileContent = `Título: ${annotationItem.title}\n\nTexto: ${annotationItem.Texto}`;
    const blob = new Blob([fileContent], {
        type: 'text/plain'
    });
    element.href = URL.createObjectURL(blob);
    element.download = `${annotationItem.title}.txt`;
    document.body.appendChild(element); // Adiciona temporariamente ao DOM
    element.click(); // Dispara o download
    document.body.removeChild(element); // Remove do DOM
}

// Função para filtrar e destacar anotações
// function filterAnnotations(searchTerm) {
//     const annotations = document.querySelectorAll('.content-box-anotation');
//     const searchIcon = document.querySelector('#searcListKeyWord-icon');
//     const countFoundResult = document.querySelector('.countFoundResult');

//     // Remove qualquer destaque anterior (classe 'highlight')
//     annotations.forEach(annotation => {
//         const textElement = annotation.querySelector('p');
//         if (textElement) {
//             textElement.innerHTML = textElement.innerHTML.replace(/<\/?span class="highlight">/g, '');
//         }
//     });

//     // Divide o termo de pesquisa em múltiplas palavras-chave
//     const keywords = searchTerm.trim().toLowerCase().split(/\s+/);
//     let found = false;
//     let matchingElements = [];

//     if (keywords.length > 0 && searchTerm.trim() !== '') { // Verifica se o termo de pesquisa não está vazio
//         annotations.forEach(annotation => {
//             const textElement = annotation.querySelector('p');
//             if (textElement) {
//                 let matched = false;
//                 let highlightedHTML = textElement.innerHTML;

//                 // Verifica se qualquer palavra-chave corresponde ao conteúdo
//                 keywords.forEach(keyword => {
//                     if (textElement.textContent.toLowerCase().includes(keyword)) {
//                         matched = true;
//                         const regex = new RegExp(`(${keyword})`, 'gi');
//                         highlightedHTML = highlightedHTML.replace(regex, '<span class="highlight">$1</span>');
//                     }
//                 });

//                 if (matched) {
//                     found = true;
//                     textElement.innerHTML = highlightedHTML;
//                     matchingElements.push(annotation); // Adiciona o elemento correspondente à lista
//                 }
//             }
//         });

//         // Atualiza a quantidade de itens encontrados
//         countFoundResult.textContent = matchingElements.length;

//         // Rola para o primeiro item encontrado e depois para os demais
//         if (matchingElements.length > 0) {
//             matchingElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); // Rola para o primeiro item
//             matchingElements.slice(1).forEach((element, index) => {
//                 setTimeout(() => {
//                     element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//                 }, index * 1000); // Delays para rolar os demais itens
//             });
//         }
//     } else {
//         // Se o campo de pesquisa estiver vazio, exibe o alerta
//         if (searchTerm.trim() === '') {
//             // alert("Campo Vazio");
//             countFoundResult.textContent = '0';
//         }
//     }

//     // Atualiza o ícone com base na pesquisa
//     if (searchIcon) { // Verifica se o ícone existe
//         if (found) {
//             // Mostrar Contado se Achar o Conteudo
//             countFoundResult.classList.remove("d-none")
//             countFoundResult.classList.add("d-flex")
//             searchIcon.setAttribute('data-lucide', 'filter'); // Muda para ícone de filtro
//         } else if (searchTerm.trim() !== '') {
//             // countFoundResult.classList.remove("d-flex")
//             // countFoundResult.classList.add("d-none")
//             searchIcon.setAttribute('data-lucide', 'x'); // Muda para ícone de X
//         } else {
//             countFoundResult.classList.remove("d-flex")
//             countFoundResult.classList.add("d-none")
//             searchIcon.setAttribute('data-lucide', 'search'); // Muda para ícone de busca se o campo estiver vazio
//         }

//         // Atualiza os ícones Lucide
//         lucide.createIcons();
//     }
// }

// Array de comandos
const comandos = [{
    _acionador: ":clear",
    funcao: limparAnotacoes
}];

// Funções para os comandos
function limparAnotacoes() {

    Swal.fire({
        title: "Deseja Remover Tudo?",
        text: "Essa Ação Não pode ser Revestida",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim , Deletar agora!!!",
        heightAuto: false,
    }).then((result) => {
        if (result.isConfirmed) {
            annotation.drop();
            window.location.reload();
            checkEmptyAnnotationsContainer();
        }
    });
}

const autoScrollEnabled = true

// Função para verificar e executar o comando
function verificarComando(inputValue) {
    const comandoEncontrado = comandos.find(comando => inputValue.startsWith(comando._acionador));
    if (comandoEncontrado) {
        comandoEncontrado.funcao(); // Executa a função associada ao comando
        return true;
    }
    return false;
}

// Função principal de filtragem e verificação de comandos
function filterAnnotations(searchTerm) {
    if (verificarComando(searchTerm)) {
        return; // Se um comando foi encontrado e executado, não continua com a filtragem
    }

    const annotations = document.querySelectorAll('.content-box-anotation');
    const searchIcon = document.querySelector('#searcListKeyWord-icon');
    const countFoundResult = document.querySelector('.countFoundResult');
    let matchingElements = [];

    // Remove qualquer destaque anterior (classe 'highlight')
    annotations.forEach(annotation => {
        const textElement = annotation.querySelector('p');
        if (textElement) {
            textElement.innerHTML = textElement.innerHTML.replace(/<\/?span class="highlight">/g, '');
        }
    });

    // Divide o termo de pesquisa em múltiplas palavras-chave
    const keywords = searchTerm.trim().toLowerCase().split(/\s+/);
    let found = false;

    if (keywords.length > 0 && searchTerm.trim() !== '') {
        annotations.forEach(annotation => {
            const textElement = annotation.querySelector('p');
            if (textElement) {
                let matched = false;
                let highlightedHTML = textElement.innerHTML;

                // Verifica se qualquer palavra-chave corresponde ao conteúdo
                keywords.forEach(keyword => {
                    if (textElement.textContent.toLowerCase().includes(keyword)) {
                        matched = true;
                        const regex = new RegExp(`(${keyword})`, 'gi');
                        highlightedHTML = highlightedHTML.replace(regex, '<span class="highlight">$1</span>');
                    }
                });

                if (matched) {
                    found = true;
                    textElement.innerHTML = highlightedHTML;
                    matchingElements.push(annotation);
                }
            }
        });

        countFoundResult.textContent = matchingElements.length;

        if (autoScrollEnabled && matchingElements.length > 0) {
            scrollToMatchingElements(matchingElements);
        }
    } else {
        if (searchTerm.trim() === '') {
            countFoundResult.textContent = '0';
        }
    }

    if (searchIcon) {
        if (found) {
            countFoundResult.classList.remove("d-none")
            countFoundResult.classList.add("d-flex")
            searchIcon.setAttribute('data-lucide', 'filter'); // Muda para ícone de filtro
        } else if (searchTerm.trim() !== '') {
            searchIcon.setAttribute('data-lucide', 'search-x');
        } else {
            countFoundResult.classList.remove("d-flex");
            countFoundResult.classList.add("d-none");
            searchIcon.setAttribute('data-lucide', 'search');
        }

        lucide.createIcons();
    }

    return matchingElements;
}

// Função para rolar até os elementos encontrados
function scrollToMatchingElements(elements) {
    if (elements.length > 0) {
        elements[0].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        elements.slice(1).forEach((element, index) => {
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, index * 1000);
        });
    }
}

// Função para alternar a rolagem automática
function toggleAutoScroll() {
    autoScrollEnabled = !autoScrollEnabled;
    const scrollStatus = autoScrollEnabled ? 'Ativada' : 'Desativada';
    alert(`Rolagem automática ${scrollStatus}`);
}

// Função para rolar manualmente para os elementos encontrados
function manualScrollToFound() {
    const matchingElements = filterAnnotations(document.querySelector('#searchInput').value);
    if (matchingElements.length > 0) {
        scrollToMatchingElements(matchingElements);
    } else {
        alert('Nenhum item encontrado para rolar.');
    }
}

// Função para acionar a filtragem ao clicar no botão
function onSearchButtonClick(event) {
    event.stopPropagation();
    const searchInput = document.querySelector('#searchInput');
    const searchTerm = searchInput.value;
    filterAnnotations(searchTerm);
}

// Adiciona o evento de clique no botão de pesquisa
document.querySelector('#searchButton').addEventListener('click', onSearchButtonClick);

// Adiciona evento para o campo de pesquisa para filtragem em tempo real
document.querySelector('#searchInput').addEventListener('input', function () {
    const searchTerm = this.value;
    filterAnnotations(searchTerm);
});

// Carrega as anotações existentes do banco de dados e as renderiza
annotation.find({}, function (results) {
    results.forEach(renderAnnotation);
});

// Adiciona o evento de clique no botão de adicionar anotação
document.querySelector('footer button').addEventListener('click', createAnnotation);


document.querySelector('.mudarPosicao').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar-menu-Annotation');

    if (sidebar.classList.contains('left')) {
        sidebar.classList.remove('left');
        sidebar.classList.add('right');
    } else {
        sidebar.classList.remove('right');
        sidebar.classList.add('left');
    }

    // Atualizar a lógica de clique fora ao mudar a posição
    document.addEventListener('click', function(evento) {
        if (sidebar.classList.contains('open-annotation') && !sidebar.contains(evento.target) && evento.target !== document.querySelector('.openAnnotation')) {
            fecharMenuAnotacoes();
        }
    });
});



document.querySelector('.rb').addEventListener('keydown', function (event) {
    // Impede a quebra de linha ao pressionar Enter
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});


Update()
checkEmptyAnnotationsContainer()

document.addEventListener('DOMContentLoaded', function() {

    const iconAnnotation = checkEmptyAnnotationsContainer();
    const iconeMenuAnotacoes = document.getElementById("iconAnnotatio");

    if (iconAnnotation) {
        // console.log("Container não está vazio");
        iconeMenuAnotacoes.setAttribute('data-lucide', 'sticker'); // Defina o ícone correto aqui
    } else {
        // console.log("Container está vazio");
        iconeMenuAnotacoes.setAttribute('data-lucide', 'sticky-note'); // Defina o ícone correto aqui
    }

    // Atualize os ícones para garantir que a nova configuração seja aplicada
    if (typeof lucide !== 'undefined') {
        lucide.createIcons(); // Certifique-se de que lucide está definido e carregado corretamente
    }
});