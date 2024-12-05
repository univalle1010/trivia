// Verificar si el usuario está logueado
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// Obtener el nombre del usuario actual
const userName = localStorage.getItem("currentUser");

// Obtener datos del usuario
const userPoints = localStorage.getItem(`${userName}-points`) || 0;
const userCoins = localStorage.getItem(`${userName}-coins`) || 0;

// Mostrar los datos en la página
document.getElementById("user-name").textContent = userName;
document.getElementById("user-points").textContent = userPoints;
document.getElementById("user-coins").textContent = userCoins;

// Función para añadir puntos
function addPoints(amount) {
    const currentPoints = parseInt(localStorage.getItem(`${userName}-points`)) || 0;
    const newPoints = currentPoints + amount;
    localStorage.setItem(`${userName}-points`, newPoints);

    // Actualizar la vista
    document.getElementById("user-points").textContent = newPoints;
    alert(`¡Has ganado ${amount} puntos!`);
}

// Función para añadir monedas
function addCoins(amount) {
    const currentCoins = parseInt(localStorage.getItem(`${userName}-coins`)) || 0;
    const newCoins = currentCoins + amount;
    localStorage.setItem(`${userName}-coins`, newCoins);

    // Actualizar la vista
    document.getElementById("user-coins").textContent = newCoins;
    alert(`¡Has ganado ${amount} monedas!`);
}

// Función para añadir vidas (separada de puntos y monedas)
function addLife() {
    const currentLives = parseInt(localStorage.getItem(`${userName}-lives`)) || 3;
    const newLives = currentLives + 1;
    localStorage.setItem(`${userName}-lives`, newLives);

    // Actualizar la vista solo si se muestra en la página
    if (document.getElementById("user-lives")) {
        document.getElementById("user-lives").textContent = newLives;
    }
    alert("¡Has ganado una vida extra!");
}

// Función para cerrar sesión
document.getElementById("logout").addEventListener("click", function () {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("currentUser"); // Eliminar el usuario actual
    window.location.href = "index.html";
});
