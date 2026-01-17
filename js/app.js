/* Menú lateral */
window.btnAbrir = document.getElementById("btnMenuPrincipal");
window.menu = document.getElementById("menuPrincipal");
window.btnCerrar = document.getElementById("cerrarMenu");
window.overlay = document.getElementById("overlay");

window.obtenerElementosEnfocables = function (contenedor) {
    return contenedor.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
}

window.activarFocusTrap = function () {
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

window.abrirMenu = function () {
    menu.removeAttribute("hidden");
    menu.classList.add("activo");
    overlay.hidden = false;

    activarFocusTrap();

    const elementos = window.obtenerElementosEnfocables(window.menu);
    if (elementos.length > 0) {
        elementos[0].focus();
    }
}

window.cerrarMenu = function () {
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

/* Revisar respuestas */
const respuestasCorrectas = {
    pregunta1: "b",
    pregunta2: "c",
    pregunta3: "b",
    pregunta4: "b",
    pregunta5: "c"
};

const selects = document.querySelectorAll("#formAutoevaluacion select");
const btnRevisar = document.getElementById("btnRevisar");
const btnGuardar = document.getElementById("btnPDF");
const mensajeResultado = document.getElementById("mensajeResultado");

function verificarCompletado() {
    let completo = true;

    selects.forEach(select => {
        if (select.value === "") {
            completo = false;
        }
    });

    btnRevisar.disabled = !completo;
}

selects.forEach(select => {
    select.addEventListener("change", verificarCompletado);
});

btnRevisar.addEventListener("click", () => {
    let correctas = 0;

    selects.forEach(select => {
        const id = select.id;
        const respuesta = select.value;

        select.disabled = true;

        if (respuesta === respuestasCorrectas[id]) {
            select.classList.add("is-valid");
            select.classList.remove("is-invalid");
            correctas++;
        } else {
            select.classList.add("is-invalid");
            select.classList.remove("is-valid");
        }
    });

    mensajeResultado.innerHTML = `
    <div class="alert alert-info">
      Obtuviste ${correctas} de 5 respuestas correctas.
    </div>
  `;

    btnRevisar.disabled = true;

    btnGuardar.disabled = false;
});

btnGuardar.addEventListener("click", () => {
    generarPDF();
});

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    doc.setFontSize(14);
    doc.text("Neurociencia Aplicada a la Educación de las Personas con Discapacidad | Autoevaluación", 10, y);

    y += 10;
    doc.setFontSize(11);

    const fecha = new Date().toLocaleDateString();
    doc.text("Fecha: " + fecha, 10, y);

    y += 10;

    let correctas = 0;

    selects.forEach(select => {
        if (select.value === respuestasCorrectas[select.id]) {
            correctas++;
        }
    });

    doc.text(`Resultado obtenido: ${correctas} de 5`, 10, y);

    y += 10;

    doc.text("Respuestas seleccionadas:", 10, y);

    y += 10;

    const preguntasTexto = {
        pregunta1: "¿Qué estudia principalmente la neurociencia?",
        pregunta2: "¿Qué disciplina se relaciona con la neuroeducación?",
        pregunta3: "¿Qué es la plasticidad cerebral?",
        pregunta4: "¿Qué ayuda a potenciar el aprendizaje?",
        pregunta5: "¿Cuál es un objetivo de la neuroeducación?"
    };

    selects.forEach(select => {
        const pregunta = preguntasTexto[select.id];
        const respuesta = select.options[select.selectedIndex].text;

        if (y > 270) {
            doc.addPage();
            y = 10;
        }

        let lineasPregunta = doc.splitTextToSize(pregunta, 180);
        doc.text(lineasPregunta, 10, y);
        y += lineasPregunta.length * 6;

        let textoRespuesta = "Respuesta seleccionada: " + respuesta;

        let lineasRespuesta = doc.splitTextToSize(textoRespuesta, 180);
        doc.text(lineasRespuesta, 10, y);

        y += lineasRespuesta.length * 8;
    });


    doc.save("Autoevaluacion1.pdf");
}
