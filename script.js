// ============================================================
// EJERCICIO 1 — Validaciones con JavaScript
// ============================================================

/**
 * Valida el campo Nombre y Apellido.
 * Regla: solo letras y espacios, mínimo 3 caracteres.
 * @returns {boolean}
 */
function validarNombre() {
  var valor = document.getElementById("nombreApellido").value.trim();
  var mensajeEl = document.getElementById("errorNombre");
  var inputEl = document.getElementById("nombreApellido");

  // Solo letras (incluye acentuadas y ñ) y espacios
  var soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

  if (valor.length === 0) {
    mostrarError(inputEl, mensajeEl, "El nombre y apellido es obligatorio.");
    return false;
  }

  if (!soloLetras.test(valor)) {
    mostrarError(inputEl, mensajeEl, "Solo se permiten letras y espacios. Sin números ni caracteres especiales.");
    return false;
  }

  if (valor.length < 3) {
    mostrarError(inputEl, mensajeEl, "Debe tener al menos 3 caracteres.");
    return false;
  }

  mostrarExito(inputEl, mensajeEl);
  return true;
}

/**
 * Valida el campo DNI.
 * Regla: solo números, longitud exacta de 8 dígitos.
 * @returns {boolean}
 */
function validarDNI() {
  var valor = document.getElementById("dni").value.trim();
  var mensajeEl = document.getElementById("errorDNI");
  var inputEl = document.getElementById("dni");

  if (valor.length === 0) {
    mostrarError(inputEl, mensajeEl, "El DNI es obligatorio.");
    return false;
  }

  if (isNaN(valor)) {
    mostrarError(inputEl, mensajeEl, "El DNI debe contener solo números.");
    return false;
  }

  if (valor.length !== 8) {
    mostrarError(inputEl, mensajeEl, "El DNI debe tener exactamente 8 dígitos.");
    return false;
  }

  mostrarExito(inputEl, mensajeEl);
  return true;
}

/**
 * Valida el campo Fecha de Nacimiento.
 * Regla: el alumno debe ser mayor de 18 años.
 * @returns {boolean}
 */
function validarFechaNacimiento() {
  var valor = document.getElementById("fechaNacimiento").value;
  var mensajeEl = document.getElementById("errorFecha");
  var inputEl = document.getElementById("fechaNacimiento");

  if (valor === "" || valor === null) {
    mostrarError(inputEl, mensajeEl, "La fecha de nacimiento es obligatoria.");
    return false;
  }

  var fechaNac = new Date(valor);
  var hoy = new Date();

  // Calcular la edad exacta
  var edad = hoy.getFullYear() - fechaNac.getFullYear();
  var mesDiff = hoy.getMonth() - fechaNac.getMonth();
  if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  if (edad < 18) {
    mostrarError(inputEl, mensajeEl, "Debes ser mayor de 18 años para inscribirte.");
    return false;
  }

  mostrarExito(inputEl, mensajeEl);
  return true;
}

// ============================================================
// Funciones auxiliares para mostrar mensajes en el DOM
// ============================================================

/**
 * Muestra un mensaje de error debajo del campo.
 */
function mostrarError(inputEl, mensajeEl, texto) {
  inputEl.classList.remove("campo-valido");
  inputEl.classList.add("campo-error");
  mensajeEl.classList.remove("exito");
  mensajeEl.classList.add("error");
  mensajeEl.innerHTML = texto;
}

/**
 * Limpia los mensajes de error y marca el campo como válido.
 */
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

  var mensajeExitoEl = document.getElementById("mensajeExito");

  var nombreValido = validarNombre();
  var dniValido = validarDNI();
  var fechaValida = validarFechaNacimiento();

  if (nombreValido && dniValido && fechaValida) {
    mensajeExitoEl.classList.remove("error");
    mensajeExitoEl.classList.add("exito");
    mensajeExitoEl.innerHTML = "✔ Inscripción enviada correctamente. ¡Bienvenido/a al curso!";
  } else {
    mensajeExitoEl.innerHTML = "";
  }
});

// ============================================================
// EJERCICIO 2 — Botón de Preguntas Progresivas
// ============================================================

document.getElementById("btnPreguntas").addEventListener("click", function () {
  var preguntas = [
    "¿Cuál es tu nacionalidad?",
    "¿Cuál es tu nivel de conocimiento en programación? (Básico / Intermedio / Avanzado)",
    "¿Por qué elegiste esta carrera?"
  ];

  var respuestas = [];

  // Hacer las 3 preguntas de forma progresiva
  for (var i = 0; i < preguntas.length; i++) {
    var respuesta = prompt(preguntas[i]);
    respuestas.push(respuesta);
  }

  // Construir el HTML con las respuestas y mostrarlo en el DOM
  var contenedor = document.getElementById("respuestasContainer");
  var contenido = document.getElementById("respuestasContenido");

  var html = "";

  for (var j = 0; j < preguntas.length; j++) {
    if (respuestas[j] === null || respuestas[j].trim() === "") {
      html += '<div class="respuesta-item">'
           + '<strong>Pregunta ' + (j + 1) + ':</strong> '
           + '<span class="respuesta-cancelada">No respondió esta pregunta.</span>'
           + '</div>';
    } else {
      html += '<div class="respuesta-item">'
           + '<strong>Pregunta ' + (j + 1) + ':</strong> '
           + respuestas[j]
           + '</div>';
    }
  }

  contenido.innerHTML = html;
  contenedor.style.display = "block";

  // Desplazar suavemente hacia las respuestas
  contenedor.scrollIntoView({ behavior: "smooth" });
});
