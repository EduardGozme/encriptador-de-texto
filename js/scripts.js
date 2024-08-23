const textArea = document.getElementById("textoIngresado");
const encriptarBtn = document.getElementById("encriptarBtn");
const desencriptarBtn = document.getElementById("desencriptarBtn");
const limpiarBtn = document.getElementById("limpiarBtn");
const copiarBtn = document.getElementById("copiarBtn");
const resultadoImg = document.querySelector(".imagen__resultado");
const resultadoMensaje = document.querySelector(".resultado__mensaje");
const resultadoTexto = document.querySelector(".resultado__texto");

const requisitos = /^[a-z\n\s]+$/;

const matrizCodigo = new Map([
    ["e", "enter"],
    ["i", "imer"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
]);

const transformarTexto = (texto, mapa, esEncriptar = true) => {
    mapa.forEach((valor, clave) => {
        const [buscado, reemplazo] = esEncriptar ? [clave, valor] : [valor, clave];
        texto = texto.replaceAll(buscado, reemplazo);
    });
    return texto;
};

const manejarTexto = (esEncriptar) => {
    const texto = textArea.value.trim();

    if (requisitos.test(texto)) {
        const resultado = transformarTexto(texto, matrizCodigo, esEncriptar);
        mostrarResultado(resultado);
        copiarBtn.style.display = esEncriptar ? 'initial' : 'none';
    } else {
        alert('El texto es inválido o no ha ingresado texto');
        mostrarResultado(null);
        copiarBtn.style.display = 'none';
    }

    textArea.value = '';
};

const mostrarResultado = (resultado) => {
    const esMovil = window.innerWidth <= 600;

    if (resultado) {
        resultadoImg.style.display = esMovil ? 'none' : 'none';
        resultadoMensaje.textContent = "Resultado:";
        resultadoTexto.textContent = resultado;
    } else {
        resultadoImg.style.display = esMovil ? 'none' : 'block';
        resultadoMensaje.textContent = "Ningún mensaje fue encontrado";
        resultadoTexto.textContent = "Ingresa el texto que desees encriptar o desencriptar.";
    }
};

const copiarTexto = () => {
    const texto = resultadoTexto.textContent.trim();
    if (texto) {
        navigator.clipboard.writeText(texto);
        alert('Texto Copiado');
    }
};

const limpiarTexto = () => {
    textArea.value = '';
    mostrarResultado(null);
    copiarBtn.style.display = 'none';
};

encriptarBtn.addEventListener('click', () => manejarTexto(true));
desencriptarBtn.addEventListener('click', () => manejarTexto(false));
limpiarBtn.addEventListener('click', limpiarTexto);
copiarBtn.addEventListener('click', copiarTexto);

// Controlar la visibilidad inicial según el tamaño de la pantalla
const ajustarVisibilidadInicial = () => {
    const esMovil = window.innerWidth <= 600;
    resultadoImg.style.display = esMovil ? 'none' : 'block';
};

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', ajustarVisibilidadInicial);

// Controlar la visibilidad al redimensionar la ventana
window.addEventListener('resize', ajustarVisibilidadInicial);
