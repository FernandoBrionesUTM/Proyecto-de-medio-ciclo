function precioMensual() {
  document.getElementById("precio1").innerHTML = "$20 <small>/ mes</small>";
  document.getElementById("precio2").innerHTML = "$35 <small>/ mes</small>";
  document.getElementById("precio3").innerHTML = "$50 <small>/ mes</small>";
  document.getElementById("tipo-precio").innerHTML = "Mostrando precios mensuales";
}

function precioAnual() {
  document.getElementById("precio1").innerHTML = "$200 <small>/ año</small>";
  document.getElementById("precio2").innerHTML = "$350 <small>/ año</small>";
  document.getElementById("precio3").innerHTML = "$500 <small>/ año</small>";
  document.getElementById("tipo-precio").innerHTML = "Mostrando precios anuales (2 meses gratis)";
}

function elegirPlan(nombre) {
  alert("Elegiste el plan " + nombre + ". ¡Llena el formulario para inscribirte!");
}
function validarFormulario() {
  var nombre = document.getElementById("nombre").value;
  var correo = document.getElementById("correo").value;
  var edad = document.getElementById("edad").value;
  var plan = document.getElementById("plan").value;
  var acepto = document.getElementById("acepto").checked;
  var mensaje = document.getElementById("mensaje");

  if (nombre == "") {
    mensaje.innerHTML = "Escribe tu nombre completo";
  } else if (correo == "") {
    mensaje.innerHTML = "Escribe tu correo electrónico";
  } else if (edad == "" || edad < 12 || edad > 90) {
    mensaje.innerHTML = "La edad debe ser un número entre 12 y 90";
  } else if (plan == "") {
    mensaje.innerHTML = "Elige un plan";
  } else if (acepto == false) {
    mensaje.innerHTML = "Debes aceptar las normas del gimnasio";
  } else {
    mensaje.innerHTML = "¡Listo " + nombre + "! Te inscribiste en el plan " + plan;
  }
}

function contratar(nombre, precio) {
  var sesiones = document.getElementById("sesiones").value;
  var reserva = document.getElementById("reserva");

  if (sesiones == "" || sesiones < 1) {
    reserva.innerHTML = "Escribe cuántas sesiones quieres (mínimo 1)";
  } else {
    var total = sesiones * precio;
    if (sesiones >= 10) {
      total = total * 0.9;
    }
    reserva.innerHTML = "Reservaste " + sesiones + " sesión(es) con " + nombre + ". Total: $" + total;
  }
}
