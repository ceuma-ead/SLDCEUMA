// Função para limitar o texto e adicionar "..."
function reduzirTexto(texto, tamanhoMaximo) {
    if (texto.length > tamanhoMaximo) {
        return texto.substring(0, tamanhoMaximo) + '...';
    } else {
        return texto;
    }
}

// Função para obter o resumo usando a API de forma dinâmica
async function resumoAI(tema, tamanhoTexto = 8, paragrafos = "1 linha", apiUrl = null, apiKey = null) {
    const configuracoes = {
        temperado: "completo", // completo || detalhado com referência
        tipo: "um estudante leigo",
        paragrafos: paragrafos,
        apiKey: apiKey || "AIzaSyBu-iiNt4oFyjwHFnsTXMJatjn7m70gp6I", // Usa uma chave padrão se nenhuma chave for passada
    };

    const question = `
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
        document.querySelector('.render-resumo-result').style.display = 'none';
        
        document.getElementById('loading-resumo').style.display = 'block';

        // Fazendo a requisição POST usando fetch e aguardando a resposta
        const response = await fetch(dynamicApiUrl, requestOptions);

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
        document.querySelector('.render-resumo-result').style.display = 'block';
        // Escondendo o loader
        document.getElementById('loading-resumo').style.display = 'none';

        // Exibindo o resumo no lugar correto dentro da estrutura HTML
        document.querySelector('.render-resumo-result').innerHTML = `
            <span>${temaReduzido}
                <span class="w-100">
                    <button class="btn btn-warning btn-dowload-resposta"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg></button>
                    <button id="btn-reprocessar-resposta" class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waypoints"><circle cx="12" cy="4.5" r="2.5"/><path d="m10.2 6.3-3.9 3.9"/><circle cx="4.5" cy="12" r="2.5"/><path d="M7 12h10"/><circle cx="19.5" cy="12" r="2.5"/><path d="m13.8 17.7 3.9-3.9"/><circle cx="12" cy="19.5" r="2.5"/></svg></button>
                    <button id="btn-salvar-historico" class="btn btn-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-clock"><circle cx="16" cy="16" r="6"/><path d="M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2"/><path d="M16 14v2l1 1"/></svg></button>
                    
                </span>
            </span>
            <p>${matches}</p>
        `;

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

// Função para salvar o histórico de resumos (simulação usando localStorage)
function salvarHistoricoResumo(tema, resumo) {
    const historicoAtual = JSON.parse(localStorage.getItem('historicoResumos')) || [];
    
    const novoResumo = {
        tema: tema,
        resumo: resumo,
        data: new Date().toLocaleString()
    };

    // Adiciona o novo resumo ao histórico atual
    historicoAtual.push(novoResumo);

    // Salva novamente no localStorage
    localStorage.setItem('historicoResumos', JSON.stringify(historicoAtual));

    console.log("Resumo salvo no histórico:", novoResumo);
}


