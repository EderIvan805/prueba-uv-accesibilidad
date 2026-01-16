/* Línea de lectura */
const btnLinea = document.getElementById("btnLinea");
const linea = document.getElementById("lineaLectura");

let lineaActiva = false;

btnLinea.addEventListener("click", () => {
    lineaActiva = !lineaActiva;
    linea.hidden = !lineaActiva;
});

document.addEventListener("mousemove", (e) => {
    if (lineaActiva) {
        linea.style.top = (e.clientY - 20) + "px";
    }
});


/* Lector inmersivo */

document.addEventListener("keydown", function (e) {
    const esMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modal = new bootstrap.Modal(document.getElementById('modalLectorInmersivo'));

    if (
        (esMac && e.ctrlKey && e.altKey && e.key.toLowerCase === "m") ||
        (!esMac && e.altKey && e.key.toLowerCase() === "m")
    ) {
        e.preventDefault();
        abrirMenu();
    }

    if (
        (esMac && e.ctrlKey && e.altKey && e.key.toLowerCase === "c") ||
        (!esMac && e.altKey && e.key.toLowerCase() === "c")
    ) {
        e.preventDefault();
        cerrarMenu();
    }

    if (
        (esMac && e.ctrlKey && e.altKey && e.key.toLowerCase() === "l") ||
        (!esMac && e.altKey && e.key.toLowerCase() === "l")
    ) {
        e.preventDefault();
        modal.show();
    }

});

/* Tamaño del cursor */
let nivelCursor = 0;

const btnGrande = document.getElementById("btnCursorGrande");
const btnChico = document.getElementById("btnCursorChico");

function actualizarCursor() {
  document.body.classList.remove(
    "cursor-normal",
    "cursor-grande",
    "cursor-muy-grande"
  );

  if (nivelCursor === 0) {
    document.body.classList.add("cursor-normal");
  } else if (nivelCursor === 1) {
    document.body.classList.add("cursor-grande");
  } else if (nivelCursor === 2) {
    document.body.classList.add("cursor-muy-grande");
  }
}

btnGrande.addEventListener("click", () => {
  if (nivelCursor < 2) {
    nivelCursor++;
    actualizarCursor();
  }
});

btnChico.addEventListener("click", () => {
  if (nivelCursor > 0) {
    nivelCursor--;
    actualizarCursor();
  }
});

/* Tamaño de fuente */
let nivelFuente = 0;

const btnFuenteGrande = document.getElementById("btnFuenteGrande");
const btnFuenteChica = document.getElementById("btnFuenteChica");

function actualizarFuente() {
  document.body.classList.remove(
    "fuente-normal",
    "fuente-grande",
    "fuente-muy-grande"
  );

  const label = document.getElementById("nivelFuenteLabel");

  if (nivelFuente === 0) {
    document.body.classList.add("fuente-normal");
  } else if (nivelFuente === 1) {
    document.body.classList.add("fuente-grande");
  } else if (nivelFuente === 2) {
    document.body.classList.add("fuente-muy-grande");
  }
}

btnFuenteGrande.addEventListener("click", () => {
  if (nivelFuente < 2) {
    nivelFuente++;
    actualizarFuente();
  }
});

btnFuenteChica.addEventListener("click", () => {
  if (nivelFuente > 0) {
    nivelFuente--;
    actualizarFuente();
  }
});

/* Resaltar enlaces */
const btnResaltar = document.getElementById("btnResaltarEnlaces");

function toggleResaltado() {
  const activado = document.body.classList.toggle("resaltar-enlaces");

  if (activado) {
    btnResaltar.textContent = "Desactivar";
    btnResaltar.classList.remove("btn-outline-primary");
    btnResaltar.classList.add("btn-primary");
  } else {
    btnResaltar.textContent = "Activar";
    btnResaltar.classList.remove("btn-primary");
    btnResaltar.classList.add("btn-outline-primary");
  }

  localStorage.setItem("resaltarEnlaces", activado);
}

btnResaltar.addEventListener("click", toggleResaltado);

/* Resaltar tabulación */
const btnTabulador = document.getElementById("btnTabulador");

function toggleTabulador() {
  const activado = document.body.classList.toggle("modo-tabulador");

  if (activado) {
    btnTabulador.textContent = "Desactivar";
    btnTabulador.classList.remove("btn-outline-primary");
    btnTabulador.classList.add("btn-primary");
  } else {
    btnTabulador.textContent = "Activar";
    btnTabulador.classList.remove("btn-primary");
    btnTabulador.classList.add("btn-outline-primary");
  }

  localStorage.setItem("modoTabulador", activado);
}

btnTabulador.addEventListener("click", toggleTabulador);