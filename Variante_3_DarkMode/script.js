// ============================================================
// VARIANTE 3 - DARK MODE - VALIDACIONES
// ============================================================

/**
 * Valida nombre y apellido
 * @returns {boolean}
 */
function validarNombre() {
  const input = document.getElementById("nombreApellido");
  const texto = input.value.trim();
  const errorEl = document.getElementById("errorNombre");

  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

  if (texto === "") {
    marcarError(input, errorEl, "El nombre es obligatorio");
    return false;
  }

  if (!regex.test(texto)) {
    marcarError(input, errorEl, "Solo letras y espacios son validos");
    return false;
  }

  if (texto.length < 3) {
    marcarError(input, errorEl, "Debe tener al menos 3 caracteres");
    return false;
  }

  marcarCorrecto(input, errorEl);
  return true;
}

/**
 * Valida DNI
 * @returns {boolean}
 */
function validarDNI() {
  const input = document.getElementById("dni");
  const texto = input.value.trim();
  const errorEl = document.getElementById("errorDNI");

  if (texto === "") {
    marcarError(input, errorEl, "El DNI es obligatorio");
    return false;
  }

  if (isNaN(texto)) {
    marcarError(input, errorEl, "El DNI debe contener solo numeros");
    return false;
  }

  if (texto.length !== 8) {
    marcarError(input, errorEl, "El DNI debe tener exactamente 8 digitos");
    return false;
  }

  marcarCorrecto(input, errorEl);
  return true;
}

/**
 * Valida fecha de nacimiento
 * @returns {boolean}
 */
function validarFechaNacimiento() {
  const input = document.getElementById("fechaNacimiento");
  const fecha = input.value;
  const errorEl = document.getElementById("errorFecha");

  if (!fecha) {
    marcarError(input, errorEl, "La fecha de nacimiento es obligatoria");
    return false;
  }

  const nacimiento = new Date(fecha);
  const hoy = new Date();

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const diferenciaMes = hoy.getMonth() - nacimiento.getMonth();
  
  if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  if (edad < 18) {
    marcarError(input, errorEl, "Debes tener al menos 18 años");
    return false;
  }

  marcarCorrecto(input, errorEl);
  return true;
}

// ============================================================
// Funciones auxiliares
// ============================================================

function marcarError(input, errorEl, mensaje) {
  input.classList.remove("campo-correcto");
  input.classList.add("campo-invalido");
  errorEl.textContent = mensaje;
}

function marcarCorrecto(input, errorEl) {
  input.classList.remove("campo-invalido");
  input.classList.add("campo-correcto");
  errorEl.textContent = "";
}

// ============================================================
// Evento submit del formulario
// ============================================================

document.getElementById("formInscripcion").addEventListener("submit", function (e) {
  e.preventDefault();

  const ok1 = validarNombre();
  const ok2 = validarDNI();
  const ok3 = validarFechaNacimiento();

  const banner = document.getElementById("mensajeExito");

  if (ok1 && ok2 && ok3) {
    banner.textContent = "Inscripcion completada exitosamente. Bienvenido al curso.";
    banner.classList.add("activo");
  } else {
    banner.classList.remove("activo");
  }
});

// ============================================================
// Botón de preguntas progresivas
// ============================================================

document.getElementById("btnPreguntas").addEventListener("click", function () {
  const preguntas = [
    "¿Cuál es tu nacionalidad?",
    "¿Cuál es tu nivel de conocimiento en programación? (Básico / Intermedio / Avanzado)",
    "¿Por qué elegiste esta carrera?"
  ];

  const respuestas = [];

  for (let i = 0; i < preguntas.length; i++) {
    const resp = prompt(preguntas[i]);
    respuestas.push(resp);
  }

  const contenedor = document.getElementById("respuestasContainer");
  const contenido = document.getElementById("respuestasContenido");

  let htmlRespuestas = "";

  for (let j = 0; j < respuestas.length; j++) {
    const respuesta = respuestas[j];
    
    if (respuesta === null || respuesta.trim() === "") {
      htmlRespuestas += `
        <div class="item-respuesta">
          <strong>Pregunta ${j + 1}:</strong>
          <span class="sin-respuesta">No proporcionó respuesta</span>
        </div>
      `;
    } else {
      htmlRespuestas += `
        <div class="item-respuesta">
          <strong>Pregunta ${j + 1}:</strong> ${respuesta}
        </div>
      `;
    }
  }

  contenido.innerHTML = htmlRespuestas;
  contenedor.style.display = "block";
  contenedor.scrollIntoView({ behavior: "smooth" });
});
