// Espera o HTML carregar
document.addEventListener("DOMContentLoaded", function() {

    // --- (Seu código do menu mobile, se estiver aqui) ---
    
    // --- CÓDIGO DO FORMULÁRIO ---
    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("form-status");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const formData = new FormData(form);

        // (Seu console.log para testar)
        console.log("Formulário a ser enviado:");
        for (let [key, value] of formData.entries()) {
            console.log(key + ":", value);
        }

        // Envia os dados para o Formspree
        fetch("https://formspree.io/f/xqawzqek", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // --- ISSO É O QUE VOCÊ PRECISA ADICIONAR (SUCESSO) ---
                statusMessage.innerHTML = "Obrigado! A sua mensagem foi enviada.";
                statusMessage.className = "success"; // Adiciona a classe .success
                form.reset();

                // Faz a mensagem sumir depois de 3 segundos
                setTimeout(() => {
                    statusMessage.innerHTML = "";
                    statusMessage.className = ""; // Limpa a classe
                }, 3000); 
                // ---------------------------------------------------

            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        statusMessage.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        statusMessage.innerHTML = "Ups! Algo deu errado ao enviar.";
                    }
                    
                    // --- ISSO É O QUE VOCÊ PRECISA ADICIONAR (ERRO) ---
                    statusMessage.className = "error"; // Adiciona a classe .error

                    // Faz a mensagem sumir depois de 5 segundos
                    setTimeout(() => {
                        statusMessage.innerHTML = "";
                        statusMessage.className = ""; // Limpa a classe
                    }, 5000);
                    // -------------------------------------------------
                })
            }
        })
        .catch(error => {
            statusMessage.innerHTML = "Ups! Algo deu errado ao enviar.";
            
            // --- ISSO É O QUE VOCÊ PRECISA ADICIONAR (ERRO DE REDE) ---
            statusMessage.className = "error"; // Adiciona a classe .error

            // Faz a mensagem sumir depois de 5 segundos
            setTimeout(() => {
                statusMessage.innerHTML = "";
                statusMessage.className = ""; // Limpa a classe
            }, 5000);
            // -------------------------------------------------------
        });
    });
});