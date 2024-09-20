// // Criar um Renderizador de Scripts e Links na página
// function renderScript(path =
//     "./render_links.json"
// ) {
//     // Modulo Convertido
//     var _path = String(path)
//     /** path(string)
//      * 
//      */
//     $.ajax({
//         method: "GET",
//         url: _path,
//         contentType: "application/json",
//         dataType: "json",
//         // Resposta do Conteudo...
//         success: (conteudo) => {
//             // Analise de Dados Volumentricos
//             var test = [];
//             let contador_tentativas = parseInt(localStorage.getItem("numero_erros")) ? localStorage.getItem("numero_erros") : 0;

//             if (conteudo.length === 0) {

//                 if (contador_tentativas < 1) { // Conexão com Servidor <1>
//                     Swal.fire({
//                         title: "Tantando Servidor <01>",
//                         text: "Aguarde Testando Servidor...",
//                         timer: 2000,
//                         timerProgressBar: true,
//                         allowOutsideClick: false,
//                         allowEscapeKey: false,
//                         icon: "question",
//                         didOpen: () => {
//                             Swal.showLoading();
//                         }
//                     }).then((result) => {
//                         /* Read more about handling dismissals below */
//                         if (result.dismiss === Swal.DismissReason.timer) {
//                             Swal.close()
//                         }
//                     });

//                     // alert(contador_tentativas)
//                     const armazenar_local = localStorage.setItem("numero_erros", parseInt(contador_tentativas) + parseInt(1))
//                 } else if (contador_tentativas < 2) { // Conexão com Servidor <2>
//                     Swal.fire({
//                         title: "Tentando Servidor <02>",
//                         text: "Aguarde Testando Servidor...",
//                         timer: 2000,
//                         timerProgressBar: true,
//                         allowOutsideClick: false,
//                         allowEscapeKey: false,
//                         icon: "question",
//                         didOpen: () => {
//                             Swal.showLoading();
//                         }
//                     }).then((result) => {
//                         /* Read more about handling dismissals below */
//                         if (result.dismiss === Swal.DismissReason.timer) {
//                             Swal.close()
//                         }
//                     });

//                     const armazenar_local = localStorage.setItem("numero_erros", parseInt(contador_tentativas) + parseInt(1))
//                 } else {

//                     const erro = {
//                         status: 204,
//                         statusText: "Array Vazia",
//                         responseText: `
// o Conteudo da Array "conteudo" está Vazio
// ->[]
// ->Sem Processamento de Informações.
                            
//                         `
//                     };
//                     const _encodErro = encodeURIComponent(JSON.stringify(erro));

//                     Swal.fire({
//                         icon: "error",
//                         title: `Opps... Sevidores Indisponiveis 😟`,
//                         text: `Código do Erro: Pacote<Vazios>`,
//                         footer: `<a href="#" onclick="analiseErro('${_encodErro}')">Baixar Analise de Erro</a>`
//                     });
//                 };

//             } else {
//                 // Criar Links Do tipo Scripts | Links
//                 // console.log(conteudo);
//                 // Ordena os recursos pela propriedade `index`
//                 conteudo.sort((a, b) => a.index - b.index);

//                 conteudo.forEach(resource => {
//                     let elementString = '';

//                     if (resource.anchor === "link") {
//                         elementString += `<link rel="stylesheet" ${
//                             resource._regx ? "type='text/css'" : ""
//                         } href="${resource._ref}"`;

//                         // Adicionar atributos personalizados, se existirem
//                         if (resource._regx) {
//                             const regxParts = resource._regx.split('|');
//                             regxParts.forEach(part => {
//                                 const [attr, value] = part.trim().split('=');
//                                 if (attr && value) {
//                                     elementString += ` ${attr}="${value.replace(/'/g, '')}"`;
//                                 }
//                             });
//                         }

//                         elementString += '>';
//                     } else if (resource.anchor === "script") {
//                         elementString += `<script src="${resource._ref}"`;

//                         // Adicionar atributos personalizados, se existirem
//                         if (resource._regx) {
//                             const regxParts = resource._regx.split('|');
//                             regxParts.forEach(part => {
//                                 const [attr, value] = part.trim().split('=');
//                                 if (attr && value) {
//                                     elementString += ` ${attr}="${value.replace(/'/g, '')}"`;
//                                 }
//                             });
//                         }

//                         elementString += '></script>';
//                     }

//                     // Adicionar o elemento ao documento na posição correta dentro do elemento pai
//                     if (elementString) {
//                         const parent = document.querySelector(resource.elemento);
//                         if (parent) {
//                             if (resource.position === "before") {
//                                 parent.insertAdjacentHTML('afterbegin', elementString); // Dentro do elemento pai, antes do primeiro filho
//                             } else if (resource.position === "after") {
//                                 parent.insertAdjacentHTML('beforeend', elementString); // Dentro do elemento pai, após o último filho
//                             }
//                         }
//                     }
//                 });

//             };

//         },
//         error: (erro) => {
//             // Debug
//             // console.log(erro)
//             // Encode -> Uri Para Error / Status
//             const _encodErro = encodeURIComponent(JSON.stringify(erro))
//             // console.log(_encodErro)

//             Swal.fire({
//                 icon: "error",
//                 title: `Opps... ${erro.status}`,
//                 text: `Código do Erro: ${erro.statusText}`,
//                 footer: `<a href="#" onclick="analiseErro('${_encodErro}')">Baixar Analise de Erro</a>`
//             });
//         }
//     });
// };



// $(document).ready(function () {
//     renderScript("./render_links.json")
// });