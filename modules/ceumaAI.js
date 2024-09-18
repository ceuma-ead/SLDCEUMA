// Função para limitar o texto e adicionar "..."
function reduzirTexto(texto, tamanhoMaximo) {
    if (texto.length > tamanhoMaximo) {
        return texto.substring(0, tamanhoMaximo) + '...';
    } else {
        return texto;
    }
}







// Função para obter o resumo usando a API de forma dinâmica
async function resumoAI(tema, analisarContexto = "", tamanhoTexto = 10, paragrafos = "1 linha", apiUrl = null, apiKey = null) {
    const configuracoes = {
        temperado: "completo", // completo || detalhado com referência
        tipo: "um estudante leigo",
        paragrafos: paragrafos,
        apiKey: apiKey || "AIzaSyBu-iiNt4oFyjwHFnsTXMJatjn7m70gp6I", // Usa uma chave padrão se nenhuma chave for passada
    };

    const question = `
        Analise o Sequinte tema "${analisarContexto}" veja se a palavra ou paragrafo que é esse aqui
        input:${tema}
        está no contexto.
        **Deverao ser Aceitos apenas Resumo no Contexto**

        Faça um resumo sobre **${tema}** ${configuracoes.temperado} para ${configuracoes.tipo}.
        !importante - Os resumos devem ter no mínimo ${configuracoes.paragrafos}, não pode passar disso.
        se passar, encerre logo.

        *Observações obrigatórias*:
        1 - Não sair do contexto.
        2 - Não é permitido falar de outra coisa, apenas o conteúdo solicitado.
        
        !Importante: todo resumo deve ser colocado aqui: """ resumo que você fez """. 
       
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
        ''
        // Regex para extrair o conteúdo entre aspas triplas
        const regex = /"""([\s\S]*)"""/;
        const matches = resumo.match(regex) ? resumo.match(regex)[1] : resumo;

        // Escondendo o loader
        document.getElementById('loading-resumo').style.display = 'none';

        // Exibindo o resumo no lugar correto dentro da estrutura HTML
        document.querySelector('.render-resumo-result').innerHTML = `
        <div class="result-resumo-items">
          <div
                                                class="avatar-container d-flex justify-content-between align-items-center mb-3">
                                                <div
                                                    class="d-flex gap-2 align-items-center">
                                                    <img class="rounded-circle"
                                                        style="width: 40px;"
                                                        alt="Avatar"
                                                        src="./assets/eva.jpg" />
                                                    <span><strong
                                                            class="text-success border border-2 border-success p-1 rounded">Eva
                                                            Respondeu
                                                            :</strong></span>
                                                </div>
                                                <span><strong
                                                        class="data-generacao">00/00/000</strong></span>
                                            </div>
            <span class=" title img-back-resumo d-flex flex-column border border-2 bg-dark text-light p-2 rounded justify-content-center align-items-center">${temaReduzido}
                                    <span
                                        class="w-100 d-flex gap-2 justify-content-center align-items-center">
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
                                        <button id="btn-reprocessar-resposta"
                                            class="btn btn-success"><svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24" height="24"
                                                viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="lucide lucide-settings-2"><path
                                                    d="M20 7h-9" /><path
                                                    d="M14 17H5" /><circle
                                                    cx="17" cy="17"
                                                    r="3" /><circle cx="7"
                                                    cy="7"
                                                    r="3" /></svg></button>
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
            <p class="mt-1">${matches}</p>
            </div">
        `;

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



