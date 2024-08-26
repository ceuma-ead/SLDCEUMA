
function analiseErro(erro){
    const _erro = erro
    const decodErro = JSON.parse(decodeURIComponent(_erro))
    // console.log(decodErro)

    const erro_logs = `
<Erro Status>:${decodErro.status}
-> Tipo de Erro: ${decodErro.statusText}
----------------------------
Oq Aconteceu?😟
----------------------------
${decodErro.responseText}
----------------------------
Enviar para o Suporte:
-********************-
>> suporte.cead@ceuma.br <<

    `;

    // Criar Link Temporario
    const blob = new Blob([erro_logs],{type:"text/plain"});
    const _url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = _url;
    link.download = `codigo_erro_${Math.random() * 4000}.txt`
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link);

}