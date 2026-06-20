const btnHamburguesa = document.getElementById('btn-hamburguesa');
const menuNavegacion = document.getElementById('menu-navegacion');

btnHamburguesa.addEventListener('click', () => {
    console.log("El botón fué presionado");
    menuNavegacion.classList.toggle('activo');
    console.log("Clases actuales del menú:", menuNavegacion.className);
});

const enlacesMenu = document.querySelectorAll('.menu-navegacion a');

enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
        menuNavegacion.classList.remove('activo');
    });
});

//Animaciones al scroll

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach (entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add ('visible');
            
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
})

const elementosOcultos = document.querySelectorAll('.fade-up');

elementosOcultos.forEach((elemento) => {
    observador.observe(elemento);
})

//Mensaje de exito al enviar formulario

const formulario = document.getElementById('contact-form');
const mensajeExito = document.getElementById('mensaje-exito');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const btnSubmit = formulario.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerHTML;
    btnSubmit.innerHTML = 'Enviando solicitud... ⏳';
    btnSubmit.style.opacity = '0.7';

    const urlFormspree = "https://formspree.io/f/mlgkqadw";

    fetch(urlFormspree, {
        method: 'POST',
        body: new FormData(formulario),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(respuesta => {
        if(respuesta.ok) {
            formulario.style.display = 'none';
            mensajeExito.classList.remove('oculto');
        } else {
            alert("Hubo un problema al envia la solicitud. Por favor intenta de nuevo");
            btnSubmit.innerHTML = textoOriginal;
            btnSubmit.style.opacity = '1';
        }
    })
    .catch(error => {
        alert("Error de conexión. Revisa tu internet");
        btnSubmit.innerHTML = textoOriginal;
        btnSubmit.style.opacity = '1';
    });

});