// Variables globales
let positionX = 0;
let positionY = 0;
const speedFactor = 5; // Factor de velocidad
const circleLargeRadius = 100; // Radio del círculo grande
const circleSmallRadius = 25; // Radio del círculo pequeño
const gameArea = document.getElementById("game-area");
const circleSmall = document.getElementById("circle-small");
const circleLarge = document.getElementById("circle-large");
const circleGuide = document.getElementById("circle-guide"); // Círculo guía

// Obtener el tamaño del área de juego
const gameAreaWidth = gameArea.offsetWidth;
const gameAreaHeight = gameArea.offsetHeight;

// Variables para controlar si el juego se ha ganado
let isGameWon = false;

// Función para manejar el movimiento del dispositivo
function handleMotion(event) {
    let accelX = event.accelerationIncludingGravity.x;
    let accelY = event.accelerationIncludingGravity.y;

    positionX += accelX * speedFactor;
    positionY += accelY * speedFactor;

    // Limitar el movimiento dentro del área de juego
    let maxX = gameAreaWidth / 2 - circleLargeRadius + circleSmallRadius;
    let maxY = gameAreaHeight / 2 - circleLargeRadius + circleSmallRadius;

    positionX = Math.max(-maxX, Math.min(maxX, positionX));
    positionY = Math.max(-maxY, Math.min(maxY, positionY));

    // Mover el círculo pequeño en la pantalla
    circleSmall.style.transform = `translate(${positionX}px, ${positionY}px)`;

    // Verificar si el círculo pequeño está en el centro del círculo guía
    let distanceX = Math.abs(positionX);
    let distanceY = Math.abs(positionY);

    // Definir un rango mayor para la detección de centrado
    let threshold = 5;

    // Comprobar si el juego ya ha sido ganado
    if (distanceX < threshold && distanceY < threshold && !isGameWon) {
        // Cambiar los colores de los círculos a verde
        circleLarge.style.borderColor = 'green';
        circleSmall.style.borderColor = 'green';
        circleGuide.style.borderColor = 'green'; // Cambiar el color del círculo guía también

        // Establecer la bandera de juego ganado
        isGameWon = true;

        // Generar fuegos artificiales
        createFireworks(gameAreaWidth / 2, gameAreaHeight / 2);
    }
}

// Función para crear fuegos artificiales
function createFireworks(x, y) {
    for (let i = 0; i < 5; i++) {
        let firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${x + (Math.random() * 100) - 50}px`;
        firework.style.top = `${y + (Math.random() * 100) - 50}px`;
        gameArea.appendChild(firework);

        // Eliminar los fuegos artificiales después de la animación
        setTimeout(() => {
            firework.remove();
        }, 800);
    }
}

// Inicializar el evento de movimiento
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', handleMotion, false);
} else {
    alert("El dispositivo no soporta el evento de movimiento.");
}