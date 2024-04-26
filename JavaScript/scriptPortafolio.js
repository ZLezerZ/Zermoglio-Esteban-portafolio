//Lógica para resaltar en el nav la Sección donde se encuentra el usuario.
const secciones = document.querySelectorAll('.seccion');
const navLinks = document.querySelectorAll('.nav__link');

window.onscroll = () => {
    secciones.forEach(seccion => {
        let top = window.scrollY;
        let offset = seccion.offsetTop - 150;
        let height = seccion.offsetHeight;
        let id = seccion.getAttribute('id');

        if (top >= offset && top < offset + height) {
            document.querySelector('.nav__link[href*=' + id + ']').classList.add('nav__activo');
        } else {
            document.querySelector('.nav__link[href*=' + id + ']').classList.remove('nav__activo');
        };
    });
};
//FIN de lógica (resaltado de enlace de navegación activo)
//--------------------------------------------------------------------------------------------------------------------------------
//Lógica para resaltar imagen de hobbie seleccionado y atenuarla cuando se mira descripción
const hobbieItems = document.querySelectorAll('.hobbies__item');
const hobbieImgs = document.querySelectorAll('.hobbies__imagen img');
const hobbieDescripciones = document.querySelectorAll('.hobbies__descripcion');

hobbieItems.forEach((item, index) => {
    item.addEventListener('mouseover', () => {
        hobbieImgs[index].style.filter = 'drop-shadow(0 0 3px rgba(201, 122, 47))';
    });
    item.addEventListener('mouseout', () => {
        hobbieImgs[index].style.filter = 'drop-shadow(0 0 2px rgba(227, 227, 229, .5))';

    });
});

hobbieDescripciones.forEach((descripcion, index) => {
    descripcion.addEventListener('mouseover', () => {
        hobbieImgs[index].style.opacity = '0.1';
    });
    descripcion.addEventListener('mouseout', () => {
        hobbieImgs[index].style.opacity = '1';
    })
});
//FIN de resaltado y atenuación de hobbies
//--------------------------------------------------------------------------------------------------------------------------------
//Lógica para fondo de partículas
const particulasContainer = document.getElementById('contenedor__particulas');
const cantidadParticulas = 20;
for (let i = 1; i <= cantidadParticulas; i++) {
    const span = document.createElement('span');
    span.style.setProperty('--i', Math.floor(Math.random() * (80 - 9) + 20));
    particulasContainer.appendChild(span);
}
//FIN de lógica de partículas
//--------------------------------------------------------------------------------------------------------------------------------
//Logica para VALIDAR formulario de contacto
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const iconosCorrectos = document.querySelectorAll('.fa-circle-check');
const iconosIncorrectos = document.querySelectorAll('.fa-circle-xmark');
const campos = document.querySelectorAll('campo__input');
const leyendaError = document.querySelectorAll('.mensaje__error');
const asterisco = document.querySelectorAll('.campo__obligatorio');
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    asunto: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
    mensaje: /^[a-zA-ZÀ-ÿ\s]{1,500}$/
};

function validarFormulario(e) {
    //En este switch validamos cada campo del formulario con su respectiva expresión regular y mostramos los iconos de correcto e incorrecto
    switch (e.target.name) {
        case "nombre":
            if (comprobarCampoInputVacio(e, 0))
                return;
            validarCampo(e, 0, expresiones.nombre, "Evite utilizar números o caracteres especiales.");
            break;
        case "email":
            if (comprobarCampoInputVacio(e, 1))
                return;
            validarCampo(e, 1, expresiones.correo, "Debe respetar el formato:  " + e.target.placeholder);
            break;
        case "asunto":
            if (comprobarCampoInputVacio(e, 2))
                return;
            validarCampo(e, 2, expresiones.asunto, "Evite utilizar números o caracteres especiales.");
        default:
            break;
    }
};
function comprobarCampoInputVacio(e, indice) { //Función para comprobar si el input está vacío y quitar los iconos de correcto e incorrecto
    if (e.target.value.trim() === '') {
        iconosIncorrectos[indice].classList.remove("input__incorrecto");
        iconosCorrectos[indice].classList.remove("input__correcto");
        leyendaError[indice].textContent = "";
        return true;
    };
}

function validarCampo(e, indice, expresion, mensajeError) { //Función auxiliar del switch para validar el campo con la expresión regular y mostrar los iconos de correcto e incorrecto
    if (expresion.test(e.target.value)) {
        leyendaError[indice].textContent = "";
        asterisco[indice].style.display = "none";
        iconosIncorrectos[indice].classList.remove("input__incorrecto");
        iconosCorrectos[indice].classList.add("input__correcto");
    } else {
        iconosCorrectos[indice].classList.remove("input__correcto");
        iconosIncorrectos[indice].classList.add("input__incorrecto");
        leyendaError[indice].textContent = mensajeError;
    };
}

function validarTextArea() {

}

inputs.forEach(input => {
    input.addEventListener('change', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    inputs.forEach((input, index) => {
        if (input.value.trim() === '') {
            leyendaError[index].textContent = "Este campo no puede quedar vacío.";
            asterisco[index].style.display = "inline-block";
        } else if (iconosIncorrectos[index].classList.contains("input__incorrecto")) { //Si el campo no cumple con la expresión regular, se muestra el mensaje de error
            asterisco[index].style.display = "inline-block";
        }
    });
});
//FIN de lógica de validación de formulario

// inputs.forEach(input => {
//  let validacion = false;
//     if (input.value.trim() === '') {
//         mostrarError(input, 'Este campo es obligatorio');
//         validacion = false;
//     } else {
//         validacion = true;
//     }
// });
// asterisco[indice].style.display = "inline-block";

// if (validacion) {
//     formulario.reset();
//     alert('Mensaje enviado correctamente');
// }