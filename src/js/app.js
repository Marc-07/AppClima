//Selectores
const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

document.addEventListener("DOMContentLoaded", () => {
    formulario.addEventListener("submit", buscarClima);
});

function buscarClima (e) {
    e.preventDefault();

    //Validar el formulario
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if(ciudad.trim() === "" || pais === ""){
        //Hubo un error
        mostrarError("Todos los campos son obligatorios");

        return;
    } 

    //API
    consultarAPI(ciudad, pais);
}

function mostrarError (mensaje){
    const alerta = document.querySelector(".bg-red-600");

    if(!alerta) {
         //Crear una alerta
        const alerta = document.createElement("div");
        alerta.classList.add("bg-red-600", "py-3", "text-center", "border-red-600", "rounded", "max-w-md", "mx-auto", "mt-6", "text-white")
        alerta.innerHTML = `
            <span class="block">${mensaje}</span>
        `;

        //Agregar al html
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);

    }

}

function consultarAPI(ciudad, pais){

    const appId = "d185bdc4da55853c53de4d7b11b9c151";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    console.log(url);
    fetch(url)
        .then( respuesta => {
            return respuesta.json();
        })
        .then ( resultado => {
            if(resultado.cod === "404"){
                mostrarError("Ciudad no encontrada");
            }
        })    



}