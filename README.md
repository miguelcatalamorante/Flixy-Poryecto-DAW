# FIXLY — Plataforma web de servicios locales

**Proyecto Interdisciplinar | 2.º Desarrollo de Aplicaciones Web (DAW)**

FIXLY es una plataforma web diseñada para conectar a personas que necesitan contratar servicios con profesionales de su zona.

La idea surge de simplificar la búsqueda de profesionales para tareas cotidianas, como reparaciones domésticas, instalaciones, limpieza o mudanzas. En lugar de contactar individualmente con diferentes empresas, el usuario puede publicar una solicitud, recibir propuestas y comparar las opciones disponibles desde un mismo lugar.

Este repositorio recoge el desarrollo de FIXLY como proyecto académico, desde el diseño de la interfaz hasta su futura implementación como aplicación web completa.

## Vista previa de FIXLY

### Dashboard principal

<img width="1597" height="808" alt="image" src="https://github.com/user-attachments/assets/7301b422-08f0-46fa-90f7-2e195a8f7a5f" />

### Inicio de sesión

<img width="1595" height="804" alt="image" src="https://github.com/user-attachments/assets/74c1ba35-f7d3-4b72-ab82-bcf6c95a2a51" />

### Registro de usuarios

<img width="1595" height="804" alt="image" src="https://github.com/user-attachments/assets/2cd66075-0160-4f44-b64e-4eeedb558b28" />

### Publicar solicitud

<img width="1597" height="808" alt="image" src="https://github.com/user-attachments/assets/370758d9-8661-463e-951b-9cb131dec127" />

### Detalle de solicitud

<img width="1597" height="808" alt="image" src="https://github.com/user-attachments/assets/addce45d-b00a-41c8-aaa7-999a1a607805" />

### Comparación de ofertas

<img width="1597" height="808" alt="image" src="https://github.com/user-attachments/assets/593cb4c0-82b4-440d-9ca9-50fde29fca16" />

### Centro de mensajes

<img width="1597" height="808" alt="image" src="https://github.com/user-attachments/assets/c947baf1-4d83-4dfc-babe-0a79c8a7fde6" />

---

## Funcionalidades

La versión actual se centra en la maquetación y la interacción básica del frontend.

- **Inicio de sesión:** formulario con validación de campos y opción de mostrar u ocultar la contraseña.
- **Registro de usuarios:** formulario para registrarse como cliente o profesional.
- **Dashboard:** pantalla principal con buscador y categorías de servicios.
- **Publicación de solicitudes:** formulario para indicar el trabajo, categoría, presupuesto, ubicación e imágenes.
- **Selección de categorías:** al elegir un servicio desde el Dashboard, se abre el formulario con la categoría seleccionada automáticamente.
- **Detalle de solicitudes:** visualización del trabajo publicado, su estado e información relevante.
- **Comparación de ofertas:** pantalla con propuestas de distintos profesionales, precios y valoraciones.
- **Perfiles profesionales:** información sobre experiencia, servicios y opiniones.
- **Confirmación de ofertas:** ventana interactiva para simular la selección de un profesional.
- **Centro de mensajes:** interfaz de conversaciones con mensajes de demostración.

Actualmente, los datos de las solicitudes, los profesionales y las ofertas son ficticios y se utilizan para demostrar el funcionamiento de la interfaz.

## Tecnologías utilizadas

| Tecnología | Utilización |
|---|---|
| HTML5 | Estructura semántica de las páginas |
| CSS3 | Diseño visual, estilos y animaciones |
| JavaScript | Validaciones, navegación e interacciones |
| CSS Grid | Distribución de tarjetas y contenidos |
| Flexbox | Alineación y organización de elementos |
| Media Queries | Adaptación a diferentes dispositivos |
| Figma | Diseño y prototipado de interfaces |
| Git y GitHub | Control de versiones y repositorio |
| Visual Studio Code | Entorno de desarrollo |

El proyecto se desarrolla sin frameworks de frontend, utilizando HTML, CSS y JavaScript.

## Estructura del proyecto

