"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

// Inicializa a coleção 'annotation' para armazenar as anotações
var annotation = new LDB.Collection('annotation'); // Função para renderizar uma anotação na interface
// Função para verificar se o contêiner de anotações está vazio

function checkEmptyAnnotationsContainer() {
  var renderMenuDiv = document.querySelector('.render-menu-Annotation'); // Obtém todos os filhos, exceto a mensagem de "vazio"

  var children = Array.from(renderMenuDiv.children);
  var nonEmptyChildren = children.filter(function (child) {
    return !child.classList.contains('empty-annotation-message');
  }); // Verifica se o contêiner está vazio, desconsiderando a mensagem de "vazio"

  if (nonEmptyChildren.length === 0) {
    // Se a mensagem de "vazio" não estiver presente, adicione-a
    var emptyMessage = renderMenuDiv.querySelector('.empty-annotation-message');

    if (!emptyMessage) {
      emptyMessage = document.createElement('div');
      emptyMessage.classList.add('empty-annotation-message');
      emptyMessage.innerHTML = "\n                <div class=\"d-flex align-content-center flex-column justify-content-center w-100 h-100 align-items-center\">\n                    <img src=\"./assets/list.gif\" alt=\"list-is-empty-unscreen1.gif\" style=\"width:20%;\" >\n                    <p style=\"color:#000;\">Nenhuma Anota\xE7\xE3o no Momento</p>\n                </div>\n            ";
      renderMenuDiv.appendChild(emptyMessage);
    }

    return false; // Retorna false porque o contêiner está vazio
  } else {
    // Remove a mensagem de "vazio" se ela existir
    var _emptyMessage = renderMenuDiv.querySelector('.empty-annotation-message');

    if (_emptyMessage) {
      renderMenuDiv.removeChild(_emptyMessage);
    }

    return true; // Retorna true porque o contêiner tem anotações
  }
}

function Update() {
  // Exemplo de uso
  var iconAnnotation = checkEmptyAnnotationsContainer();
  var iconeMenuAnotacoes = document.getElementById("iconAnnotatio");

  if (iconAnnotation) {
    // console.log("Container não está vazio");
    iconeMenuAnotacoes.setAttribute('data-lucide', 'sticker'); // Defina o ícone correto aqui
  } else {
    // console.log("Container está vazio");
    iconeMenuAnotacoes.setAttribute('data-lucide', 'sticky-note'); // Defina o ícone correto aqui
  } // Atualize os ícones para garantir que a nova configuração seja aplicada


  if (typeof lucide !== 'undefined') {
    lucide.createIcons(); // Certifique-se de que lucide está definido e carregado corretamente
  }
}

checkEmptyAnnotationsContainer(); // Função para renderizar uma anotação na interface

function renderAnnotation(annotationItem) {
  var renderMenuDiv = document.querySelector('.render-menu-Annotation'); // Cria o elemento para a nova anotação

  var newAnnotation = document.createElement('div');
  newAnnotation.classList.add('content-box-anotation');
  newAnnotation.dataset.id = annotationItem.id; // Armazena o ID da anotação
  // Configura o conteúdo da nova anotação, incluindo o título editável, texto e ícones de ações

  newAnnotation.innerHTML = "\n     \n        <div class=\"ribbon rb d-inline-block text-truncate\"  title=\"".concat(annotationItem.title, "\" contenteditable=\"true\">").concat(annotationItem.title, "</div>\n\n        <p>").concat(annotationItem.Texto, "</p>\n        <div class=\"line\"></div>\n        <div class=\"render-menu-Annotation--icons\">\n            <button class=\"delete-icon\"><i data-lucide=\"trash-2\"></i></button>\n            <button class=\"download-icon\"><i data-lucide=\"cloud-download\"></i></button>\n            <button class=\"color-icon\"><i data-lucide=\"palette\"></i></button>\n        </div>\n    "); // Aplica a cor salva na anotação, se existir

  if (annotationItem.color) {
    newAnnotation.style.background = annotationItem.color.background; // Força a aplicação da cor do texto ao parágrafo

    var paragraph = newAnnotation.querySelector('p');
    paragraph.style.color = annotationItem.color.text;
    newAnnotation.dataset.colorIndex = annotationItem.color.index; // Aplica a cor salva nos botões

    var buttons = newAnnotation.querySelectorAll('button');
    buttons.forEach(function (button) {
      button.style.backgroundColor = annotationItem.color.buttonColor;
      button.style.color = annotationItem.color.textButtonColor;
    });
  } // Evento para remover a anotação ao clicar no ícone de lixeira


  newAnnotation.querySelector('.delete-icon').addEventListener('click', function () {
    abrirConfigurcoesBaseMenu();
    removeAnnotation(annotationItem.id);
    checkEmptyAnnotationsContainer(); // Verifica se o contêiner está vazio após remover
  }); // Evento para baixar a anotação como um arquivo .txt

  newAnnotation.querySelector('.download-icon').addEventListener('click', function () {
    downloadAnnotation(annotationItem);
  }); // Evento para alterar a cor da anotação ao clicar no ícone de paleta

  newAnnotation.querySelector('.color-icon').addEventListener('click', function () {
    changeAnnotationColor(newAnnotation, annotationItem.id);
  }); // Evento para salvar o novo título quando o usuário editar e sair do campo (blur)

  newAnnotation.querySelector('.ribbon').addEventListener('blur', function () {
    var updatedTitle = this.innerText.trim();

    if (updatedTitle !== annotationItem.title) {
      annotation.update({
        id: annotationItem.id
      }, {
        title: updatedTitle
      });
    }
  }); // Adiciona a nova anotação na interface

  renderMenuDiv.appendChild(newAnnotation); // Atualiza os ícones para usar o Lucide Icons

  lucide.createIcons(); // Verifica se o contêiner está vazio após adicionar a nova anotação

  checkEmptyAnnotationsContainer();
} // Função para alterar as cores da anotação


