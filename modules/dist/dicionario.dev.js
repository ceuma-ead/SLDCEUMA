"use strict";

$(document).ready(function () {
  // Função assíncrona para fazer uma requisição usando fetch
  function requisicao(dados) {
    var script;
    return regeneratorRuntime.async(function requisicao$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            script = dados.map(function (item) {
              return {
                "_ativo": item.ativo,
                "_servidor": item.servidor,
                "_script": item.script
              };
            });
            script.forEach(function (dicionario) {
              $.ajax({
                url: dicionario._script,
                method: "GET",
                cache: false,
                success: function success(data) {},
                error: function error(_error) {
                  console.error('Erro:', _error);
                  $('#result').html('<p>Erro ao carregar os dados</p>');
                }
              });
            });
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.error('Erro:', _context.t0);
            return _context.abrupt("return", null);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  } // Função para carregar dados do servidor usando AJAX com jQuery


  function servidores() {
    $.ajax({
      url: "./modules/dicionario.json",
      method: "GET",
      cache: false,
      success: function success(data) {
        // const select = $(".servidores");
        // // Preenche o select com opções de servidores
        // select.html(
        //     data.map((items) => {
        //         return `<option value="${items.servidor}">${items.servidor}</option>`;
        //     })
        // );
        // Verifica se há um servidor salvo no localStorage~
        localStorage.setItem("dicionario-servido", "dicio");
        var dicionarioServido = localStorage.getItem("dicionario-servido"); // if (dicionarioServido) {
        //     select.val(dicionarioServido);
        // }
        // Filtra e carrega os dados do servidor atual
        // const servidor = data.filter((servidorInfo) => servidorInfo.servidor === select.val());

        var servidor = data.filter(function (servidorInfo) {
          return servidorInfo.servidor === dicionarioServido;
        }); // console.log('Servidor atual:', servidor);
        // Atualiza o servidor ao mudar a seleção
        // select.change(function () {
        //     const selectedServidor = $(this).val();
        //     localStorage.setItem("dicionario-servido", selectedServidor); // Salva o servidor no localStorage
        //     const novoServidor = data.filter((servidorInfo) => servidorInfo.servidor === selectedServidor);
        //     window.location.reload();
        //     // console.log('Servidor selecionado:', novoServidor);
        //     // Você pode realizar outras ações com os dados do servidor aqui.
        // });

        requisicao(servidor);
      },
      error: function error(_error2) {
        console.error('Erro:', _error2);
        $('#result').html('<p>Erro ao carregar os dados</p>');
      }
    });
  } // Executa a função para carregar os servidores


  servidores();
});