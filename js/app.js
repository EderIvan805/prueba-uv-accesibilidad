/* Menú lateral */
window.btnAbrir = document.getElementById("btnMenuPrincipal");
window.menu = document.getElementById("menuPrincipal");
window.btnCerrar = document.getElementById("cerrarMenu");
window.overlay = document.getElementById("overlay");

window.obtenerElementosEnfocables = function(contenedor) {
    return contenedor.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
}

window.activarFocusTrap = function() {
    const elementos = window.obtenerElementosEnfocables(window.menu);

    if (elementos.length === 0) return;

    const primero = elementos[0];
    const ultimo = elementos[elementos.length - 1];

    menu.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            if (e.shiftKey) {
                if (document.activeElement === primero) {
                    e.preventDefault();
                    ultimo.focus();
                }
            } else {
                if (document.activeElement === ultimo) {
                    e.preventDefault();
                    primero.focus();
                }
            }
        }
    });
}

window.abrirMenu = function() {
    menu.removeAttribute("hidden");
    menu.classList.add("activo");
    overlay.hidden = false;

    activarFocusTrap();

    const elementos = window.obtenerElementosEnfocables(window.menu);
    if (elementos.length > 0) {
        elementos[0].focus();
    }
}

window.cerrarMenu = function() {
    menu.hidden = true;
    menu.classList.remove("activo");
    overlay.hidden = true;

    btnAbrir.focus();
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !menu.hidden) {
    cerrarMenu();
  }
});

window.btnAbrir.addEventListener("click", abrirMenu);
window.btnCerrar.addEventListener("click", cerrarMenu);
window.overlay.addEventListener("click", cerrarMenu);

/*Evitar advertencia accesibilidad bootstrap modal y boton*/
document.querySelectorAll('.modal').forEach((modal) => {
  modal.addEventListener('hide.bs.modal', () => {
    document.activeElement.blur();
  });
});

/* Descarga de archivos */
function downloadFile(url) {
    const filename = url.split('/').pop();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al descargar: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        })
        .catch(error => {
            console.error('Error en la descarga:', error);
            alert('No se pudo descargar el archivo. Por favor, intenta más tarde.');
        });
}
