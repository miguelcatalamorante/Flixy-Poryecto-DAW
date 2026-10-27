
// =========================================
// FIXLY - CENTRO DE MENSAJES
// =========================================

// Profesionales ficticios del prototipo

const conversaciones = [
    {
        id: 'daniel',
        nombre: 'Daniel Ruiz',
        iniciales: 'DR',
        especialidad: 'Fontanero profesional',
        mensajes: [
            {
                autor: 'profesional',
                texto: 'Hola Lucía, he visto tu solicitud para reparar el grifo de cocina. Puedo pasar mañana por la tarde.',
                hora: '09:42'
            },
            {
                autor: 'cliente',
                texto: '¡Hola Daniel! ¿El precio incluye el desplazamiento?',
                hora: '09:45'
            },
            {
                autor: 'profesional',
                texto: 'Sí, los 95 € incluyen desplazamiento, revisión y las piezas habituales.',
                hora: '09:48'
            }
        ]
    },
    {
        id: 'marco',
        nombre: 'Marco Vidal',
        iniciales: 'MV',
        especialidad: 'Fontanero profesional',
        mensajes: [
            {
                autor: 'profesional',
                texto: 'Buenas Lucía, he visto tu solicitud. Tengo disponibilidad hoy a última hora.',
                hora: '10:15'
            },
            {
                autor: 'cliente',
                texto: 'Hola Marco, ¿podrías venir después de las 18:00?',
                hora: '10:18'
            },
            {
                autor: 'profesional',
                texto: 'Perfecto, podría pasar a las 18:30. Mi presupuesto es de 80 €.',
                hora: '10:20'
            }
        ]
    },
    {
        id: 'lucas',
        nombre: 'Lucas Moreno',
        iniciales: 'LM',
        especialidad: 'Fontanero profesional',
        mensajes: [
            {
                autor: 'profesional',
                texto: 'Hola, puedo realizar la reparación esta semana.',
                hora: '11:10'
            },
            {
                autor: 'profesional',
                texto: 'Trabajo con garantía de 6 meses en todas mis intervenciones.',
                hora: '11:12'
            }
        ]
    }
];


// =========================================
// SELECCIONAR ELEMENTOS
// =========================================

const layout = document.querySelector('.messages-layout');
const lista = document.querySelector('#conversations-list');
const buscador = document.querySelector('#buscar-chat');
const emptySearch = document.querySelector('#empty-search');

const chatMessages = document.querySelector('#chat-messages');
const chatName = document.querySelector('#chat-name');
const chatAvatar = document.querySelector('#chat-avatar');
const chatSpecialty = document.querySelector('#chat-specialty');
const chatProfile = document.querySelector('#chat-profile');

const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chatBack = document.querySelector('#chat-back');

let conversacionActual = 'daniel';


// =========================================
// GUARDAR Y RECUPERAR MENSAJES LOCALES
// =========================================

const claveStorage = 'fixly-mensajes-demo';

try {
    const guardados = JSON.parse(
        localStorage.getItem(claveStorage) || '{}'
    );

    conversaciones.forEach(conversacion => {
        if (Array.isArray(guardados[conversacion.id])) {
            conversacion.mensajes.push(
                ...guardados[conversacion.id].filter(m =>
                    m &&
                    m.autor === 'cliente' &&
                    typeof m.texto === 'string' &&
                    typeof m.hora === 'string'
                )
            );
        }
    });
} catch (error) {
    console.warn('No se pudieron recuperar los mensajes locales.');
}

function guardarMensajes() {

    const datos = {};

    conversaciones.forEach(conversacion => {

        datos[conversacion.id] =
            conversacion.mensajes.filter(m => m.local === true ||
                (m.autor === 'cliente' && ![
                    '¡Hola Daniel! ¿El precio incluye el desplazamiento?',
                    'Hola Marco, ¿podrías venir después de las 18:00?'
                ].includes(m.texto))
            );

    });

    try {
        localStorage.setItem(claveStorage, JSON.stringify(datos));
    } catch (error) {
        console.warn('No se pudieron guardar los mensajes.');
    }
}


// =========================================
// CREAR LISTA DE CONVERSACIONES
// =========================================

