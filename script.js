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
