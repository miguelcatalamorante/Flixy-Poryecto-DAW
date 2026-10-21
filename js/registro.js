
// ======================================
// FIXLY - REGISTRO JAVASCRIPT
// ======================================

// Elementos del formulario

const form = document.querySelector('#registro-form');
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const telefono = document.querySelector('#telefono');
const password = document.querySelector('#password');
const togglePassword = document.querySelector('.toggle-password');
const message = document.querySelector('#form-message');


// ======================================
// MOSTRAR OJO SOLO CUANDO HAY TEXTO
// ======================================

function actualizarOjo() {

    const tieneTexto = password.value.length > 0;

    togglePassword.hidden = !tieneTexto;

    if (!tieneTexto) {
        password.type = 'password';
        togglePassword.setAttribute('aria-pressed', 'false');
        togglePassword.setAttribute('aria-label', 'Mostrar contraseña');
    }

    actualizarIcono();
}


// ======================================
// ACTUALIZAR ICONO DEL OJO
// ======================================

function actualizarIcono() {

    const visible = password.type === 'text';

    togglePassword.innerHTML = visible
        ? `<svg viewBox="0 0 24 24" aria-hidden="true">
             <path d="M3 3l18 18"/>
             <path d="M10.6 6.1A11 11 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-4 4.4"/>
             <path d="M6.2 6.2C3.5 8.1 2 12 2 12s3.5 6 10 6c1.4 0 2.7-.3 3.9-.8"/>
             <path d="M10 10a3 3 0 0 0 4 4"/>
           </svg>`
        : `<svg viewBox="0 0 24 24" aria-hidden="true">
             <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/>
             <circle cx="12" cy="12" r="3"/>
           </svg>`;
}


// ======================================
// MOSTRAR / OCULTAR CONTRASEÑA
// ======================================

togglePassword.addEventListener('click', () => {

    const mostrar = password.type === 'password';

    password.type = mostrar ? 'text' : 'password';

    togglePassword.setAttribute(
        'aria-pressed',
        String(mostrar)
    );

    togglePassword.setAttribute(
        'aria-label',
        mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña'
    );

    togglePassword.title = mostrar
        ? 'Ocultar contraseña'
        : 'Mostrar contraseña';

    actualizarIcono();
});


// ======================================
// MOSTRAR ERRORES
// ======================================

function setError(input, texto) {

    const error = document.querySelector(`#${input.id}-error`);

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
// VALIDAR FORMULARIO
// ======================================

form.addEventListener('submit', (event) => {

    event.preventDefault();

    message.textContent = '';
    message.classList.remove('success');

    const nombreValue = nombre.value.trim();
    const emailValue = email.value.trim();
    const telefonoValue = telefono.value.trim();
    const passwordValue = password.value;

    const tipoUsuario = document.querySelector(
        'input[name="tipoUsuario"]:checked'
    );

    let valido = true;


    // VALIDAR NOMBRE

    if (nombreValue.length < 3) {
        setError(nombre, 'Introduce tu nombre completo.');
        valido = false;
    } else {
        setError(nombre, '');
    }


    // VALIDAR EMAIL

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!validEmail) {
        setError(email, 'Introduce un correo electrónico válido.');
        valido = false;
    } else {
        setError(email, '');
    }


    // VALIDAR TELEFONO

    const telefonoLimpio = telefonoValue.replace(/[\s-]/g, '');

    const validTelefono = /^(\+34)?[6789]\d{8}$/.test(telefonoLimpio);

    if (!validTelefono) {
        setError(telefono, 'Introduce un teléfono español válido.');
        valido = false;
    } else {
        setError(telefono, '');
    }


    // VALIDAR CONTRASEÑA

    if (passwordValue.length < 8) {
        setError(password, 'La contraseña debe tener al menos 8 caracteres.');
        valido = false;
    } else {
        setError(password, '');
    }


    // VALIDAR TIPO DE USUARIO

    if (!tipoUsuario) {
        valido = false;
    }


    // DETENER SI HAY ERRORES

    if (!valido) {
        message.textContent = 'Revisa los campos marcados.';
        return;
    }


    // FORMULARIO CORRECTO

    message.classList.add('success');

    message.textContent =
        'Datos validados correctamente. El registro real estará disponible cuando conectemos el backend.';

    console.log('Tipo de usuario seleccionado:', tipoUsuario.value);

});


// ======================================
// LIMPIAR ERRORES AL ESCRIBIR
// ======================================

[nombre, email, telefono, password].forEach((campo) => {

    campo.addEventListener('input', () => {

        setError(campo, '');

        message.textContent = '';
        message.classList.remove('success');

        if (campo === password) {
            actualizarOjo();
        }

    });

});


// ======================================
// ESTADO INICIAL
// ======================================

actualizarOjo();
