const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbwgEWiLuGtxBaChy5CVngSZI6dND4onkeloDSbqFa3O9a5wIoRd2sU_tsFaPk9OJpUl/exec";

$(document).ready(function () {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^(\+?56)?\s?9\s?\d{4}\s?\d{4}$/;

    function valor(selector) {
        return ($(selector).val() || "").toString().trim();
    }

    function validar(campo, errorId, comprobar) {
        const mensaje = comprobar(valor(campo));
        $(errorId).text(mensaje);
        return mensaje === "";
    }

    const validaciones = {
        nombre: () => validar("#nombre", "#nombreError", v =>
            v === "" ? "Por favor, ingresa tu nombre." : ""),

        apellido: () => validar("#apellido", "#apellidoError", v =>
            v === "" ? "Por favor, ingresa tu apellido." : ""),

        mail: () => validar("#mail", "#emailError", v => {
            if (v === "") return "Por favor, ingresa tu correo electrónico.";
            if (!mailRegex.test(v)) return "Por favor, ingresa un correo electrónico válido.";
            return "";
        }),

        telefono: () => validar("#telefono", "#telefonoError", v => {
            if (v === "") return "Por favor, ingresa tu teléfono.";
            if (!telefonoRegex.test(v)) return "Ingresa un teléfono válido (ej: +56 9 1234 5678).";
            return "";
        }),

        fecha: () => validar("#fechaNacimiento", "#fechaError", v =>
            v === "" ? "Por favor, ingresa la fecha." : ""),

        region: () => validar("#autoSizingSelect", "#regionError", v =>
            v === "" ? "Por favor, seleccione su región." : "")
    };

    $("#nombre").on("blur", validaciones.nombre);
    $("#apellido").on("blur", validaciones.apellido);
    $("#mail").on("blur", validaciones.mail);
    $("#telefono").on("blur", validaciones.telefono);
    $("#fechaNacimiento").on("blur change", validaciones.fecha);
    $("#autoSizingSelect").on("blur change", validaciones.region);

    function enviarASheets() {
        const datos = new URLSearchParams({
            nombre: valor("#nombre"),
            apellido: valor("#apellido"),
            correo: valor("#mail"),
            telefono: valor("#telefono"),
            fechaNacimiento: valor("#fechaNacimiento"),
            region: $("#autoSizingSelect option:selected").text()
        });

        return fetch(URL_SCRIPT, {
            method: "POST",
            mode: "no-cors",
            body: datos
        });
    }

    $("#formulario").on("submit", function (event) {
        event.preventDefault();


        const resultados = Object.values(validaciones).map(fn => fn());
        if (resultados.includes(false)) return;

        const boton = $(this).find("button[type=submit]").prop("disabled", true);

        enviarASheets()
            .then(() => {
                alert("¡Datos enviados correctamente!");
                this.reset();
            })
            .catch(() => {
                alert("No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.");
            })
            .finally(() => boton.prop("disabled", false));
    });
});