// Verificar si el usuario está logueado
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// Obtener el nombre del usuario actual
const userName = localStorage.getItem("currentUser");

// Obtener datos del usuario
let userPoints = parseInt(localStorage.getItem(`${userName}-points`)) || 0;
let userCoins = parseInt(localStorage.getItem(`${userName}-coins`)) || 0;

// Mostrar los datos en la página
document.getElementById("user-name").textContent = `Usuario: ${userName}`;
document.getElementById("user-points").textContent = `Puntos: ${userPoints}`;
document.getElementById("user-coins").textContent = `Monedas: ${userCoins}`;

// Definir las preguntas y respuestas (personajes)
const characters = [
    {
        image: 'https://example.com/character1.jpg', 
        correctAnswer: 'option2',
        options: {
            option1: 'Superman',
            option2: 'Batman',
            option3: 'Wonder Woman',
            option4: 'Flash'
        }
    },
    {
        image: 'https://example.com/character2.jpg', 
        correctAnswer: 'option4',
        options: {
            option1: 'Spiderman',
            option2: 'Ironman',
            option3: 'Thor',
            option4: 'Captain America'
        }
    },
    // Agrega más personajes aquí
];

let currentRound = 0;
let timer;
let countdownTime = 10; // 10 segundos para cada ronda

// Función para cargar la próxima ronda
function loadRound() {
    if (currentRound >= characters.length) {
        alert('¡Has completado todas las rondas!');
        return;
    }

    const character = characters[currentRound];
    document.getElementById("character-image").src = character.image;
    document.getElementById("options").innerHTML = `
        <button class="btn btn-primary m-2 game-btn" onclick="checkAnswer('option1')">${character.options.option1}</button>
        <button class="btn btn-primary m-2 game-btn" onclick="checkAnswer('option2')">${character.options.option2}</button>
        <button class="btn btn-primary m-2 game-btn" onclick="checkAnswer('option3')">${character.options.option3}</button>
        <button class="btn btn-primary m-2 game-btn" onclick="checkAnswer('option4')">${character.options.option4}</button>
    `;
    
    // Reiniciar el cronómetro para cada ronda
    startTimer();
}

// Función para iniciar el cronómetro
function startTimer() {
    // Limpiar cualquier temporizador anterior
    clearInterval(timer);
    
    countdownTime = 10; // Establece el tiempo a 10 segundos
    document.getElementById("timer").textContent = formatTime(countdownTime);
    
    // Decrementar cada segundo
    timer = setInterval(function() {
        countdownTime--;
        document.getElementById("timer").textContent = formatTime(countdownTime);
        
        // Cuando el tiempo llega a 0, pasa a la siguiente ronda
        if (countdownTime <= 0) {
            clearInterval(timer); // Detener el cronómetro
            document.getElementById("result-message").style.display = "block";
            document.getElementById("result-text").textContent = "Se acabó el tiempo! Respuesta pasada.";
            setTimeout(() => {
                currentRound++;
                loadRound(); // Cargar la siguiente ronda
                document.getElementById("result-message").style.display = "none";
            }, 2000);
        }
    }, 1000);
}

// Función para dar formato al tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Función para actualizar los puntos y las monedas en la página
function updateUserStats() {
    document.getElementById("user-points").textContent = `Puntos: ${userPoints}`;
    document.getElementById("user-coins").textContent = `Monedas: ${userCoins}`;
    localStorage.setItem(`${userName}-points`, userPoints);
    localStorage.setItem(`${userName}-coins`, userCoins);
}

// Función para verificar si la respuesta es correcta
function checkAnswer(selectedOption) {
    const character = characters[currentRound];
    let resultMessage = document.getElementById("result-message");
    let resultText = document.getElementById("result-text");

    if (selectedOption === character.correctAnswer) {
        resultText.textContent = "¡Correcto! Has ganado 10 puntos y 5 monedas.";
        userPoints += 10;
        userCoins += 5;
        updateUserStats();
    } else {
        resultText.textContent = "¡Incorrecto! Intenta de nuevo.";
    }

    resultMessage.style.display = "block";

    // Esperar 2 segundos antes de avanzar a la siguiente ronda
    setTimeout(() => {
        resultMessage.style.display = "none";
        currentRound++;
        loadRound();
    }, 2000);
}

// Función para volver a la página principal
function goBackToHome() {
    if (localStorage.getItem("loggedIn") === "true") {
        window.location.href = "principal.html";
    } else {
        window.location.href = "index.html";
    }
}

// Cargar la primera ronda
loadRound();
