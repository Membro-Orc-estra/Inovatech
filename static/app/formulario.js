document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("form-status");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const formData = new FormData(form);

        
        console.log("Formulário a ser enviado:");
        for (let [key, value] of formData.entries()) {
            console.log(key + ":", value);
        }

       
        fetch("https://formspree.io/f/xqawzqek", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                
                statusMessage.innerHTML = "Obrigado! A sua mensagem foi enviada.";
                statusMessage.className = "success"; 
                form.reset();

                setTimeout(() => {
                    statusMessage.innerHTML = "";
                    statusMessage.className = ""; 
                }, 3000); 
              

            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        statusMessage.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        statusMessage.innerHTML = "Ups! Algo deu errado ao enviar.";
                    }
                    
                   
                    statusMessage.className = "error"; 

                    setTimeout(() => {
                        statusMessage.innerHTML = "";
                        statusMessage.className = ""; 
                    }, 5000);
                })
            }
        })
        .catch(error => {
            statusMessage.innerHTML = "Ups! Algo deu errado ao enviar.";
        
            statusMessage.className = "error";
            setTimeout(() => {
                statusMessage.innerHTML = "";
                statusMessage.className = "";
            }, 5000);
        });
    });
});