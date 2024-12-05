// Verificar si el usuario está logueado
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// Obtener el nombre del usuario actual
const userName = localStorage.getItem("currentUser");

// Obtener datos del usuario desde localStorage
let userPoints = parseInt(localStorage.getItem(`${userName}-points`)) || 0;
let userCoins = parseInt(localStorage.getItem(`${userName}-coins`)) || 0;

// Mostrar los datos en la página
document.getElementById("user-name").textContent = `Usuario: ${userName}`;
document.getElementById("user-points").textContent = `Puntos: ${userPoints}`;
document.getElementById("user-coins").textContent = `Monedas: ${userCoins}`;

// Definir las canciones
const songs = [
    {
        title: 'Super Mario',
        artist: 'Koji Kondo (Super Mario Bros.)',
        correctAnswer: 'Super Mario',
        options: ['Super Mario', 'Luigi Mansion', 'Mario Kart', 'Odyssey Theme'],
        audio: 'SuperMario.mp3',
    },
    {
        title: 'Zelda Theme',
        artist: 'Koji Kondo (The Legend of Zelda)',
        correctAnswer: 'Zelda Theme',
        options: ['Zelda Theme', 'Ocarina Theme', 'Gerudo Valley', 'Hyrule Castle'],
        audio: 'Zelda.mp3',
    },
    {
        title: 'One Winged',
        artist: 'Nobuo Uematsu (Final Fantasy VII)',
        correctAnswer: 'One Winged',
        options: ['One Winged', 'Aerith Theme', 'Zanarkand', 'FF Prelude'],
        audio: 'One Winged.mp3',
    },
    {
        title: 'Tetris A',
        artist: 'Hirokazu Tanaka (Tetris)',
        correctAnswer: 'Tetris A',
        options: ['Tetris A', 'Tetris B', 'Tetris Remix', 'Tetris Symphony'],
        audio: 'Tetris.mp3',
    },
    {
        title: 'Baba Yetu',
        artist: 'Christopher Tin (Civilization IV)',
        correctAnswer: 'Baba Yetu',
        options: ['Baba Yetu', 'Civ Theme', 'Earth Song', 'City Theme'],
        audio: 'Babayetu.mp3',
    },
    {
        title: 'Skyrim',
        artist: 'Jeremy Soule (The Elder Scrolls V: Skyrim)',
        correctAnswer: 'Skyrim',
        options: ['Skyrim', 'Dragonborn', 'Age of Oppression', 'Stormcloaks'],
        audio: 'Skyrim.mp3',
    },
    {
        title: 'Snake Eater',
        artist: 'Cynthia Harrell (Metal Gear Solid 3)',
        correctAnswer: 'Snake Eater',
        options: ['Snake Eater', 'Best is Yet', 'Heavens Divide', 'Calling Night'],
        audio: 'SNAKE.mp3',
    },
    {
        title: 'Uncharted',
        artist: 'Greg Edmonson (Uncharted: Drake\'s Fortune)',
        correctAnswer: 'Uncharted',
        options: ['Uncharted', 'Last of Us', 'Red Dead', 'Elder Scrolls'],
        audio: 'Uncharted.mp3',
    },
    {
        title: 'Still Alive',
        artist: 'Jonathan Coulton (Portal)',
        correctAnswer: 'Still Alive',
        options: ['Still Alive', 'Portal 2 Song', 'Aperture Song', 'Hallway Song'],
        audio: 'Still Alive.mp3',
    },
    {
        title: 'Gerudo',
        artist: 'Koji Kondo (The Legend of Zelda: Ocarina of Time)',
        correctAnswer: 'Gerudo',
        options: ['Gerudo', 'Lost Woods', 'Zelda Lullaby', 'Hyrule Castle'],
        audio: 'Gerudo Valley.mp3',
    }
];


let currentSongIndex = 0;
let isAnswerSelected = false; // Variable para controlar si se seleccionó una respuesta

// Función para cargar la siguiente canción
function loadSong() {
    if (currentSongIndex >= songs.length) {
        endGameAndRestart(); // Fin del juego
        return;
    }

    const song = songs[currentSongIndex];
    document.getElementById("music-audio").src = song.audio; // Establecer la fuente del audio

    // Reproducir la canción automáticamente
    const audioElement = document.getElementById("music-audio");
    audioElement.play();

    document.getElementById("options").innerHTML = song.options.map(option => 
        `<button class="btn btn-primary m-2 game-btn" onclick="checkAnswer('${option}')">${option}</button>`
    ).join('');

    // Habilitar los botones de opciones
    const buttons = document.querySelectorAll('.game-btn');
    buttons.forEach(button => {
        button.disabled = false;
    });

    isAnswerSelected = false; // Resetear la variable para la nueva ronda
}

// Función para verificar la respuesta
function checkAnswer(selectedAnswer) {
    if (isAnswerSelected) return; // Si ya se seleccionó una respuesta, no hacer nada

    isAnswerSelected = true; // Marcar que se seleccionó una respuesta

    const song = songs[currentSongIndex];
    let resultMessage = document.getElementById("result-message");
    let resultText = document.getElementById("result-text");

    // Deshabilitar todos los botones de opciones después de seleccionar una respuesta
    const buttons = document.querySelectorAll('.game-btn');
    buttons.forEach(button => {
        button.disabled = true;
    });

    resultMessage.classList.remove("correct", "incorrect");

    if (selectedAnswer === song.correctAnswer) {
        resultText.textContent = "¡Correcto! Has ganado 10 puntos y 5 monedas.";
        resultMessage.classList.add("correct"); // Clase para mensaje correcto (verde)
        userPoints += 10;
        userCoins += 5;
        updateUserStats(); // Actualizar puntos y monedas
    } else {
        resultText.textContent = "¡Incorrecto!";
        resultMessage.classList.add("incorrect"); // Clase para mensaje incorrecto (rojo)
    }

    // Mostrar el mensaje de resultado
    resultMessage.style.display = "block";

    // Esperar 2 segundos antes de avanzar a la siguiente ronda
    setTimeout(() => {
        resultMessage.style.display = "none";
        currentSongIndex++; // Preparar la siguiente ronda
        loadSong(); // Cargar la siguiente ronda
    }, 2000);
}

// Función para finalizar el juego y reiniciar automáticamente
function endGameAndRestart() {
    const resultMessage = document.getElementById("result-message");
    resultMessage.style.display = "block";
    document.getElementById("result-text").textContent = "¡Has completado todas las rondas! El juego se reiniciará.";

    setTimeout(() => {
        currentSongIndex = 0;
        loadSong();
        resultMessage.style.display = "none";
    }, 3000); // Espera 3 segundos antes de reiniciar
}

// Función para actualizar los puntos y monedas del usuario
function updateUserStats() {
    document.getElementById("user-points").textContent = `Puntos: ${userPoints}`;
    document.getElementById("user-coins").textContent = `Monedas: ${userCoins}`;
    localStorage.setItem(`${userName}-points`, userPoints);
    localStorage.setItem(`${userName}-coins`, userCoins);
}

// Cargar la primera canción
document.addEventListener('DOMContentLoaded', loadSong);
