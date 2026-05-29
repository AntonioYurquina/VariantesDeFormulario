// ============================================================
// VARIANTE 1 - VALIDACIONES CON JAVASCRIPT
// ============================================================

/**
 * Valida el campo Nombre y Apellido.
 * @returns {boolean}
 */
function validarNombre() {
  const valor = document.getElementById("nombreApellido").value.trim();
  const mensajeEl = document.getElementById("errorNombre");
  const inputEl = document.getElementById("nombreApellido");

  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

  if (valor.length === 0) {
    mostrarError(inputEl, mensajeEl, "Este campo es obligatorio.");
    return false;
  }

  if (!soloLetras.test(valor)) {
    mostrarError(inputEl, mensajeEl, "Solo letras y espacios permitidos.");
    return false;
  }

  if (valor.length < 3) {
    mostrarError(inputEl, mensajeEl, "Minimo 3 caracteres requeridos.");
    return false;
  }

  mostrarExito(inputEl, mensajeEl);
  return true;
}

/**
 * Valida el campo DNI.
 * @returns {boolean}
 */
function validarDNI() {
  const valor = document.getElementById("dni").value.trim();
  const mensajeEl = document.getElementById("errorDNI");
  const inputEl = document.getElementById("dni");

  if (valor.length === 0) {
    mostrarError(inputEl, mensajeEl, "El DNI es obligatorio.");
    return false;
  }

  if (isNaN(valor)) {
    mostrarError(inputEl, mensajeEl, "Solo numeros permitidos.");
    return false;
  }

  if (valor.length !== 8) {
    mostrarError(inputEl, mensajeEl, "Debe tener exactamente 8 digitos.");
    return false;
  }

  mostrarExito(inputEl, mensajeEl);
  return true;
}

/**
 * Valida el campo Fecha de Nacimiento.
 * @returns {boolean}
 */
function validarFechaNacimiento() {
  const valor = document.getElementById("fechaNacimiento").value;
  const mensajeEl = document.getElementById("errorFecha");
  const inputEl = document.getElementById("fechaNacimiento");

  if (!valor) {
    mostrarError(inputEl, mensajeEl, "La fecha es obligatoria.");
    return false;
  }

  const fechaNac = new Date(valor);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mesDiff = hoy.getMonth() - fechaNac.getMonth();
  if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  if (edad < 18) {
    mostrarError(inputEl, mensajeEl, "Debes ser mayor de 18 años.");
    return false;
  }

  mostrarExito(inputEl, mensajeEl);
  return true;
}

// ============================================================
// Funciones auxiliares
// ============================================================

function mostrarError(inputEl, mensajeEl, texto) {
  inputEl.classList.remove("campo-valido");
  inputEl.classList.add("campo-error");
  mensajeEl.classList.remove("exito");
  mensajeEl.classList.add("error");
  mensajeEl.innerHTML = texto;
}

function mostrarExito(inputEl, mensajeEl) {
  inputEl.classList.remove("campo-error");
  inputEl.classList.add("campo-valido");
  mensajeEl.classList.remove("error");
  mensajeEl.innerHTML = "";
}

// ============================================================
// Manejo del envío del formulario
// ============================================================

document.getElementById("formInscripcion").addEventListener("submit", function (e) {
  e.preventDefault();

  const mensajeExitoEl = document.getElementById("mensajeExito");

  const nombreValido = validarNombre();
  const dniValido = validarDNI();
  const fechaValida = validarFechaNacimiento();

  if (nombreValido && dniValido && fechaValida) {
    mensajeExitoEl.classList.remove("error");
    mensajeExitoEl.classList.add("exito");
    mensajeExitoEl.innerHTML = "Inscripcion exitosa. Todos los datos son correctos.";
  } else {
    mensajeExitoEl.innerHTML = "";
  }
});

// ============================================================
// Botón de Preguntas Progresivas
// ============================================================

document.getElementById("btnPreguntas").addEventListener("click", function () {
  const preguntas = [
    "¿Cuál es tu nacionalidad?",
    "¿Cuál es tu nivel de conocimiento en programación? (Básico / Intermedio / Avanzado)",
    "¿Por qué elegiste esta carrera?"
  ];

  const respuestas = [];

  for (let i = 0; i < preguntas.length; i++) {
    const respuesta = prompt(preguntas[i]);
    respuestas.push(respuesta);
  }

  const contenedor = document.getElementById("respuestasContainer");
  const contenido = document.getElementById("respuestasContenido");

  let html = "";

  for (let j = 0; j < preguntas.length; j++) {
    if (respuestas[j] === null || respuestas[j].trim() === "") {
      html += `<div class="respuesta-item">
                 <strong>Pregunta ${j + 1}:</strong> 
                 <span class="respuesta-cancelada">No respondió esta pregunta.</span>
               </div>`;
    } else {
      html += `<div class="respuesta-item">
                 <strong>Pregunta ${j + 1}:</strong> ${respuestas[j]}
               </div>`;
    }
  }

  contenido.innerHTML = html;
  contenedor.style.display = "block";
  contenedor.scrollIntoView({ behavior: "smooth" });
});
