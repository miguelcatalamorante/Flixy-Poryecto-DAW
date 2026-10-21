
// ======================================
// FIXLY - CREAR SOLICITUD
// ======================================

const form = document.querySelector('#crear-form');
const categoria = document.querySelector('#categoria');
const titulo = document.querySelector('#titulo');
const descripcion = document.querySelector('#descripcion');
const presupuestoMin = document.querySelector('#presupuesto-min');
const presupuestoMax = document.querySelector('#presupuesto-max');
const ubicacion = document.querySelector('#ubicacion');
const message = document.querySelector('#crear-message');

const imagenes = document.querySelector('#imagenes');
const preview = document.querySelector('#image-preview');
const uploadBox = document.querySelector('#upload-box');


// ======================================
// 1. SELECCIONAR CATEGORIA DESDE INDEX
// ======================================

// Ejemplo: crear.html?categoria=electricidad

const parametros = new URLSearchParams(window.location.search);
const categoriaURL = parametros.get('categoria');

const categoriasDisponibles = [
    'fontaneria',
    'electricidad',
    'informatica',
    'pintura',
    'limpieza',
    'mudanzas'
];

// Solo seleccionar categorías válidas

if (categoriaURL && categoriasDisponibles.includes(categoriaURL)) {
    categoria.value = categoriaURL;
}


// ======================================
// 2. MOSTRAR ERRORES
// ======================================

function setError(input, texto) {

    const error = document.getElementById(input.id + '-error');

    error.textContent = texto;

    input.setAttribute(
        'aria-invalid',
        texto ? 'true' : 'false'
    );

    if (texto) {
        input.setAttribute('aria-describedby', error.id);
    } else {
        input.removeAttribute('aria-describedby');
    }
}


// ======================================
// 3. VALIDACION DEL FORMULARIO
// ======================================

form.addEventListener('submit', (event) => {

    event.preventDefault();

    let valido = true;
    message.textContent = '';

    // Título

    if (titulo.value.trim().length < 5) {
        setError(titulo, 'Escribe un título de al menos 5 caracteres.');
        valido = false;
    } else {
        setError(titulo, '');
    }

    // Descripción

    if (descripcion.value.trim().length < 20) {
        setError(descripcion, 'Describe el trabajo con al menos 20 caracteres.');
        valido = false;
    } else {
        setError(descripcion, '');
    }

    // Presupuesto

    const minimo = Number(presupuestoMin.value);
    const maximo = Number(presupuestoMax.value);

    if (presupuestoMin.value === '' || minimo < 0 ||
        !Number.isFinite(minimo)) {

        setError(presupuestoMin, 'Introduce un presupuesto mínimo válido.');
        valido = false;

    } else {
        setError(presupuestoMin, '');
    }

    if (presupuestoMax.value === '' || maximo < minimo ||
        maximo < 0 || !Number.isFinite(maximo)) {

        setError(presupuestoMax, 'El máximo debe ser igual o mayor que el mínimo.');
        valido = false;

    } else {
        setError(presupuestoMax, '');
    }

    // Ubicación

    if (ubicacion.value.trim().length < 3) {
        setError(ubicacion, 'Introduce la ubicación del trabajo.');
        valido = false;
    } else {
        setError(ubicacion, '');
    }

    // Comprobar imágenes

    if (document.getElementById('imagenes-error').textContent) {
        valido = false;
    }

    if (!valido) {
        message.textContent = 'Revisa los campos del formulario.';
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
    }

    // HITO 1: todavía no se publica en un servidor

    message.textContent =
        'Solicitud validada correctamente. La publicación real se implementará en un próximo hito.';

});


// ======================================
// 4. LIMPIAR ERRORES AL ESCRIBIR
// ======================================

[
    titulo,
    descripcion,
    presupuestoMin,
    presupuestoMax,
    ubicacion
].forEach((campo) => {

    campo.addEventListener('input', () => {
        setError(campo, '');
        message.textContent = '';
    });

});


// ======================================
// 5. PREVISUALIZAR IMAGENES
// ======================================

let imagenesActuales = [];

function mostrarImagenes(archivos) {

    // Limpiar vistas previas anteriores
    imagenesActuales.forEach(url => URL.revokeObjectURL(url));
    imagenesActuales = [];
    preview.replaceChildren();

    const error = document.querySelector('#imagenes-error');

    // Máximo 5 imágenes, 10 MB por imagen
    const lista = Array.from(archivos);

    if (lista.length > 5) {
        error.textContent = 'Puedes subir un máximo de 5 imágenes.';
        imagenes.value = '';
        return;
    }

    const validos = lista.every(archivo =>
        ['image/jpeg', 'image/png'].includes(archivo.type) &&
        archivo.size <= 10 * 1024 * 1024
    );

    if (!validos) {
        error.textContent = 'Utiliza imágenes JPG o PNG de hasta 10 MB.';
        imagenes.value = '';
        return;
    }

    error.textContent = '';

    lista.forEach(archivo => {

        const url = URL.createObjectURL(archivo);
        imagenesActuales.push(url);

        const imagen = document.createElement('img');
        imagen.src = url;
        imagen.alt = 'Vista previa de ' + archivo.name;

        preview.appendChild(imagen);
    });

}


// ======================================
// 6. SELECCIONAR ARCHIVOS
// ======================================

imagenes.addEventListener('change', () => {
    mostrarImagenes(imagenes.files);
});


// ======================================
// 7. ARRASTRAR IMAGENES
// ======================================

uploadBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadBox.classList.add('drag-over');
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('drag-over');
});

uploadBox.addEventListener('drop', (event) => {

    event.preventDefault();
    uploadBox.classList.remove('drag-over');

    if (event.dataTransfer.files.length > 0) {
        imagenes.files = event.dataTransfer.files;
        mostrarImagenes(imagenes.files);
    }

});

window.addEventListener('pagehide', () => {
    imagenesActuales.forEach(url => URL.revokeObjectURL(url));
});
