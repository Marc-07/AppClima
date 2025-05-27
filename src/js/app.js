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
}

function mostrarError (mensaje){
    console.log(mensaje);
}