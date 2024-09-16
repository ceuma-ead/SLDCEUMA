// Função para obter o resumo usando a API
async function resumoAI(tema) {
    const configuracoes = {
        temperado: "completo", // completo || detalhado com referência
        tipo: "um estudante leigo",
        paragrafos: "3 parágrafos", // 2 parágrafos || 4 parágrafos
        apiKey: "AIzaSyBu-iiNt4oFyjwHFnsTXMJatjn7m70gp6I" // Certifique-se de proteger sua chave de API
    };

    const question = `
        Faça um resumo sobre **${tema}** ${configuracoes.temperado} para ${configuracoes.tipo}.
        
        *Observações obrigatórias*:
        1 - Não sair do contexto.
        2 - Não é permitido falar de outra coisa, apenas o conteúdo solicitado.
        3 - Os resumos devem ter no mínimo ${configuracoes.paragrafos}, não pode passar disso.
        
        *Caso algum desses itens seja burlado*:
        1 - Informe ao usuário que você é um assistente pessoal do Ceuma para resumos.
        
        !Importante: todo resumo deve ser colocado aqui: """ resumo que você fez """. 
    `;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${configuracoes.apiKey}`;

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
        document.getElementById('loading-resumo').style.display = 'block';

        // Fazendo a requisição POST usando fetch e aguardando a resposta
        const response = await fetch(apiUrl, requestOptions);

        // Verificando se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        // Extraindo e processando a resposta em JSON
        const responseData = await response.json();

        // Extraindo o texto do resumo gerado pela API
        const resumo = responseData.candidates[0].content.parts[0].text;

        // Escondendo o loader
        document.getElementById('loading-resumo').style.display = 'none';

        // Exibindo o resumo no lugar correto dentro da estrutura HTML
        document.querySelector('.render-resumo-result').innerHTML = `
            <span>Resumo de ${tema}
                <span class="w-100">
                    <button class="btn btn-warning btn-dowload-resposta"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg></button>
                    <button id="btn-reprocessar-resposta" class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waypoints"><circle cx="12" cy="4.5" r="2.5"/><path d="m10.2 6.3-3.9 3.9"/><circle cx="4.5" cy="12" r="2.5"/><path d="M7 12h10"/><circle cx="19.5" cy="12" r="2.5"/><path d="m13.8 17.7 3.9-3.9"/><circle cx="12" cy="19.5" r="2.5"/></svg></button>
                </span>
            </span>
            <p>${resumo}</p>
        `;
        return resumo;
    } catch (error) {
        // Exibindo qualquer erro que ocorra durante a requisição e escondendo o loader
        document.getElementById('loading-resumo').style.display = 'none';
        console.error('Erro:', error);
        document.querySelector('.render-resumo-result').innerHTML = `Erro ao gerar o resumo: ${error.message}`;
    }
}



// Chamada da função para teste
// resumoAI('Guerra Fria').then(resumo => {
//     console.log('Resumo retornado:', resumo);
// });
