(function() {
    'use strict';

    let overlay = null;
    let ventana = null;
    let contenido = null;
    let botonCerrar = null;

    function construirModal() {
        if (overlay) return;

        overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        ventana = document.createElement('div');
        ventana.className = 'modal-ventana';

        botonCerrar = document.createElement('button');
        botonCerrar.className = 'modal-cerrar';
        botonCerrar.innerHTML = '&times;';
        botonCerrar.setAttribute('aria-label', 'Cerrar');
        botonCerrar.addEventListener('click', cerrarModal);

        contenido = document.createElement('div');
        contenido.className = 'modal-contenido';

        ventana.appendChild(botonCerrar);
        ventana.appendChild(contenido);
        overlay.appendChild(ventana);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                cerrarModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('activo')) {
                cerrarModal();
            }
        });
    }

    function abrirModal(htmlContenido) {
        construirModal();
        if (!htmlContenido) {
            console.warn('No se proporcionó contenido para el modal.');
            return;
        }
        contenido.innerHTML = htmlContenido;
        overlay.classList.add('activo');
        document.body.style.overflow = 'hidden'; 

        const formulario = contenido.querySelector('#form-contacto');
        if (formulario) {
            // Eliminar listeners previos para evitar duplicados
            formulario.removeEventListener('submit', manejadorSubmit);
            formulario.addEventListener('submit', manejadorSubmit);
        }
    }

    function cerrarModal() {
        if (overlay) {
            overlay.classList.remove('activo');
            document.body.style.overflow = '';
        }
    }

    function manejadorSubmit(event) {
        event.preventDefault();

        contenido.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                 <img src="img/mensaje.png" alt="¡Mensaje enviado!" style="max-width:100%; height:auto; border-radius:12px; margin-bottom:16px; max-height:200px; object-fit:cover;" />
                <h2 style="color: var(--color-primario);">¡Mensaje enviado con éxito!</h2>
                <p style="margin: 20px 0;">¡Gracias por contactarnos! Te responderemos en breve :D</p>
                <button class="boton-enviar" id="cerrar-exito">Cerrar</button>
            </div>
        `;
        const btnCerrarExito = document.getElementById('cerrar-exito');
        if (btnCerrarExito) {
            btnCerrarExito.addEventListener('click', cerrarModal);
        }
    }

    window.Modal = {
        abrir: abrirModal,
        cerrar: cerrarModal
    };

    document.addEventListener('DOMContentLoaded', function() {
        const btnAbrir = document.getElementById('btnAbrirModal');
        if (btnAbrir) {
            btnAbrir.addEventListener('click', function() {
                const fuente = document.getElementById('formulario-oculto');
                if (fuente) {
                    Modal.abrir(fuente.innerHTML);
                } else {
                    alert('No se encontró el contenido del formulario.');
                }
            });
        }
    });

})();