function changeAnnotationColor(annotationElement, annotationId) {
  var colorConfigurations = [{
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
  ]; // Verifica o índice da cor atual e avança para a próxima configuração

  var currentColorIndex = annotationElement.dataset.colorIndex || 0;
  currentColorIndex = (parseInt(currentColorIndex) + 1) % colorConfigurations.length; // Aplica a nova cor de fundo à anotação

  annotationElement.style.background = colorConfigurations[currentColorIndex].background; // Atualiza a cor do texto especificamente no parágrafo

  var paragraph = annotationElement.querySelector('p');

  if (paragraph) {
    paragraph.style.color = colorConfigurations[currentColorIndex].text;
  } // Atualiza as cores dos botões e dos ícones SVG dentro da anotação


  var buttons = annotationElement.querySelectorAll('button');
  buttons.forEach(function (button) {
    button.style.backgroundColor = colorConfigurations[currentColorIndex].buttonColor;
    button.style.color = colorConfigurations[currentColorIndex].textButtonColor; // Atualiza a cor dos ícones SVG dentro do botão

    var svgIcon = button.querySelector('i[data-lucide]');

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
} // Função para abrir/fechar o menu de configurações de anotações automatico


function abrirConfigurcoesBaseMenu() {
  var menuAnotacoes = document.querySelector('.sidebar-menu-Annotation');
  var iconeMenuAnotacoes = document.getElementById('iconAnnotatio');
  var vizioon_anotation = document.querySelector(".vizion-annotation");

  if (!menuAnotacoes || !iconeMenuAnotacoes || !vizioon_anotation) {
    console.error('abrirConfigurcoesBaseMenu: Elementos não encontrados.');
    return;
  }

  menuAnotacoes.classList.toggle('open-annotation'); // Atualiza o ícone e o texto com base no estado do menu

  if (menuAnotacoes.classList.contains('open-annotation')) {
    iconeMenuAnotacoes.setAttribute('data-lucide', 'x');
    vizioon_anotation.innerHTML = 'Fechar Anotações ❌';
    console.log('abrirConfigurcoesBaseMenu: Menu aberto.');
  } else {
    iconeMenuAnotacoes.setAttribute('data-lucide', 'sticker');
    vizioon_anotation.innerHTML = 'Veja Suas Anotações Aqui 🤩!!!';
    console.log('abrirConfigurcoesBaseMenu: Menu fechado.');
  } // Atualiza os ícones, se necessário


  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
} // Função para exibir o alerta com fechamento automático e logs


function showAutoCloseAlert(logs) {
  var timerInterval;
  Swal.fire({
    title: 'Escrevendo seu texto...',
    html: "\n            <div>\n                <p>Aguarde em <b></b> milissegundos.</p>\n                <!-- <textarea class=\"swal2-textarea\" style=\"width:80%;\" id=\"swal2-textarea\" readonly>".concat(logs, "</textarea> -->\n            </div>\n        "),
    timer: 2000,
    heightAuto: false,
    timerProgressBar: true,
    allowOutsideClick: false,
    didOpen: function didOpen() {
      Swal.showLoading();
      var timer = Swal.getPopup().querySelector('b');
      timerInterval = setInterval(function () {
        timer.textContent = "".concat(Swal.getTimerLeft());
      }, 100);
    },
    willClose: function willClose() {
      clearInterval(timerInterval);
    }
  }).then(function (result) {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('showAutoCloseAlert: Alerta fechado pelo timer.');
      abrirConfigurcoesBaseMenu();
    }
  })["catch"](function (error) {
    console.error('showAutoCloseAlert: Erro ao exibir alerta.', error);
  });
} // Função para criar uma anotação


function createAnnotation() {
  var _ref, texto, title, newAnnotation, logs;

  return regeneratorRuntime.async(function createAnnotation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Swal.fire({
            title: 'Crie sua anotação',
            input: 'textarea',
            inputLabel: 'Texto da Anotação',
            inputPlaceholder: 'Digite o texto da anotação aqui...',
            inputAttributes: {
              'aria-label': 'Digite o texto da anotação aqui'
            },
            showCancelButton: true,
            heightAuto: false
          }));

        case 3:
          _ref = _context.sent;
          texto = _ref.value;

          if (texto) {
            console.log('createAnnotation: Texto fornecido para anotação.');
            title = texto.split(' ')[0] || 'Anotação sem título';
            newAnnotation = {
              id: new Date().getTime().toString(),
              title: title,
              Texto: texto
            };
            console.log('createAnnotation: Criando nova anotação.', newAnnotation);
            annotation.save(newAnnotation, function (savedAnnotation) {
              console.log("createAnnotation: Anota\xE7\xE3o salva: ".concat(savedAnnotation.id));
              renderAnnotation(savedAnnotation);
            });
            logs = "\n====== Anota\xE7\xE3o criada com sucesso =====\n\n> ID: ".concat(newAnnotation.id, "\n> T\xEDtulo: ").concat(title, "\n> Texto: ").concat(texto, "\n            ");
            showAutoCloseAlert(logs);
            checkEmptyAnnotationsContainer();
          } else {
            console.log('createAnnotation: Nenhum texto fornecido.');
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('createAnnotation: Erro ao criar anotação.', _context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
} // Adiciona o evento de clique no botão de adicionar anotação


document.querySelector('footer button').addEventListener('click', createAnnotation); // Função para remover uma anotação com confirmação

function removeAnnotation(id) {
  var result;
  return regeneratorRuntime.async(function removeAnnotation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Swal.fire({
            title: 'Você tem certeza?',
            text: "Esta anotação será removida permanentemente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, remover!',
            cancelButtonText: 'Cancelar',
            heightAuto: false
          }));

        case 3:
          result = _context2.sent;

          if (result.isConfirmed) {
            // Se confirmado, encontra e remove a anotação
            annotation.find({
              id: id
            }, function (results) {
              if (results[0]) {
                results[0]["delete"]();
                document.querySelector("[data-id=\"".concat(id, "\"]")).remove();
                console.log("removeAnnotation: Anota\xE7\xE3o removida: ".concat(id)); // Abre o menu após a remoção
                // Exibe um alerta de sucesso após a remoção

                Swal.fire({
                  title: 'Removido!',
                  text: 'A anotação foi removida com sucesso.',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  heightAuto: false
                }).then(function (result) {
                  if (result.isConfirmed) {
                    checkEmptyAnnotationsContainer();
                    Update();
                  }
                });
              } else {
                console.log("removeAnnotation: Anota\xE7\xE3o com ID ".concat(id, " n\xE3o encontrada."));
              }
            });
          } else {
            console.log('removeAnnotation: Remoção da anotação cancelada.');
          }

          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('removeAnnotation: Erro ao remover anotação.', _context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
} // Função para baixar uma anotação como arquivo de texto (.txt)


function downloadAnnotation(annotationItem) {
  var element = document.createElement('a');
  var fileContent = "T\xEDtulo: ".concat(annotationItem.title, "\n\nTexto: ").concat(annotationItem.Texto);
  var blob = new Blob([fileContent], {
    type: 'text/plain'
  });
  element.href = URL.createObjectURL(blob);
  element.download = "".concat(annotationItem.title, ".txt");
  document.body.appendChild(element); // Adiciona temporariamente ao DOM

  element.click(); // Dispara o download

  document.body.removeChild(element); // Remove do DOM
} // Função para filtrar e destacar anotações
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


var comandos = [{
  _acionador: ":clear",
  funcao: limparAnotacoes
}]; // Funções para os comandos

function limparAnotacoes() {
  Swal.fire({
    title: "Deseja Remover Tudo?",
    text: "Essa Ação Não pode ser Revestida",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim , Deletar agora!!!",
    heightAuto: false
  }).then(function (result) {
    if (result.isConfirmed) {
      annotation.drop();
      window.location.reload();
      checkEmptyAnnotationsContainer();
    }
  });
}

var autoScrollEnabled = true; // Função para verificar e executar o comando

function verificarComando(inputValue) {
  var comandoEncontrado = comandos.find(function (comando) {
    return inputValue.startsWith(comando._acionador);
  });

  if (comandoEncontrado) {
    comandoEncontrado.funcao(); // Executa a função associada ao comando

    return true;
  }

  return false;
} // Função principal de filtragem e verificação de comandos


function filterAnnotations(searchTerm) {
  if (verificarComando(searchTerm)) {
    return; // Se um comando foi encontrado e executado, não continua com a filtragem
  }

  var annotations = document.querySelectorAll('.content-box-anotation');
  var searchIcon = document.querySelector('#searcListKeyWord-icon');
  var countFoundResult = document.querySelector('.countFoundResult');
  var matchingElements = []; // Remove qualquer destaque anterior (classe 'highlight')

  annotations.forEach(function (annotation) {
    var textElement = annotation.querySelector('p');

    if (textElement) {
      textElement.innerHTML = textElement.innerHTML.replace(/<\/?span class="highlight">/g, '');
    }
  }); // Divide o termo de pesquisa em múltiplas palavras-chave

  var keywords = searchTerm.trim().toLowerCase().split(/\s+/);
  var found = false;

  if (keywords.length > 0 && searchTerm.trim() !== '') {
    annotations.forEach(function (annotation) {
      var textElement = annotation.querySelector('p');

      if (textElement) {
        var matched = false;
        var highlightedHTML = textElement.innerHTML; // Verifica se qualquer palavra-chave corresponde ao conteúdo

        keywords.forEach(function (keyword) {
          if (textElement.textContent.toLowerCase().includes(keyword)) {
            matched = true;
            var regex = new RegExp("(".concat(keyword, ")"), 'gi');
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
      countFoundResult.classList.remove("d-none");
      countFoundResult.classList.add("d-flex");
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
} // Função para rolar até os elementos encontrados


function scrollToMatchingElements(elements) {
  if (elements.length > 0) {
    elements[0].scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    elements.slice(1).forEach(function (element, index) {
      setTimeout(function () {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, index * 1000);
    });
  }
} // Função para alternar a rolagem automática


function toggleAutoScroll() {
  autoScrollEnabled = (_readOnlyError("autoScrollEnabled"), !autoScrollEnabled);
  var scrollStatus = autoScrollEnabled ? 'Ativada' : 'Desativada';
  alert("Rolagem autom\xE1tica ".concat(scrollStatus));
} // Função para rolar manualmente para os elementos encontrados


function manualScrollToFound() {
  var matchingElements = filterAnnotations(document.querySelector('#searchInput').value);

  if (matchingElements.length > 0) {
    scrollToMatchingElements(matchingElements);
  } else {
    alert('Nenhum item encontrado para rolar.');
  }
} // Função para acionar a filtragem ao clicar no botão


function onSearchButtonClick(event) {
  event.stopPropagation();
  var searchInput = document.querySelector('#searchInput');
  var searchTerm = searchInput.value;
  filterAnnotations(searchTerm);
} // Adiciona o evento de clique no botão de pesquisa


document.querySelector('#searchButton').addEventListener('click', onSearchButtonClick); // Adiciona evento para o campo de pesquisa para filtragem em tempo real

document.querySelector('#searchInput').addEventListener('input', function () {
  var searchTerm = this.value;
  filterAnnotations(searchTerm);
}); // Carrega as anotações existentes do banco de dados e as renderiza

annotation.find({}, function (results) {
  results.forEach(renderAnnotation);
}); // Adiciona o evento de clique no botão de adicionar anotação

document.querySelector('footer button').addEventListener('click', createAnnotation);
document.querySelector('.mudarPosicao').addEventListener('click', function () {
  var sidebar = document.querySelector('.sidebar-menu-Annotation');

  if (sidebar.classList.contains('left')) {
    sidebar.classList.remove('left');
    sidebar.classList.add('right');
  } else {
    sidebar.classList.remove('right');
    sidebar.classList.add('left');
  } // Atualizar a lógica de clique fora ao mudar a posição


  document.addEventListener('click', function (evento) {
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
Update();
checkEmptyAnnotationsContainer();
document.addEventListener('DOMContentLoaded', function () {
  var iconAnnotation = checkEmptyAnnotationsContainer();
  var iconeMenuAnotacoes = document.getElementById("iconAnnotatio");

  if (iconAnnotation) {
    // console.log("Container não está vazio");
    iconeMenuAnotacoes.setAttribute('data-lucide', 'sticker'); // Defina o ícone correto aqui
  } else {
    // console.log("Container está vazio");
    iconeMenuAnotacoes.setAttribute('data-lucide', 'sticky-note'); // Defina o ícone correto aqui
  } // Atualize os ícones para garantir que a nova configuração seja aplicada


  if (typeof lucide !== 'undefined') {
    lucide.createIcons(); // Certifique-se de que lucide está definido e carregado corretamente
  }
});