function mostrarConversaciones(filtro = '') {

    lista.replaceChildren();

    const termino = filtro.toLowerCase().trim();

    let encontradas = 0;

    conversaciones.forEach(conversacion => {

        if (!conversacion.nombre.toLowerCase().includes(termino)) {
            return;
        }

        encontradas++;

        const ultimo = conversacion.mensajes.at(-1);

        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'conversation-item';

        if (conversacion.id === conversacionActual) {
            boton.classList.add('active');
        }

        const avatar = document.createElement('span');
        avatar.className = 'conversation-avatar';
        avatar.textContent = conversacion.iniciales;

        const cuerpo = document.createElement('div');
        cuerpo.className = 'conversation-body';

        const superior = document.createElement('div');
        superior.className = 'conversation-top';

        const nombre = document.createElement('span');
        nombre.className = 'conversation-name';
        nombre.textContent = conversacion.nombre;

        const hora = document.createElement('time');
        hora.className = 'conversation-time';
        hora.textContent = ultimo.hora;

        superior.append(nombre, hora);

        const especialidad = document.createElement('p');
        especialidad.className = 'conversation-specialty';
        especialidad.textContent = conversacion.especialidad;

        const preview = document.createElement('span');
        preview.className = 'conversation-preview';
        preview.textContent = ultimo.texto;

        cuerpo.append(superior, especialidad, preview);
        boton.append(avatar, cuerpo);

        boton.addEventListener('click', () => {
            abrirConversacion(conversacion.id);
        });

        lista.appendChild(boton);
    });

    emptySearch.hidden = encontradas !== 0;
}


// =========================================
// ABRIR CONVERSACION
// =========================================

function abrirConversacion(id) {

    const conversacion = conversaciones.find(c => c.id === id);

    if (!conversacion) return;

    conversacionActual = id;

    chatName.textContent = conversacion.nombre;
    chatAvatar.textContent = conversacion.iniciales;
    chatSpecialty.textContent =
        conversacion.especialidad + ' · Verificado (demo)';

    chatProfile.href = 'profesional.html?id=' + id;

    mostrarMensajes();
    mostrarConversaciones(buscador.value);

    layout.classList.add('chat-open');
}


// =========================================
// MOSTRAR BURBUJAS DE MENSAJES
// =========================================

function mostrarMensajes() {

    chatMessages.replaceChildren();

    const conversacion = conversaciones.find(
        c => c.id === conversacionActual
    );

    const fecha = document.createElement('span');
    fecha.className = 'chat-day';
    fecha.textContent = 'Conversación de demostración';

    chatMessages.appendChild(fecha);

    conversacion.mensajes.forEach(mensaje => {

        const burbuja = document.createElement('article');
        burbuja.className = 'message-bubble';

        if (mensaje.autor === 'cliente') {
            burbuja.classList.add('mine');
        }

        const texto = document.createElement('p');
        texto.textContent = mensaje.texto;

        const hora = document.createElement('time');
        hora.textContent = mensaje.hora;

        burbuja.append(texto, hora);
        chatMessages.appendChild(burbuja);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// =========================================
// ENVIAR MENSAJE EN EL PROTOTIPO
// =========================================

chatForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const texto = chatInput.value.trim();

    if (!texto) return;

    const conversacion = conversaciones.find(
        c => c.id === conversacionActual
    );

    const ahora = new Date();

    const hora = ahora.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });

    conversacion.mensajes.push({
        autor: 'cliente',
        texto: texto,
        hora: hora,
        local: true
    });

    chatInput.value = '';

    guardarMensajes();
    mostrarMensajes();
    mostrarConversaciones(buscador.value);

    chatInput.focus();
});


// =========================================
// BUSCAR PROFESIONALES
// =========================================

buscador.addEventListener('input', () => {
    mostrarConversaciones(buscador.value);
});


// =========================================
// VOLVER A CONVERSACIONES EN MOVIL
// =========================================

chatBack.addEventListener('click', () => {
    layout.classList.remove('chat-open');
});


// =========================================
// INICIALIZAR
// =========================================

mostrarConversaciones();
abrirConversacion('daniel');
layout.classList.remove('chat-open');
