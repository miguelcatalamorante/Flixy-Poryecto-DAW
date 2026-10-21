
// ======================================
// FIXLY - DASHBOARD JAVASCRIPT
// ======================================

// Elementos del buscador
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchMessage = document.querySelector('#search-message');
const serviceCards = document.querySelectorAll('.service-card');


// ======================================
// NORMALIZAR TEXTO
// ======================================

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}


// ======================================
// BUSCAR SERVICIOS
// ======================================

function buscarServicios() {

    const busqueda = normalizarTexto(searchInput.value);

    let encontrados = 0;

    serviceCards.forEach((card) => {

        const servicio = normalizarTexto(
            card.textContent
        );

        const coincide = servicio.includes(busqueda);

        card.hidden = !coincide;

        if (coincide) {
            encontrados++;
        }

    });

    // Mostrar resultado
    if (busqueda === '') {
        searchMessage.textContent = '';
    } else if (encontrados === 0) {
        searchMessage.textContent =
            'No se encontraron servicios con ese nombre.';
    } else {
        searchMessage.textContent =
            `Se encontraron ${encontrados} servicios.`;
    }
}


// ======================================
// EVENTO DEL FORMULARIO
// ======================================

searchForm.addEventListener('submit', (event) => {

    event.preventDefault();

    buscarServicios();

});


// ======================================
// BUSQUEDA EN TIEMPO REAL
// ======================================

searchInput.addEventListener('input', buscarServicios);


// ======================================
// VER TODOS LOS SERVICIOS
// ======================================

document.querySelector('#ver-servicios').addEventListener(
    'click',
    (event) => {

        event.preventDefault();

        searchInput.value = '';

        buscarServicios();

        document.querySelector('#servicios').scrollIntoView({
            behavior: 'smooth'
        });

    }
);


// ======================================
// NOTIFICACIONES
// ======================================

document.querySelector('#notificaciones').addEventListener(
    'click',
    () => {

        alert('Las notificaciones estarán disponibles en próximos hitos.');

    }
);


// ======================================
// MENSAJES
// ======================================

document.querySelector('#mensajes-link').addEventListener(
    'click',
    (event) => {

        event.preventDefault();

        alert('El sistema de mensajes estará disponible en próximos hitos.');

    }
);
