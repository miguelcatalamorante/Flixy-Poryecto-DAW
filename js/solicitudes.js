
// ======================================
// FIXLY - MIS SOLICITUDES
// ======================================

// Datos ficticios para el prototipo del Hito 1

const profesionales = {
    daniel: {
        nombre: 'Daniel Ruiz',
        iniciales: 'DR',
        precio: 95,
        rating: '4,9',
        opiniones: 127,
        experiencia: '12+',
        trabajos: '340',
        satisfaccion: '98%',
        descripcion: 'Fontanero profesional con más de 12 años de experiencia en instalaciones y reparaciones domésticas. Trabajo limpio, puntual y con garantía. Mi prioridad es que entiendas qué ocurre y cuál es la mejor solución.'
    },

    marco: {
        nombre: 'Marco Vidal',
        iniciales: 'MV',
        precio: 80,
        rating: '4,8',
        opiniones: 89,
        experiencia: '8+',
        trabajos: '215',
        satisfaccion: '96%',
        descripcion: 'Profesional especializado en fontanería doméstica. Ofrezco soluciones prácticas, reparaciones rápidas y atención personalizada.'
    },

    lucas: {
        nombre: 'Lucas Moreno',
        iniciales: 'LM',
        precio: 110,
        rating: '4,7',
        opiniones: 64,
        experiencia: '10+',
        trabajos: '180',
        satisfaccion: '95%',
        descripcion: 'Fontanero especializado en mantenimiento, reparación de fugas e instalaciones. Trabajo con materiales de calidad y garantía.'
    },

    pablo: {
        nombre: 'Pablo Serrano',
        iniciales: 'PS',
        precio: 105,
        rating: '4,6',
        opiniones: 52,
        experiencia: '7+',
        trabajos: '145',
        satisfaccion: '94%',
        descripcion: 'Profesional dedicado a reparaciones domésticas e instalaciones de fontanería. Me esfuerzo por ofrecer un servicio puntual y fiable.'
    }
};


// ======================================
// CARGAR PERFIL DEL PROFESIONAL
// ======================================

function cargarPerfil() {

    const nombreElemento = document.querySelector('#prof-nombre');

    // Solo se ejecuta en profesional.html
    if (!nombreElemento) return;

    const parametros = new URLSearchParams(window.location.search);

    const id = parametros.get('id') || 'daniel';

    const profesional = profesionales[id] || profesionales.daniel;

    nombreElemento.textContent = profesional.nombre;

    document.querySelector('#prof-avatar').textContent =
        profesional.iniciales;

    document.querySelector('#prof-rating').textContent =
        profesional.rating;

    document.querySelector('#prof-rating-review').textContent =
        profesional.rating;

    document.querySelector('#prof-opiniones').textContent =
        profesional.opiniones;

    document.querySelector('#prof-precio-hero').textContent =
        profesional.precio + ' €';

    document.querySelector('#prof-precio-resumen').textContent =
        profesional.precio + ' €';

    document.querySelector('#prof-descripcion').textContent =
        profesional.descripcion;

    document.querySelector('#prof-experiencia').textContent =
        profesional.experiencia;

    document.querySelector('#prof-trabajos').textContent =
        profesional.trabajos;

    document.querySelector('#prof-satisfaccion').textContent =
        profesional.satisfaccion;

    // Asociar el profesional al botón de aceptar
    document.querySelector('#prof-accept').dataset.id =
        profesionales[id] ? id : 'daniel';

    document.title = profesional.nombre + ' | FIXLY';
}



// ======================================
// CONFIRMACION PROFESIONAL FIXLY
// ======================================

function prepararBotonesAceptar() {

    const botones = document.querySelectorAll('.accept-offer');

    const modal = document.querySelector('#modal-confirmacion');

    if (!modal) return;

    const modalTitulo = document.querySelector('#modal-titulo');
    const modalDescripcion = document.querySelector('#modal-descripcion');
    const modalProfesional = document.querySelector('#modal-profesional');
    const modalPrecio = document.querySelector('#modal-precio');

    const cancelar = document.querySelector('#modal-cancelar');
    const aceptar = document.querySelector('#modal-aceptar');

    let profesionalSeleccionado = null;

    botones.forEach(boton => {

        boton.addEventListener('click', () => {

            const id = boton.dataset.id;
            const profesional = profesionales[id];

            if (!profesional) return;

            profesionalSeleccionado = profesional;

            modalTitulo.textContent = 'Confirmar servicio';

            modalDescripcion.textContent =
                `¿Quieres seleccionar la oferta de ${profesional.nombre}?`;

            modalProfesional.textContent = profesional.nombre;
            modalPrecio.textContent = profesional.precio + ' €';

            aceptar.textContent = 'Confirmar servicio';
            cancelar.textContent = 'Cancelar';
            cancelar.hidden = false;

            modal.showModal();

        });

    });

    cancelar.addEventListener('click', () => {
        modal.close();
    });

    aceptar.addEventListener('click', () => {

        if (!profesionalSeleccionado) return;

        modalTitulo.textContent = '¡Servicio confirmado!';

        modalDescripcion.textContent =
            `Has seleccionado la oferta de ${profesionalSeleccionado.nombre} por ${profesionalSeleccionado.precio} € en esta demostración.`;

        cancelar.hidden = true;

        aceptar.textContent = 'Volver a FIXLY';

        // El botón ahora permite cerrar la confirmación
        aceptar.onclick = () => {
            window.location.href = 'index.html';
        };

    });

}



// ======================================
// BOTON DE MAS OPCIONES
// ======================================

function prepararOpciones() {

    const boton = document.querySelector('#more-options');

    if (!boton) return;

    boton.addEventListener('click', () => {

        const mensaje = document.querySelector('#sol-feedback');

        mensaje.textContent =
            'La edición y gestión de solicitudes estarán disponibles en próximos hitos.';

    });
}


// ======================================
// INICIALIZAR
// ======================================

cargarPerfil();
prepararBotonesAceptar();
prepararOpciones();
