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

    spinner(); 
    
    fetch(url)
        .then( respuesta => {
            return respuesta.json();
        })
        .then ( datosClima => {
            limpiarHTML();
            if( datosClima.cod === "404"){
                mostrarError("Ciudad no encontrada");
                return;
            }

            //imprime los resultados o datos en el HTML
            mostrarClima(datosClima);
        })    
}

function mostrarClima(datosClima) {
    const { name, main: {temp, temp_max, temp_min} } = datosClima;

    const centigrados = (parseInt(temp - 273.15));
    const max = (parseInt(temp_max - 273.15));
    const min = (parseInt(temp_min - 273.15));

    const nombreCiudad = document.createElement("P");
    nombreCiudad.textContent = `Clima en: ${name}`;
    nombreCiudad.classList.add("text-center", "font-bold", "text-2xl");

    const tempActual = document.createElement("P");
    tempActual.innerHTML = `${centigrados} &#8451`;
    tempActual.classList.add("font-bold", "text-6xl");

    const tempMax = document.createElement("P");
    tempMax.innerHTML = `Max: ${max} &#8451`
    tempMax.classList.add("text-xl", "py-3");

    const tempMin = document.createElement("P");
    tempMin.innerHTML = `Min: ${min} &#8451`
    tempMin.classList.add("text-xl");

    const resultadoDiv = document.createElement("DIV");
    resultadoDiv.classList.add("text-center", "text-white", "py-10");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
    
}

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner (){

    limpiarHTML();

    const divSpinner = document.createElement("DIV");
    divSpinner.classList.add("sk-fading-circle");
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}