const responsivo = [
    {   
        // Onde o Estilo tem que aparecer 
        // "Tipo":"All",
        "Tipo":1,
        // Que tipo de quebra Tem que Fazer
        "media" : "@media screen and (max-width: 1366px)",
        // Estilos que podem vim adcionais
        "synchronous" : `
             .pagina-tipo-texto--box-texto p{
                    font-size: 0.5rem ;
                    background-color: aqua;
             }
        `,
        // Atualizção Forçada onde ele tá aparecendo usando o 
        // document.documentElement.style.setProperty([nome da variavel css],valor da Variavel);

        "variantes":`
            --font-para-paragrafos=[1rem]
        `,
    }
];

function responsivePage(slideIndex){
    const pageData = api[slideIndex];

    // veificar se a página está usando a configuração All ou Passando a pgian com estilo especifico

    // Pagina para Exibir Estilos
    const idPage = pageData.pagina;
    
    //verificar se é Todos ou se é unicodeBidi: 
    
    responsivo.forEach(responsivo => {
        
        // verificar se o Estilo é pra todos 

        // se For Exibir e aplicar para Todos
        if(responsivo.Tipo === "All"){
            // ...
        }
        // senão for Aplicar so para a pagina Especificada
        else{
            
            if(responsivo.Tipo === idPage){
                // console.log("Estamos na Página..")

                const variavel = responsivo.variantes
                
                
            }else{
                // console.log("Página Diferente...")

            }
        }

    });

}

// Chama a função responsiva para o slide atual
responsivePage(savedPosition);
