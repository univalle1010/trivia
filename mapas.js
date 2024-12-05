// Obtener el botón y el campo de entrada
const submitButton = document.getElementById("submitGuess");
const guessInput = document.getElementById("gameGuess");
const resultMessage = document.getElementById("resultMessage");
const hintMessage = document.getElementById("hintMessage");
const mapImage = document.getElementById("mapImage"); // Referencia a la imagen
const helpButton = document.getElementById("helpButton"); // Botón de ayuda

// Lista de juegos/mapas para adivinar (puedes agregar más objetos a esta lista)
const games = [
    {
        correctAnswer: "Call of Duty",
        hint: "Este mapa es de un juego de disparos muy popular.",
        pointsReward: 10,
        coinsReward: 5,
        imagePath: "callofduty.webp" // Ruta de la imagen
    },
    {
        correctAnswer: "Fortnite",
        hint: "Este juego de batalla real tiene una mecánica de construcción.",
        pointsReward: 10,
        coinsReward: 5,
        imagePath: "fortnite.jpg" // Ruta de la imagen
    },
    {
        correctAnswer: "Minecraft",
        hint: "Un juego en el que puedes construir y explorar mundos hechos de bloques.",
        pointsReward: 10,
        coinsReward: 5,
        imagePath: "minecraft.png" // Ruta de la imagen
    },
    {
        correctAnswer: "Overwatch",
        hint: "Un juego en el que hay modos de juegos, con diferentes personajes",
        pointsReward: 10,
        coinsReward: 5,
        imagePath: "overwatch.jpg" // Ruta de la imagen
    },
    {
        "correctAnswer": "Apex Legends",
        "hint": "Un juego de batalla real con héroes y habilidades únicas.",
        "pointsReward": 10,
        "coinsReward": 5,
        "imagePath": "apexlegends.jpg" // Ruta de la imagen
    },
    {
        "correctAnswer": "League of Legends",
        "hint": "Un juego de estrategia y combates en línea con personajes únicos.",
        "pointsReward": 10,
        "coinsReward": 5,
        "imagePath": "League of Legends.jpg" // Ruta de la imagen
    },
    {
        "correctAnswer": "PUBG",
        "hint": "Un juego de batalla real donde los jugadores luchan hasta la muerte en un mapa gigante.",
        "pointsReward": 10,
        "coinsReward": 5,
        "imagePath": "PUBG.jpg" // Ruta de la imagen
    },
    {
        "correctAnswer": "The Witcher 3",
        "hint": "Un RPG de mundo abierto con un cazador de monstruos como protagonista.",
        "pointsReward": 10,
        "coinsReward": 5,
        "imagePath": "The Witcher 3.webp" // Ruta de la imagen
    },
    {
        "correctAnswer": "Red Dead Redemption 2",
        "hint": "Un juego de acción y aventura en el Viejo Oeste con una historia profunda.",
        "pointsReward": 10,
        "coinsReward": 5,
        "imagePath": "Red Dead Redemption 2.jpeg" // Ruta de la imagen
    },
    {
        "correctAnswer": "Among Us",
        "hint": "Un juego en línea donde los jugadores deben encontrar al impostor entre ellos.",
        "pointsReward": 10,
        "coinsReward": 5,
        "imagePath": "Among Us.jpg" // Ruta de la imagen
    },
    {
        "correctAnswer": "Fall Guys",
        "hint": "Un juego de multijugador masivo con un estilo de carreras lleno de obstáculos.",
        "pointsReward": 10,
        "coinsReward": 5,
        "imagePath": "Fall Guys.jpg" // Ruta de la imagen
    },
    {
        "correctAnswer": "Halo",
        "hint": "Un juego de disparos en primera persona con una famosa franquicia de ciencia ficción.",
        "pointsReward": 10,
        "coinsReward": 5,
        "imagePath": "Halo.jpg" // Ruta de la imagen
    }
    
    
];

