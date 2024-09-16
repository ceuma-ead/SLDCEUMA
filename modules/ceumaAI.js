// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const targetUrl = 'https://www.blackbox.ai/api/chat';

// const configuracoes = {
//     temperado:"pessoa leiga", // pessoa leiga || completo || detalhado com referencia.
//     token:"2 parafragos", // 2 parafragos || 4 parafrafos
// }

// const question = `
// Por favor, um resumo do Tipo 
// Aguardo o código completo. Obrigado!
// `

// function Question(question) {
//     return question
// }
// const questao = Question(question)

// const data = {
//     messages: [{ "content": questao, "role": "user" }],
//     previewToken: null,
//     userId: "6e75da85-5501-4825-ae6b-cd19543d582c",
//     codeModelMode: true,
//     agentMode: {},
//     trendingAgentMode: {},
//     isMicMode: false,
//     isChromeExt: false,
//     githubToken: null
// };



// const headers = {
//     "Content-Type": "application/json",
//     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//     "Date": "Tue, 09 Apr 2024 20:26:03 GMT",
//     "Transfer-Encoding": "chunked",
//     "Connection": "keep-alive",
//     "CF-Ray": "871d3add5d4779f1-GIG",
//     "CF-Cache-Status": "DYNAMIC",
//     "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
//     "Content-Encoding": "gzip",
//     "Set-Cookie": "sessionId=eda2d978-14ca-40c0-8b9d-8fea4d07bf98; Path=/; Expires=Sun, 08 Apr 2029 20:26:03 GMT",
//     "Vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url, Accept-Encoding",
//     "rndr-id": "9f3df134-ca16-458d",
//     "token":"6ec7012d8fddbd14afd5726e53e47c24f95f34d694d06c0c95b531b0cabd6bb6%7C82c98c7d8c04c168ef28ce4727439f2a71ad755b043dc3ca00357e469307cf74; __Secure-authjs.callback-url=https%3A%2F%2Fwww.blackbox.ai; intercom-id-jlmqxicb=94e3ca8c-9cbf-4b20-8f18-7dea615993d8; intercom-session-jlmqxicb=; intercom-device-id-jlmqxicb=8dad2d13-0ad9-4eca-821d-1a030d01a314",
//     "x-powered-by": "Next.js",
//     "x-render-origin-server": "Render",
//     "Server": "cloudflare",
//     "alt-svc": "h3=\":443\"; ma=86400",
//     "Origin": "http://127.0.0.1:5500", // ou substitua pelo seu domínio
//     "X-Requested-With": "XMLHttpRequest"
// };


// fetch(proxyUrl + targetUrl, {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(data)
// })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Erro na requisição: ' + response.statusText);
//         }
//         return response.text();
//     })
//     .then(responseText => {


//         // console.log(responseText)

//         // Expressão regular para extrair o conteúdo dentro das marcações """ ... """
//         const regex = /"""([\s\S]*)"""/;
//         const matches = responseText.match(regex);

//         if (matches && matches.length > 1) {
//             const codigoHTMLCSS = matches[1];
//             console.log(codigoHTMLCSS)
            
//         } else {
//             console.log('Não foi possível encontrar o código dentro das marcações """ ... """');
//         }

//     })
//     .catch(error => {
       
//         console.error('Erro na requisição:', error);
//     });


// 


