//Lógica para resaltar en el nav la Sección donde se encuentra el usuario.
const secciones = document.querySelectorAll(".seccion");
const navLinks = document.querySelectorAll(".nav__link");

window.onscroll = () => {
    secciones.forEach((seccion) => {
        let top = window.scrollY;
        let offset = seccion.offsetTop - 150;
        let height = seccion.offsetHeight;
        let id = seccion.getAttribute("id");

        if (top >= offset && top < offset + height) {
            document
                .querySelector(".nav__link[href*=" + id + "]")
                .classList.add("nav__activo");
        } else {
            document
                .querySelector(".nav__link[href*=" + id + "]")
                .classList.remove("nav__activo");
        }
    });
};
//FIN de lógica (resaltado de enlace de navegación activo)
//--------------------------------------------------------------------------------------------------------------------------------
//Lógica para mostrar y ocultar hobbies
const btnMostrarHobbies = document.querySelector(".sobremi__mostrarMas");
const btnOcultarHobbies = document.querySelector(".sobremi__mostrarMenos");
const hobbies = document.querySelector(".contenedor__hobbies");
const tituloHobbies = document.querySelector(".contenedor__hobbies .seccion__titulo h3");
const itemsHobbies = document.querySelectorAll(".hobbies__item");

btnMostrarHobbies.addEventListener("click", () => {
    tituloHobbies.classList.remove("animacion__fadeOutArriba");
    hobbies.classList.add("animacion__agrandarContenedor");
    hobbies.style.display = "flex";
    // hobbies.scrollIntoView({ behavior: "smooth", block: "end" });
    tituloHobbies.classList.add("animacion__fadeInAbajo");
    hobbies.classList.remove("animacion__achicarContenedor");
    hobbies.style.visibility = "visible";
    itemsHobbies.forEach(item => {
        item.classList.remove("animacion__fadeOutArriba");
        item.classList.add("animacion__fadeInAbajo");
    });
    btnMostrarHobbies.style.display = "none";
    btnOcultarHobbies.style.display = "inline";
});

btnOcultarHobbies.addEventListener("click", () => {
    tituloHobbies.classList.remove("animacion__fadeInAbajo");
    hobbies.classList.remove("animacion__agrandarContenedor");
    hobbies.classList.add("animacion__achicarContenedor");
    tituloHobbies.classList.add("animacion__fadeOutArriba");
    itemsHobbies.forEach(item => {
        item.classList.remove("animacion__fadeInAbajo");
        item.classList.add("animacion__fadeOutArriba");
    });
    hobbies.classList.remove("animacion__fadeInAbajo");
    hobbies.classList.add("animacion__achicarContenedor");
    setTimeout(() => {
        hobbies.style.display = "none";
        btnOcultarHobbies.style.display = "none";
        btnMostrarHobbies.style.display = "inline";
        hobbies.style.visibility = "hidden";
    }, 1000);
});
//--------------------------------------------------------------------------------------------------------------------------------
//Lógica para resaltar imagen de hobbie seleccionado y atenuarla cuando se mira descripción
const hobbieItems = document.querySelectorAll(".hobbies__item");
const hobbieImgs = document.querySelectorAll(".hobbies__imagen img");
const hobbieDescripciones = document.querySelectorAll(".hobbies__descripcion");

hobbieItems.forEach((item, index) => {
    item.addEventListener("mouseover", () => {
        hobbieImgs[index].style.filter = "drop-shadow(0 0 3px rgba(201, 122, 47))";
    });
    item.addEventListener("mouseout", () => {
        hobbieImgs[index].style.filter =
            "drop-shadow(0 0 2px rgba(227, 227, 229, .5))";
    });
});

hobbieDescripciones.forEach((descripcion, index) => {
    descripcion.addEventListener("mouseover", () => {
        hobbieImgs[index].style.opacity = "0.1";
    });
    descripcion.addEventListener("mouseout", () => {
        hobbieImgs[index].style.opacity = "1";
    });
});
//FIN de resaltado y atenuación de hobbies
//--------------------------------------------------------------------------------------------------------------------------------
//Lógica para fondo de partículas
const particulasContainer = document.getElementById("contenedor__particulas");
const cantidadParticulas = 15;
for (let i = 1; i <= cantidadParticulas; i++) {
    const span = document.createElement("span");
    span.style.setProperty("--i", Math.floor(Math.random() * (80 - 9) + 20));
    particulasContainer.appendChild(span);
}
//FIN de lógica de partículas
//--------------------------------------------------------------------------------------------------------------------------------
//Logica para VALIDAR formulario de contacto
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textArea = document.querySelector("#mensaje");
const iconosCorrectos = document.querySelectorAll(".fa-circle-check");
const iconosIncorrectos = document.querySelectorAll(".fa-circle-xmark");
const leyendaError = document.querySelectorAll(".mensaje__error");
const asterisco = document.querySelectorAll(".campo__obligatorio");
var hayErrores = true;
var errorNombre = true;
var errorMail = true;
var errorAsunto = true;
var errorMensaje = true;
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    asunto: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    mensaje: /^[\s\S]{1,3000}$/,
};