// Indice del juego actual (puedes cambiar este valor para mostrar un juego específico)
let currentGameIndex = 0;
let incorrectAttempts = 0;  // Contador de intentos incorrectos
let hasGuessed = false;     // Flag para saber si ya adivinó

// Mostrar la pista del juego actual y cambiar la imagen
function displayGame() {
    const currentGame = games[currentGameIndex];
    hintMessage.textContent = currentGame.hint;
    mapImage.src = currentGame.imagePath; // Cambiar la imagen del mapa
    hasGuessed = false;
    incorrectAttempts = 0;  // Resetear los intentos incorrectos al cambiar de juego
    helpButton.style.display = "none"; // Ocultar el botón de ayuda
}

// Llamada a la función para mostrar la pista y la imagen cuando la página se carga
displayGame();

// Función para descontar monedas
function subtractCoins(amount) {
    const userName = localStorage.getItem("currentUser");
    let currentCoins = parseInt(localStorage.getItem(`${userName}-coins`)) || 0;

    if (currentCoins >= amount) {
        const newCoins = currentCoins - amount;
        localStorage.setItem(`${userName}-coins`, newCoins);
        document.getElementById("user-coins").textContent = newCoins;
        alert(`¡Has usado ${amount} monedas para pasar al siguiente nivel!`);
        // Pasar al siguiente nivel
        currentGameIndex = (currentGameIndex + 1) % games.length;
        displayGame(); // Mostrar la nueva pista
    } else {
        alert("No tienes suficientes monedas.");
    }
}

// Manejar el clic en el botón "Adivinar"
submitButton.addEventListener("click", function() {
    const userGuess = guessInput.value.trim().toLowerCase();
    const currentGame = games[currentGameIndex];

    // Limpiar mensaje anterior antes de mostrar uno nuevo
    resultMessage.textContent = "";
    
    // Verificar si la respuesta del usuario es correcta
    if (userGuess === currentGame.correctAnswer.toLowerCase()) {
        resultMessage.textContent = "¡Correcto! Has adivinado el mapa.";
        resultMessage.style.color = "#4caf50"; // Verde para respuesta correcta
        addPoints(currentGame.pointsReward); // Ganar puntos
        addCoins(currentGame.coinsReward);   // Ganar monedas

        // Pasar al siguiente juego (si existe)
        currentGameIndex = (currentGameIndex + 1) % games.length; // Cambia al siguiente juego
        
        // Si se han completado todos los juegos, mostrar el mensaje de finalización
        if (currentGameIndex === 0) {
            alert("¡Has completado todos los mapas! El juego comenzará de nuevo.");
        }

        displayGame(); // Mostrar la nueva pista y cambiar la imagen del siguiente juego
    } else {
        resultMessage.textContent = "¡Incorrecto! Intenta de nuevo.";
        resultMessage.style.color = "#e74c3c"; // Rojo para respuesta incorrecta
    }

    // Limpiar el campo de entrada
    guessInput.value = "";

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
        resultMessage.textContent = ""; // Limpiar el mensaje después de 2 segundos
    }, 2000);
});

// Función para añadir puntos
function addPoints(amount) {
    const userName = localStorage.getItem("currentUser");
    const currentPoints = parseInt(localStorage.getItem(`${userName}-points`)) || 0;
    const newPoints = currentPoints + amount;
    localStorage.setItem(`${userName}-points`, newPoints);
    document.getElementById("user-points").textContent = newPoints;
    alert(`¡Has ganado ${amount} puntos!`);
}

// Función para añadir monedas
function addCoins(amount) {
    const userName = localStorage.getItem("currentUser");
    const currentCoins = parseInt(localStorage.getItem(`${userName}-coins`)) || 0;
    const newCoins = currentCoins + amount;
    localStorage.setItem(`${userName}-coins`, newCoins);
    document.getElementById("user-coins").textContent = newCoins;
    alert(`¡Has ganado ${amount} monedas!`);
}

// Función para volver a la página principal
function goBackToHome() {
    if (localStorage.getItem("loggedIn") === "true") {
        window.location.href = "principal.html";
    } else {
        window.location.href = "index.html";
    }
}
