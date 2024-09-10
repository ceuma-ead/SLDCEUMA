
// Função assíncrona para fazer uma requisição para os dados dicionario
async function requisicao(dados) {
    try {

        const script = dados.map((item) => {
            return {
                "_ativo": item.ativo,
                "_servidor": item.servidor,
                "_script": item.script
            }
        })
        script.forEach(dicionario => {
            $.ajax({
                url: dicionario._script,
                method: "GET",
                cache: false,
                success: (data) => { },
                error: (error) => {
                    console.error('Erro:', error);
                    $('#result').html('<p>Erro ao carregar os dados</p>');
                }
            });
        });

    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

// Função para carregar dados do servidor 
function servidores() {
    $.ajax({
        url: "./modules/dicionario.json",
        method: "GET",
        cache: false,
        success: (data) => {

            const dicionarioServido = localStorage.getItem("dicionario-servido");
            const servidor = data.filter((servidorInfo) => servidorInfo.servidor === dicionarioServido);
            requisicao(servidor); // Carrega os dados do dicionário selecionado
        },
        error: (error) => {
            console.error('Erro:', error);
            $('#result').html('<p>Erro ao carregar os dados</p>');
        }
    });
}


function renderizarDicionario() {
    $.ajax({
        url: "./modules/config.json",
        method: "GET",
        cache: false,
        success: (data) => {

            const _dicionarioModules = data.dicionario

            Object.values(_dicionarioModules).length === 0 ? _dicionarioModules = {

                "ativo": true,
                "dicionario": "dicio",
                "menu_dicionario": true

            } : _dicionarioModules;

            if (data && _dicionarioModules) {

                if (_dicionarioModules.ativo) {

                    localStorage.setItem("dicionario-servido", _dicionarioModules.dicionario);
                    servidores();
                    
                }else{
            
                    $("#result-dicionario").html(`
                        <div class="d-flex align-content-center flex-column justify-content-center w-100 h-100 align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                            <p style="color:#000;" class="text-center">Peça para o administrador Ativar o Modulo de Dicionario...</p>
                        </div>         
                    `);
                    
                };
            }

            return data;

        },
        error: (error) => {
            Swal.fire({
                icon: "error",
                title: `Erro Json Desativada`,
                heightAuto: false,
                footer: `<a href="#" onclick="">você acha que isso é um erro ? @suporte</a>`
            });
            console.error('Erro:', error);
        }
    });
};


renderizarDicionario();
