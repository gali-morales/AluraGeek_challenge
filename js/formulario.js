const camposDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-form]");

export function inicializarFormulario() {
  formulario.addEventListener("submit", enviarFormulario);
  camposDeFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
  });
}

function enviarFormulario(e) {
  e.preventDefault();
  const listaRespuestas = {
    nombre: e.target.elements["nombre-producto"].value,
    precio: e.target.elements["precio-producto"].value,
    imgUrl: e.target.elements["url-img-producto"].value,
  };
  localStorage.setItem("registro", JSON.stringify(listaRespuestas));
}

//Mensajes de Error
const tiposError = [
  "valueMissing", "typeMismatch", "tooShort",
];
const mensajes = {
  "nombre-producto": {
    valueMissing: "Por favor, ingrese el nombre",
    tooShort: "Ingrese un nombre válido.",
  },
  "precio-producto": {
    valueMissing: "Por favor, ingrese el precio",
    typeMismatch: "Ingrese números únicamente.",
  },
  "url-img-producto": {
    valueMissing: "El campo de imagen no puede estar vacío.",
    typeMismatch: "Por favor, ingrese una url válida.",
  },
};

function verificarCampo(campo) {
  const campoNombre = campo.name;
  let mensaje = "";
  if (campo.validity.valid) {
    campo.setCustomValidity("");
  } else {
    const tipoError = tiposError.find((tipo) => campo.validity[tipo]);
    mensaje = mensajes[campoNombre][tipoError];
  }

  const mensajeError = campo.parentNode.querySelector(".mensaje-error");
  if (mensaje) {
    mensajeError.textContent = mensaje;
    campo.setCustomValidity(mensaje);
  } else {
    mensajeError.textContent = "";
  }
  campo.reportValidity();
}

