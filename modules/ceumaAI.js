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

        // Exibindo o resumo no console e na página
        // console.log('Resumo gerado:', resumo);
        // document.getElementById('response').textContent = resumo; // Exibindo na página
        return resumo;
    } catch (error) {
        // Exibindo qualquer erro que ocorra durante a requisição
        console.error('Erro:', error);
        // document.getElementById('response').textContent = `Erro ao gerar o resumo: ${error.message}`;
    }
}

// Chamada da função para teste
// resumoAI('Guerra Fria').then(resumo => {
//     console.log('Resumo retornado:', resumo);
// });
