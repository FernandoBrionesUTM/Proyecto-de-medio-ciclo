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

const mensajesError = {
  nombre: { valueMissing: "Error: escribe tu nombre completo." },
  correo: {
    valueMissing: "Error: escribe tu correo electrónico.",
    typeMismatch: "Error: el correo debe tener un formato como nombre@ejemplo.com."
  },
  edad: {
    badInput: "Error: la edad debe ser un número entre 12 y 90.",
    valueMissing: "Error: escribe tu edad.",
    rangeUnderflow: "Error: la edad mínima es 12 años.",
    rangeOverflow: "Error: la edad máxima es 90 años."
  },
  plan: { valueMissing: "Error: elige un plan." },
  acepto: { valueMissing: "Error: debes aceptar las normas del gimnasio." }
};

function textoDeError(campo) {
  const reglas = mensajesError[campo.id];
  for (const regla in reglas) {
    if (campo.validity[regla]) {
      return reglas[regla];
    }
  }
  return "";
}

function revisarCampo(campo) {
  const mensaje = textoDeError(campo);
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

  const nombre = document.getElementById("nombre").value;
  const plan = document.getElementById("plan").value;
  mensaje.textContent = "¡Listo " + nombre + "! Te inscribiste en el plan " + plan + ".";
  formulario.reset();
}

if (formulario) {
  formulario.noValidate = true;
  formulario.addEventListener("submit", enviarFormulario);
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
