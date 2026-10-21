
const form = document.querySelector('#login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const togglePassword = document.querySelector('.toggle-password');
const message = document.querySelector('#form-message');

function actualizarOjo() {
    // Mostrar el ojo solo si hay una contraseña escrita
    togglePassword.style.display =
        password.value.length > 0 ? 'flex' : 'none';
}

// Comprobar cuando el usuario escribe
password.addEventListener('input', actualizarOjo);

// Ocultar el ojo al cargar la página si está vacío
actualizarOjo();

// Mostrar errores en los campos
function setError(input, text) {
    const error = document.querySelector(`#${input.id}-error`);

    error.textContent = text;
    input.setAttribute('aria-invalid', text ? 'true' : 'false');
    input.setAttribute('aria-describedby', text ? error.id : '');
}

// Mostrar u ocultar contraseña
togglePassword.addEventListener('click', () => {
    const visible = password.type === 'password';

    password.type = visible ? 'text' : 'password';

    togglePassword.setAttribute('aria-pressed', String(visible));
    togglePassword.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
    togglePassword.title = visible ? 'Ocultar contraseña' : 'Mostrar contraseña';
});

// Validar formulario al iniciar sesión
form.addEventListener('submit', (event) => {
    event.preventDefault();

    message.textContent = '';

    const emailValue = email.value.trim();
    const passwordValue = password.value;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    setError(
        email,
        !emailValue
            ? 'Introduce tu correo electrónico.'
            : !validEmail
                ? 'Introduce un correo válido.'
                : ''
    );

    setError(
        password,
        !passwordValue ? 'Introduce tu contraseña.' : ''
    );

    if (!validEmail || !passwordValue) {
        return;
    }

// Navegar al Dashboard tras validar el formulario
window.location.href = "index.html";});

// Limpiar errores al escribir
email.addEventListener('input', () => {
    setError(email, '');
    message.textContent = '';
});

password.addEventListener('input', () => {
    setError(password, '');
    message.textContent = '';
});

// Boton de Google
document.querySelector('#google-login').addEventListener('click', () => {
    message.textContent = 'El acceso con Google requiere configurar OAuth en el backend.';
});
