// ============================================================
// VARIANTE 4 - BOOTSTRAP - VALIDACIONES
// ============================================================

/**
 * Valida el campo Nombre y Apellido
 * @returns {boolean}
 */
function validarNombre() {
  const campo = document.getElementById("nombreApellido");
  const valor = campo.value.trim();
  const errorDiv = document.getElementById("errorNombre");

  const patronLetras = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

  if (valor.length === 0) {
    setInvalido(campo, errorDiv, "El nombre y apellido es obligatorio.");
    return false;
  }

  if (!patronLetras.test(valor)) {
    setInvalido(campo, errorDiv, "Solo se permiten letras y espacios.");
    return false;
  }

  if (valor.length < 3) {
    setInvalido(campo, errorDiv, "Debe tener al menos 3 caracteres.");
    return false;
  }

  setValido(campo, errorDiv);
  return true;
}

/**
 * Valida el campo DNI
 * @returns {boolean}
 */
function validarDNI() {
  const campo = document.getElementById("dni");
  const valor = campo.value.trim();
  const errorDiv = document.getElementById("errorDNI");

  if (valor.length === 0) {
    setInvalido(campo, errorDiv, "El DNI es obligatorio.");
    return false;
  }

  if (isNaN(valor)) {
    setInvalido(campo, errorDiv, "El DNI debe contener solo números.");
    return false;
  }

  if (valor.length !== 8) {
    setInvalido(campo, errorDiv, "El DNI debe tener exactamente 8 dígitos.");
    return false;
  }

  setValido(campo, errorDiv);
  return true;
}

/**
 * Valida el campo Fecha de Nacimiento
 * @returns {boolean}
 */
function validarFechaNacimiento() {
  const campo = document.getElementById("fechaNacimiento");
  const valor = campo.value;
  const errorDiv = document.getElementById("errorFecha");

  if (!valor) {
    setInvalido(campo, errorDiv, "La fecha de nacimiento es obligatoria.");
    return false;
  }

  const fechaNac = new Date(valor);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const diferenciaMes = hoy.getMonth() - fechaNac.getMonth();
  if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  if (edad < 18) {
    setInvalido(campo, errorDiv, "Debes ser mayor de 18 años para inscribirte.");
    return false;
  }

  setValido(campo, errorDiv);
  return true;
}

// ============================================================
// Funciones auxiliares para Bootstrap
// ============================================================

function setInvalido(campo, errorDiv, mensaje) {
  campo.classList.remove("is-valid");
  campo.classList.add("is-invalid");
  errorDiv.textContent = mensaje;
  errorDiv.style.display = "block";
}

function setValido(campo, errorDiv) {
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
  errorDiv.textContent = "";
  errorDiv.style.display = "none";
}

// ============================================================
// Manejo del envío del formulario
// ============================================================

document.getElementById("formInscripcion").addEventListener("submit", function (e) {
  e.preventDefault();

  const esNombreValido = validarNombre();
  const esDniValido = validarDNI();
  const esFechaValida = validarFechaNacimiento();

  const mensajeExito = document.getElementById("mensajeExito");
  const textoExito = document.getElementById("textoExito");

  if (esNombreValido && esDniValido && esFechaValida) {
    textoExito.textContent = "¡Inscripción realizada con éxito! Te esperamos en el curso.";
    mensajeExito.classList.remove("d-none");
    mensajeExito.classList.add("show");
  } else {
    mensajeExito.classList.add("d-none");
    mensajeExito.classList.remove("show");
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

  // Realizar las 3 preguntas de forma progresiva
  for (let i = 0; i < preguntas.length; i++) {
    const respuesta = prompt(preguntas[i]);
    respuestas.push(respuesta);
  }

  // Mostrar las respuestas en el DOM
  const contenedor = document.getElementById("respuestasContainer");
  const contenido = document.getElementById("respuestasContenido");

  let htmlItems = "";

  for (let j = 0; j < respuestas.length; j++) {
    if (respuestas[j] === null || respuestas[j].trim() === "") {
      htmlItems += `
        <div class="list-group-item">
          <strong>Pregunta ${j + 1}:</strong> 
          <span class="respuesta-no-contestada">No respondió esta pregunta.</span>
        </div>
      `;
    } else {
      htmlItems += `
        <div class="list-group-item">
          <strong>Pregunta ${j + 1}:</strong> ${respuestas[j]}
        </div>
      `;
    }
  }

  contenido.innerHTML = htmlItems;
  contenedor.style.display = "block";
  
  // Scroll suave hacia las respuestas
  contenedor.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