```text
Fixly-Proyecto-DAW/
│
├── css/
│   ├── style.css
│   ├── solicitudes.css
│   └── mensajes.css
│
├── html/
│   ├── index.html
│   ├── login.html
│   ├── registro.html
│   ├── crear.html
│   ├── detalle.html
│   ├── ofertas.html
│   ├── profesional.html
│   └── mensajes.html
│
├── img/
│
├── js/
│   ├── index.js
│   ├── login.js
│   ├── registro.js
│   ├── crear.js
│   ├── solicitudes.js
│   └── mensajes.js
│
└── README.md
```

La estructura separa el HTML, CSS y JavaScript para facilitar el mantenimiento y la organización del código.

*La estructura mostrada corresponde a la organización prevista de las pantallas del Hito 1 y puede actualizarse conforme avance su implementación.*

---

## Hito 1 — Maquetación HTML5 y CSS Responsive

**Objetivo:** transformar el prototipo diseñado en Figma en páginas web navegables, utilizando HTML5 semántico y CSS3.

### Desarrollo

Durante este hito se trabaja en:

1. Creación de las páginas principales de FIXLY.
2. Utilización de etiquetas semánticas como `header`, `nav`, `main`, `section`, `article` y `footer`.
3. Definición de variables CSS para mantener una identidad visual consistente.
4. Maquetación mediante CSS Grid y Flexbox.
5. Diseño Mobile First y adaptación responsive.
6. Navegación entre las distintas pantallas.
7. Validación básica de formularios e interacciones con JavaScript.

El diseño utiliza una identidad visual basada en tonos azules, fondos claros, tipografía Inter y componentes reutilizables.

## Cómo ejecutar el proyecto

No es necesario instalar dependencias ni configurar un servidor backend.

**Opción recomendada: Visual Studio Code con Live Server**

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Instalar la extensión **Live Server**.
4. Abrir `html/index.html`.
5. Seleccionar **Open with Live Server**.

También es posible abrir los archivos HTML directamente desde un navegador, aunque se recomienda Live Server para facilitar el desarrollo.

## Flujo de navegación

El recorrido principal de FIXLY está diseñado de la siguiente manera:

```text
LOGIN / REGISTRO
       |
       v
DASHBOARD PRINCIPAL
       |
       +---- PUBLICAR SOLICITUD
       |            |
       |            v
       |       FORMULARIO
       |
       +---- MIS SOLICITUDES
       |            |
       |            v
       |     DETALLE SOLICITUD
       |            |
       |            v
       |      COMPARAR OFERTAS
       |            |
       |            v
       |      VER PROFESIONAL
       |            |
       |            v
       |      ACEPTAR OFERTA
       |
       +---- MENSAJES
```

Las pantallas están pensadas para ofrecer una navegación sencilla, tanto desde ordenador como desde dispositivos móviles.

## Estado actual y limitaciones

FIXLY se encuentra en fase de desarrollo académico.

La versión del Hito 1 está orientada a demostrar el diseño, la navegación y las interacciones del frontend.

Por el momento:

- No existe autenticación real de usuarios.
- Los formularios no envían información a una base de datos.
- Las ofertas y perfiles mostrados son ejemplos.
- La aceptación de un servicio es una simulación.
- El centro de mensajes no permite conversar con usuarios reales.

Estas funcionalidades se incorporarán progresivamente en futuras etapas del proyecto.

## Próximas mejoras

- Implementación del backend.
- Diseño y conexión de la base de datos.
- Autenticación y gestión de sesiones.
- Registro real de clientes y profesionales.
- Operaciones CRUD de solicitudes y ofertas.
- Gestión del estado de contratación.
- Mensajería entre usuarios.
- Sistema de valoraciones.
- Pruebas y despliegue de la aplicación.

## Autor

**Miguel Catalá Morante**

Estudiante de Desarrollo de Aplicaciones Web (DAW).

GitHub: [miguelcatalamorante](https://github.com/miguelcatalamorante)

---

**FIXLY** — Soluciones locales. Resultados de confianza.
