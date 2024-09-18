function soundBipe(sound=""){

    function tocarSom(metadados){
        const silentAudio =  new Audio(`${metadados.path}/${sound === "" ? metadados.audio : sound}`);
        silentAudio.muted = false; // Som mudo
        silentAudio.play().then(() => {
            // console.log("Áudio habilitado.");
        }).catch(error => {
            console.error('Erro ao tentar habilitar o áudio:', error);
        });
    }
    
    $.ajax({
        url: "./sounds/soundConfig.json",
        method: "GET",
        cache: false,
        success: (data) => {
            if (Array.isArray(data) && data.length !== "") {
                const audio = data
                    .map((audio, index) => (audio.id === "som-ai-notify" ? audio : null))
                    .filter(audio => audio !== null);
    
                const metadados = Object.assign({}, ...audio);
                // Solicita que o usuário interaja com a página
                if (metadados.ativar) {
                    tocarSom(metadados);
                }
    
            } else {
                Swal.fire({
                    icon: "error",
                    title: `Erro audio sintetizado Vazio`,
                    heightAuto: false,
                    footer: `<a href="#" onclick="">você acha que isso é um erro? @suporte</a>`
                });
            }
        },
        error: (error) => {
            Swal.fire({
                icon: "error",
                title: `Erro audio Notify não Encontrado...`,
                heightAuto: false,
                footer: `<a href="#" onclick="">você acha que isso é um erro? @suporte</a>`
            });
            console.error('Erro:', error);
        }
    });
}