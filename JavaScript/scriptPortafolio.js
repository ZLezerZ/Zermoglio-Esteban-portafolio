//Lógica para resaltar en el nav en qué Sección se encuentra el usuario.
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


//Lógica para fondo de partículas
const particulasContainer = document.getElementById('contenedor__particulas');
const cantidadParticulas = 20; // Cambia esto según la cantidad deseada
for (let i = 1; i <= cantidadParticulas; i++) {
    const span = document.createElement('span');
    span.style.setProperty('--i', Math.floor(Math.random() * (80 -9) + 20)); // Valores aleatorios entre 1 y 100
    particulasContainer.appendChild(span);
}
////FIN de lógica de partículas
