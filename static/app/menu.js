document.addEventListener("DOMContentLoaded", function() {
    const botaoMenu = document.getElementById("botao-menu");
    const navbar = document.getElementById("navbar");
    botaoMenu.addEventListener("click", function(event) {
        event.preventDefault(); 
        navbar.classList.toggle("oculto");
    });

});