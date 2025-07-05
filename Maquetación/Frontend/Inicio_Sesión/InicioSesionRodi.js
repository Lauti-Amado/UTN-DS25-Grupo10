window.onload = function() {
    const formulario = document.getElementById('formulario');
    const emailInput = document.getElementById('email');
    const errorMail = document.getElementById('errorMail');
    const contraseñaInput = document.getElementById('contraseña');
    const errorContraseña = document.getElementById('errorContraseña');

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        errorMail.textContent = '';
        errorContraseña.textContent = '';
        let valido = true;

        if (emailInput.value.trim() === '') {
            errorMail.textContent = 'Este campo es obligatorio';
            valido = false;
        }

        if (contraseñaInput.value.trim() === '') {
            errorContraseña.textContent = 'Este campo es obligatorio';
            valido = false;
        }

        if (!valido) {
            alert('Por favor, complete todos los campos obligatorios.');
        }
    });
};

