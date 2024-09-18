// Função para limitar o texto e adicionar "..."
function reduzirTexto(texto, tamanhoMaximo) {
    if (texto.length > tamanhoMaximo) {
        return texto.substring(0, tamanhoMaximo) + '...';
    } else {
        return texto;
    }
}

// Função para verificar se o texto é um parágrafo válido
function validarParagrafo(tema) {
    return tema.trim().length > 0; // Verifica se o tema não está vazio ou só tem espaços
}


// Função para obter o resumo usando a API de forma dinâmica
async function resumoAI(tema, analisarContexto = "", _temperado="completo",_tipo="um estudante leigo", tamanhoTexto = 10, paragrafos = "1 linha", apiUrl = null, apiKey = null) {
    const configuracoes = {
        temperado: _temperado, // completo || detalhado com referência
        tipo: _tipo,
        paragrafos: paragrafos,
        apiKey: apiKey || "AIzaSyBu-iiNt4oFyjwHFnsTXMJatjn7m70gp6I", // Usa uma chave padrão se nenhuma chave for passada
    };

    // const question = `
    //     Analise o Sequinte tema "${analisarContexto}" veja se a palavra ou paragrafo que é esse aqui
    //     input:${tema}
    //     está no contexto.
    //     **Deverao ser Aceitos apenas Resumo no Contexto**
    //     *Analise a seguinte questão : ${configuracoes.temperado}*
    //         - com base nessa analise quero que vc criar o seguinte resumo quando criar se tiver referencia ou detlhes vc coloca os links pra 
    //           acesso.

    //     Faça um resumo sobre **${tema}** ${configuracoes.temperado} para ${configuracoes.tipo}.
    //     !importante - Os resumos devem ter no mínimo ${configuracoes.paragrafos}, não pode passar disso.
    //     se passar, encerre logo.

    //     *Observações obrigatórias*:
    //     1 - Não sair do contexto.
    //     2 - Não é permitido falar de outra coisa, apenas o conteúdo solicitado.
        
    //     !Importante: todo resumo deve ser colocado aqui: """ resumo que você fez """. 
       
    // `;

    
    const question = `
        Analise o seguinte tema "${analisarContexto}" e veja se a palavra ou parágrafo fornecido abaixo está no contexto:

        **Entrada:** ${tema}

        **Instruções:**
        - Caso não seja um paragrafo diga e não esteja no contexto faça um texto amigavel <p class="removerMenu">Ex:Você precisa inserir mais de uma paragrafo para que eu possa analisar o contexto e gerar um resumo sobre "${tema}".</p> 
        - Caso ele selecione menor que 3 palavras faça um texto aqui diz que ele precia selecionar mais de 3 palavras <p class="removerMenu">Ex:Você precisa inserir mais de uma palavra para que eu possa analisar o contexto e gerar um resumo sobre "${tema}".</p> 
        - Caso ele selecione 1 unica palavra mesmo que teja no contexto ele não pode selecionar apenas 1 palavra faça um texto aqui diz que ele precia selecionar mais de 1 palavra <p class="removerMenu"> Ex:Você precisa inserir mais de uma palavra para que eu possa analisar o contexto e gerar um resumo sobre "${tema}".</p> 

        - Apenas resumos **relevantes ao contexto** devem ser aceitos.
        - Com base nessa análise, crie um resumo **${configuracoes.temperado}**.
        - Caso haja referências ou detalhes importantes, insira os links no formato sugerido.

        Exemplo de Links:
        - <a target="_blank" href="https://exemplo1.com">https://exemplo1.com</a>
        - <a target="_blank" href="https://exemplo2.com">https://exemplo2.com</a>

        Faça um resumo sobre **"${tema}"** com o estilo **${configuracoes.temperado}** para **${configuracoes.tipo}**.

        **Importante:**
        - O resumo deve ter no mínimo **${configuracoes.paragrafos}**. Caso o texto ultrapasse esse limite, finalize o resumo imediatamente.

        **Observações obrigatórias:**
        1. Mantenha-se no contexto.
        2. Não inclua conteúdo irrelevante ao tema solicitado.

        **Formato do Resumo:**
        O resumo deve ser inserido no seguinte formato:
        """
        resumo que você fez
        """
    `;

    const dynamicApiUrl = apiUrl || `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${configuracoes.apiKey}`;

    const data = {
        contents: [
            {
                parts: [
                    { text: question }
                ]
            }
        ]
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        // Mostrando o loader enquanto o resumo está sendo gerado
        document.querySelector('.render-resumo-result').innerHTML = "";
        document.getElementById('loading-resumo').style.display = 'block';

        // Fazendo a requisição POST usando fetch e aguardando a resposta
        const response = await fetch(dynamicApiUrl, requestOptions);
        // const response = [{}]

        // Verificando se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const temaReduzido = reduzirTexto(tema, tamanhoTexto);

        // Extraindo e processando a resposta em JSON
        const responseData = await response.json();

        // Extraindo o texto do resumo gerado pela API
        const resumo = responseData.candidates[0].content.parts[0].text;

        // Regex para extrair o conteúdo entre aspas triplas
        const regex = /"""([\s\S]*)"""/;
        const matches = resumo.match(regex) ? resumo.match(regex)[1] : resumo;

        // Escondendo o loader
      
        // Exibindo o resumo no lugar correto dentro da estrutura HTML
        document.querySelector('.render-resumo-result').innerHTML = `
        <div class="result-resumo-items">
                                        
            <span class=" title img-back-resumo d-flex flex-column border border-2 bg-dark text-light p-2 rounded justify-content-center align-items-center">${temaReduzido}
                                    <span
                                        class="items-action-btn-ai w-100 gap-2 justify-content-center align-items-center" style="display:flex">
                                        <button
                                            class="btn btn-warning btn-dowload-resposta"><svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24" height="24"
                                                viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="lucide lucide-arrow-down-to-line"><path
                                                    d="M12 17V3" /><path
                                                    d="m6 11 6 6 6-6" /><path
                                                    d="M19 21H5" /></svg></button>
                                        <div class="btn-group">
                                                            <button
                                                                id="btn-reprocessar-resposta"
                                                                class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    class="lucide lucide-settings-2"><path
                                                                        d="M20 7h-9" /><path
                                                                        d="M14 17H5" /><circle
                                                                        cx="17"
                                                                        cy="17"
                                                                        r="3" /><circle
                                                                        cx="7"
                                                                        cy="7"
                                                                        r="3" /></svg></button>
                                                            <ul
                                                                class="dropdown-menu reflow-items dropdown-menu-dark">
                                                                <li><a
                                                                        class="dropdown-item reflow-item-ai"
                                                                        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg> Com Detalhamento</a></li>
                                                                        <hr
                                                                        class="dropdown-divider">
                                                                <li><a
                                                                        class="dropdown-item reflow-item-ai"
                                                                        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg> Com Referências</a></li>
                                                            </ul>
                                                        </div>

                                        <button id="btn-salvar-historico"
                                            class="btn btn-info"><svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24" height="24"
                                                viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="lucide lucide-folder-clock"><circle
                                                    cx="16" cy="16"
                                                    r="6" /><path
                                                    d="M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2" /><path
                                                    d="M16 14v2l1 1" /></svg></button>
                                    </span>
                                </span>
               <div class="mt-3 avatar-container d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex gap-2 align-items-center">
                        <img class="rounded-circle"
                             style="width: 40px;"
                             alt="Avatar"
                             src="./assets/eva.jpg" />
                        <span><strong class="text-success border border-2 border-success p-1 rounded">Eva Respondeu :</strong></span>
                    </div>
                    <span><strong class="data-generacao">00/00/000</strong></span>
                </div>
            <p class="mt-1">${matches}</p>
            </div>
        `;

        document.getElementById('loading-resumo').style.display = 'none';
      

        const data = document.querySelector('.data-generacao');

        if (data) {
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '/' + mm + '/' + yyyy;
            data.innerHTML = `${formattedToday}`
        }

        // Configurando os botões de ação (download e salvar no histórico)
        document.querySelector('.btn-dowload-resposta').addEventListener('click', () => downloadResumo(matches));
        document.getElementById('btn-salvar-historico').addEventListener('click', () => salvarHistoricoResumo(tema, matches));

        // paramentros para dar o reflow na AI
        reflowAI(".reflow-items",tema,analisarContexto)

        const noneToolbar = document.querySelector(".removerMenu");
        if(noneToolbar){
            const toolbarActions = document.querySelector(".items-action-btn-ai");
            toolbarActions.style.display = "none";
        }else{
            const toolbarActions = document.querySelector(".items-action-btn-ai");
            toolbarActions.style.display = "flex";
        }

     
        return resumo;


    } catch (error) {
        // Escondendo o loader em caso de erro
        document.getElementById('loading-resumo').style.display = 'none';
        console.error('Erro:', error);
        document.querySelector('.render-resumo-result').innerHTML = `Erro ao gerar o resumo: ${error.message}`;
    }
}



// Função para realizar o download do resumo
function downloadResumo(resumo, nomeArquivo = 'resumo.txt') {
    const blob = new Blob([resumo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
}

function reflowAI(_class,tema, analisarContexto = ""){

   const reflow =  document.querySelector(_class);

   const reflowItems = reflow.querySelectorAll("li > a");
   reflowItems.forEach(btn => {
        btn.addEventListener("click",function(event){
            // console.log(event.target.innerText)
            // console.log(tema, analisarContexto)

            const prompt = event.target.innerText.trim();
            // console.log(prompt)

            if(prompt === "Com Referências"){
                resumoAI(tema,analisarContexto,"Faça com links e Referenicas pra me clicar gera no minimo 10 links em forma de lista enumerada","Universitario",10,"1 linhas").then(resumo => {
                    soundBipe()
                    // console.log('Resumo retornado:', resumo);
                });
            }else if(prompt === "Com Detalhamento"){
                resumoAI(tema,analisarContexto,"Faça um Resumo detalhado","Universitario avançado",10,"3 paragrafos").then(resumo => {
                    soundBipe()
                    // console.log('Resumo retornado:', resumo);
                });
            }

           

        })
   });

};




