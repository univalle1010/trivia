document.addEventListener("DOMContentLoaded", function () {
    // Verificar si el usuario ya está logueado
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
        // Si el usuario está logueado, ocultamos la opción de "¿No tienes cuenta?"
        document.getElementById("no-account-text").style.display = "none";
    }

    // Manejar inicio de sesión
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Verificar si el usuario existe
        const storedPassword = localStorage.getItem(username);

        if (storedPassword) {
            if (storedPassword === password) {
                // Inicio de sesión exitoso
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("currentUser", username);

                // Asegurar datos iniciales del usuario si no existen
                if (!localStorage.getItem(`${username}-points`)) {
                    localStorage.setItem(`${username}-points`, 0);
                }
                if (!localStorage.getItem(`${username}-coins`)) {
                    localStorage.setItem(`${username}-coins`, 0);
                }
                if (!localStorage.getItem(`${username}-lives`)) {
                    localStorage.setItem(`${username}-lives`, 3); // Vidas iniciales
                }
                if (!localStorage.getItem(`${username}-level`)) {
                    localStorage.setItem(`${username}-level`, 1); // Nivel inicial
                }

                // Redirigir a la página principal
                window.location.href = "principal.html";
            } else {
                showAlert("Contraseña incorrecta");
            }
        } else {
            showAlert("El usuario no existe");
        }
    });

    // Manejar registro de nuevos usuarios
    document.getElementById("register-btn").addEventListener("click", function () {
        const newUsername = document.getElementById("new-username").value.trim();
        const newPassword = document.getElementById("new-password").value.trim();

        // Validar campos
        if (!newUsername || !newPassword) {
            showAlert("Por favor, completa todos los campos.");
            return;
        }

        // Verificar si el usuario ya existe
        if (localStorage.getItem(newUsername)) {
            showAlert("El usuario ya existe. Intenta con otro nombre.");
            return;
        }

        // Registrar nuevo usuario
        localStorage.setItem(newUsername, newPassword);
        localStorage.setItem(`${newUsername}-points`, 0); // Puntos iniciales
        localStorage.setItem(`${newUsername}-coins`, 0);  // Monedas iniciales
        localStorage.setItem(`${newUsername}-lives`, 3);  // Vidas iniciales
        localStorage.setItem(`${newUsername}-level`, 1);  // Nivel inicial

        showAlert(`Registro exitoso. Bienvenido, ${newUsername}. Ahora puedes iniciar sesión.`);
        
        // Alternar a formulario de inicio de sesión
        document.getElementById("register-box").style.display = "none";
        document.getElementById("login-form").style.display = "block";
        // Mostrar nuevamente el mensaje de "¿No tienes cuenta?"
        document.getElementById("no-account-text").style.display = "block";
    });

    // Alternar entre login y registro
    document.getElementById("show-register").addEventListener("click", function () {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("register-box").style.display = "block";
        // Ocultar el mensaje de "¿No tienes cuenta?"
        document.getElementById("no-account-text").style.display = "none";
    });

    document.getElementById("show-login").addEventListener("click", function () {
        document.getElementById("register-box").style.display = "none";
        document.getElementById("login-form").style.display = "block";
        // Mostrar el mensaje de "¿No tienes cuenta?"
        document.getElementById("no-account-text").style.display = "block";
    });
});

// Función para mostrar la alerta personalizada
function showAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    
    alertMessage.textContent = message;  // Establecer el mensaje
    alertBox.style.display = 'flex';     // Mostrar la alerta
    alertBox.style.animation = 'fadeIn 0.5s ease';  // Animación de aparición
}

// Función para cerrar la alerta personalizada
function closeAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.animation = 'fadeOut 0.5s ease';  // Animación de desaparición
    setTimeout(() => {
        alertBox.style.display = 'none';  // Ocultar la alerta después de la animación
    }, 500);
}
