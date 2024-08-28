const responsivo = [
    {
        "screen_small" : "@media screen and (max-width: 1366px)",
        "synchronous" : `
             .pagina-tipo-texto--box-texto p{
                    font-size: 0.1rem ;
                    background-color: aqua;
             }
        `,
        "variantes":`
            --font-para-paragrafos=[1rem]
        `,
        "pagina":1, // Opcional se não existe fica para todas as paginas
        
    }
]

