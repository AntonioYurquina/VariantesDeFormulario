// ============================================================
// VARIANTE 2 - VALIDACIONES MINIMALISTAS
// ============================================================

/**
 * Valida nombre y apellido
 * @returns {boolean}
 */
function validarNombre() {
  const campo = document.getElementById("nombreApellido");
  const valor = campo.value.trim();
  const error = document.getElementById("errorNombre");

  const patronLetras = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

  if (!valor) {
    setError(campo, error, "Campo obligatorio");
    return false;
  }

  if (!patronLetras.test(valor)) {
    setError(campo, error, "Solo se permiten letras");
    return false;
  }

  if (valor.length < 3) {
    setError(campo, error, "Mínimo 3 caracteres");
    return false;
  }

  setValido(campo, error);
  return true;
}

/**
 * Valida DNI
 * @returns {boolean}
 */
function validarDNI() {
  const campo = document.getElementById("dni");
  const valor = campo.value.trim();
  const error = document.getElementById("errorDNI");

  if (!valor) {
    setError(campo, error, "Campo obligatorio");
    return false;
  }

  if (isNaN(valor)) {
    setError(campo, error, "Solo números");
    return false;
  }

  if (valor.length !== 8) {
    setError(campo, error, "Debe tener 8 dígitos");
    return false;
  }

  setValido(campo, error);
  return true;
}

/**
 * Valida fecha de nacimiento
 * @returns {boolean}
 */
function validarFechaNacimiento() {
  const campo = document.getElementById("fechaNacimiento");
  const valor = campo.value;
  const error = document.getElementById("errorFecha");

  if (!valor) {
    setError(campo, error, "Campo obligatorio");
    return false;
  }

  const fecha = new Date(valor);
  const ahora = new Date();

  let edad = ahora.getFullYear() - fecha.getFullYear();
  const mes = ahora.getMonth() - fecha.getMonth();
  if (mes < 0 || (mes === 0 && ahora.getDate() < fecha.getDate())) {
    edad--;
  }

  if (edad < 18) {
    setError(campo, error, "Debes ser mayor de 18 años");
    return false;
  }

  setValido(campo, error);
  return true;
}

// ============================================================
// Utilidades
// ============================================================

function setError(campo, errorEl, mensaje) {
  campo.classList.remove("valido");
  campo.classList.add("invalido");
  errorEl.textContent = mensaje;
}

function setValido(campo, errorEl) {
  campo.classList.remove("invalido");
  campo.classList.add("valido");
  errorEl.textContent = "";
}

// ============================================================
// Eventos
// ============================================================

document.getElementById("formInscripcion").addEventListener("submit", function (e) {
  e.preventDefault();

  const v1 = validarNombre();
  const v2 = validarDNI();
  const v3 = validarFechaNacimiento();

  const msgExito = document.getElementById("mensajeExito");

  if (v1 && v2 && v3) {
    msgExito.textContent = "✓ Inscripción realizada con éxito";
    msgExito.style.display = "block";
  } else {
    msgExito.style.display = "none";
  }
});

// ============================================================
// Preguntas progresivas
// ============================================================

document.getElementById("btnPreguntas").addEventListener("click", function () {
  const preguntas = [
    "¿Cuál es tu nacionalidad?",
    "¿Cuál es tu nivel de conocimiento en programación? (Básico / Intermedio / Avanzado)",
    "¿Por qué elegiste esta carrera?"
  ];

  const respuestas = preguntas.map(p => prompt(p));

  const contenedor = document.getElementById("respuestasContainer");
  const contenido = document.getElementById("respuestasContenido");

  let html = "";

  respuestas.forEach((resp, i) => {
    if (resp === null || resp.trim() === "") {
      html += `<div class="respuesta-linea">
                 <strong>P${i + 1}:</strong> <span class="no-respuesta">Sin respuesta</span>
               </div>`;
    } else {
      html += `<div class="respuesta-linea">
                 <strong>P${i + 1}:</strong> ${resp}
               </div>`;
    }
  });

  contenido.innerHTML = html;
  contenedor.style.display = "block";
  contenedor.scrollIntoView({ behavior: "smooth" });
});