function validarFormulario(e) {
    //En este switch validamos cada campo del formulario con su respectiva expresión regular y mostramos los iconos de correcto e incorrecto
    hayErrores = false;
    switch (e.target.name) {
        case "name":
            errorNombre = false;
            if (comprobarCampoInputVacio(e, 0)) return;
            validarCampo(
                e,
                0,
                expresiones.nombre,
                "Evite utilizar números o caracteres especiales."
            );
            if (hayErrores === true) {
                errorNombre = true;
            }
            break;
        case "email":
            errorMail = false;
            if (comprobarCampoInputVacio(e, 1)) return;
            validarCampo(
                e,
                1,
                expresiones.correo,
                "Debe respetar el formato:  " + e.target.placeholder
            );
            if (hayErrores === true) {
                errorMail = true;
            }
            break;
        case "subject":
            errorAsunto = false;
            if (comprobarCampoInputVacio(e, 2)) return;
            validarCampo(
                e,
                2,
                expresiones.asunto,
                "Evite utilizar números o caracteres especiales."
            );
            if (hayErrores === true) {
                errorAsunto = true;
            }
            break
        default:
            break;
    };
};
function comprobarCampoInputVacio(e, indice) {
    //Función para comprobar si el input está vacío y quitar los iconos de correcto e incorrecto
    if (e.target.value.trim() === "") {
        iconosIncorrectos[indice].classList.remove("input__incorrecto");
        iconosCorrectos[indice].classList.remove("input__correcto");
        leyendaError[indice].textContent = "";
        hayErrores = true;
        return true;
    };
};

function validarCampo(e, indice, expresion, mensajeError) {
    //Función auxiliar del switch para validar el campo con la expresión regular y mostrar los iconos de correcto e incorrecto
    if (expresion.test(e.target.value)) {
        leyendaError[indice].textContent = "";
        asterisco[indice].style.display = "none";
        iconosIncorrectos[indice].classList.remove("input__incorrecto");
        iconosCorrectos[indice].classList.add("input__correcto");
    } else {
        iconosCorrectos[indice].classList.remove("input__correcto");
        iconosIncorrectos[indice].classList.add("input__incorrecto");
        if (e.target.value.length > 50 && (indice === 0 || indice === 2)) {
            leyendaError[indice].textContent = "Tamaño máximo: 50 catacteres.";
        } else {
            leyendaError[indice].textContent = mensajeError;
        }
        hayErrores = true;
    };
};

function validarTextArea() {
    errorMensaje = false;
    if (textArea.value.trim() === "") {
        iconosIncorrectos[3].classList.remove("input__incorrecto");
        iconosCorrectos[3].classList.remove("input__correcto");
        leyendaError[3].textContent = "";
        errorMensaje = true;
        return;
    }
    if (expresiones.mensaje.test(textArea.value) && textArea.value.trim() !== "" && textArea.value.length <= 3000) {
        leyendaError[3].textContent = "";
        asterisco[3].style.display = "none";
        iconosIncorrectos[3].classList.remove("input__incorrecto");
        iconosCorrectos[3].classList.add("input__correcto");
    } else {
        iconosCorrectos[3].classList.remove("input__correcto");
        iconosIncorrectos[3].classList.add("input__incorrecto");
        leyendaError[3].textContent =
            "Tamaño máximo del mensaje: 3000 catacteres.";
        errorMensaje = true;
    };
};
//validamos lo que va escribiendo el usuario
inputs.forEach((input) => {
    input.addEventListener("change", validarFormulario);
});
textArea.addEventListener("change", validarTextArea);

//Validamos el submit
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    inputs.forEach((input, index) => {
        if (input.value.trim() === "") {
            leyendaError[index].textContent = "Este campo no puede quedar vacío.";
            asterisco[index].style.display = "inline-block";
            hayErrores = true;
        };
    });
    validarTextArea();
    if (textArea.value.trim() === "") {
        leyendaError[3].textContent = "Este campo no puede quedar vacío.";
        asterisco[3].style.display = "inline-block";
        hayErrores = true;
    };
    if (errorNombre === false && errorMail === false && errorAsunto === false && errorMensaje === false) {
        formulario.submit()
    }
});
//FIN de lógica de validación de formulario

//Lógica para mostrar y ocultar el menú HAMBURGUESA en dispositivos móviles
const btnHamburguesa = document.querySelector(".menu__hamburguesa");
const menu = document.querySelector(".menu__nav");
btnHamburguesa.addEventListener("click", () => {
    btnHamburguesa.classList.toggle("menu__hamburguesa__activo");
    menu.classList.toggle("mostrar__menu");

});
//FIn de lógica de menú hamburguesa

//Logica para ocultar la botonera de redes sociales en dispositivos móviles cuando llega al footer
const footer = document.querySelector("footer");
const botoneraRedes = document.querySelector(".contenedor__redes");
var alturaHastaElFooter = footer.offsetTop;


window.addEventListener("scroll", () => {
    const alturaActual = window.scrollY + window.innerHeight;
    if (alturaActual >= alturaHastaElFooter) {
        botoneraRedes.style.display = "none";
    } else {
        botoneraRedes.style.display = "block"; // o cualquier estilo que desees
    }
});
//Para reparar errores de posibles cargas diferidas en la página que hagan que la botonera se oculte antes de tiempo, actualizamos el cálculo de la altura del footer
function actualizarAlturaFooter() {
    alturaHastaElFooter = footer.offsetTop;
}
actualizarAlturaFooter();
document.addEventListener("DOMContentLoaded", actualizarAlturaFooter);
//FIN de lógica de redes sociales en footer