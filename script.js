const botonMensual = document.getElementById("btn-mensual");
const botonAnual = document.getElementById("btn-anual");

function mostrarPrecios(tipo) {
  const montos = document.querySelectorAll(".monto");
  const periodos = document.querySelectorAll(".periodo");

  for (const monto of montos) {
    monto.textContent = "$" + monto.dataset[tipo];
  }
  for (const periodo of periodos) {
    periodo.textContent = tipo === "mensual" ? "/ mes" : "/ año";
  }

  botonMensual.setAttribute("aria-pressed", String(tipo === "mensual"));
  botonAnual.setAttribute("aria-pressed", String(tipo === "anual"));
  document.getElementById("tipo-precio").textContent =
    tipo === "mensual" ? "Mostrando precios mensuales" : "Mostrando precios anuales (2 meses gratis)";
}

if (botonMensual && botonAnual) {
  botonMensual.addEventListener("click", function () {
    mostrarPrecios("mensual");
  });
  botonAnual.addEventListener("click", function () {
    mostrarPrecios("anual");
  });
}

const enlacesPlan = document.querySelectorAll("[data-plan]");

for (const enlace of enlacesPlan) {
  enlace.addEventListener("click", function () {
    document.getElementById("plan").value = enlace.dataset.plan;
  });
}

const formulario = document.getElementById("inscripcion");

const PLANES = ["Básico", "Premium", "VIP"];
const SOLO_LETRAS = /^\p{L}+(?:['’-]\p{L}+)*(?: \p{L}+(?:['’-]\p{L}+)*)+$/u;
const CORREO = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

function limpiarEspacios(texto) {
  return texto.trim().replace(/\s+/g, " ");
}

function errorNombre(campo) {
  const nombre = limpiarEspacios(campo.value);
  if (nombre === "") {
    return "Error: escribe tu nombre completo.";
  }
  if (!/^[\p{L} '’-]+$/u.test(nombre)) {
    return "Error: el nombre solo puede tener letras, espacios, guion o apóstrofe.";
  }
  if (!SOLO_LETRAS.test(nombre)) {
    return "Error: escribe al menos un nombre y un apellido.";
  }
  if (nombre.length < 5 || nombre.length > 60) {
    return "Error: el nombre debe tener entre 5 y 60 caracteres.";
  }
  return "";
}

function errorCorreo(campo) {
  const correo = campo.value.trim();
  if (correo === "") {
    return "Error: escribe tu correo electrónico.";
  }
  if (correo.length > 80 || !CORREO.test(correo)) {
    return "Error: el correo debe tener un formato como nombre@ejemplo.com.";
  }
  return "";
}

function errorEdad(campo) {
  const texto = campo.value.trim();
  if (campo.validity.badInput) {
    return "Error: la edad debe ser un número entre 12 y 90.";
  }
  if (texto === "") {
    return "Error: escribe tu edad.";
  }
  if (!/^\d+$/.test(texto)) {
    return "Error: la edad debe ser un número entero, sin decimales ni signos.";
  }
  if (Number(texto) < 12) {
    return "Error: la edad mínima es 12 años.";
  }
  if (Number(texto) > 90) {
    return "Error: la edad máxima es 90 años.";
  }
  return "";
}

function errorPlan(campo) {
  return PLANES.includes(campo.value) ? "" : "Error: elige un plan.";
}

function errorAcepto(campo) {
  return campo.checked ? "" : "Error: debes aceptar las normas del gimnasio.";
}

const validadores = {
  nombre: errorNombre,
  correo: errorCorreo,
  edad: errorEdad,
  plan: errorPlan,
  acepto: errorAcepto
};

function revisarCampo(campo) {
  const mensaje = validadores[campo.id](campo);
  document.getElementById("error-" + campo.id).textContent = mensaje;

  if (mensaje === "") {
    campo.removeAttribute("aria-invalid");
    return true;
  }
  campo.setAttribute("aria-invalid", "true");
  return false;
}

function enviarFormulario(evento) {
  evento.preventDefault();

  const mensaje = document.getElementById("mensaje");
  let primerError = null;

  for (const campo of formulario.querySelectorAll("input, select")) {
    if (!revisarCampo(campo) && primerError === null) {
      primerError = campo;
    }
  }

  if (primerError !== null) {
    mensaje.textContent = "";
    primerError.focus();
    return;
  }

  const nombre = limpiarEspacios(document.getElementById("nombre").value);
  const plan = document.getElementById("plan").value;
  mensaje.textContent = "¡Listo " + nombre + "! Te inscribiste en el plan " + plan + ".";
  formulario.reset();
}

if (formulario) {
  formulario.noValidate = true;
  formulario.addEventListener("submit", enviarFormulario);

  formulario.addEventListener("focusout", function (evento) {
    const campo = evento.target;
    const destino = evento.relatedTarget;
    if (destino && destino.type === "submit") {
      return;
    }
    if (campo.id === "nombre") {
      campo.value = limpiarEspacios(campo.value);
    }
    if (validadores[campo.id]) {
      revisarCampo(campo);
    }
  });

  formulario.addEventListener("input", function (evento) {
    const campo = evento.target;
    document.getElementById("mensaje").textContent = "";
    if (campo.getAttribute("aria-invalid") === "true") {
      revisarCampo(campo);
    }
  });

  formulario.addEventListener("change", function (evento) {
    const campo = evento.target;
    if (campo.id === "plan" || campo.id === "acepto") {
      revisarCampo(campo);
    }
  });
}

const botonesContratar = document.querySelectorAll("[data-precio]");
const campoSesiones = document.getElementById("sesiones");

function contratar(evento) {
  const boton = evento.currentTarget;
  const entrenador = boton.closest("article").querySelector("h3").textContent;
  const precio = Number(boton.dataset.precio);
  const sesiones = Number(campoSesiones.value);
  const error = document.getElementById("error-sesiones");
  const reserva = document.getElementById("reserva");

  if (campoSesiones.value === "" || !Number.isInteger(sesiones) || sesiones < 1) {
    error.textContent = "Error: escribe un número entero de sesiones, mínimo 1.";
    campoSesiones.setAttribute("aria-invalid", "true");
    reserva.textContent = "";
    campoSesiones.focus();
    return;
  }

  error.textContent = "";
  campoSesiones.removeAttribute("aria-invalid");

  let total = sesiones * precio;
  if (sesiones >= 10) {
    total = total * 0.9;
  }
  reserva.textContent = "Reservaste " + sesiones + " sesión(es) con " + entrenador + ". Total: $" + total.toFixed(2);
}

for (const boton of botonesContratar) {
  boton.addEventListener("click", contratar);
}
