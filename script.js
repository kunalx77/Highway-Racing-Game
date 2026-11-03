
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// UI Elements
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const speedElement = document.getElementById("speed");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const finalScoreElement = document.getElementById("finalScore");

// Mobile buttons
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

// Game variables
let score = 0;
let lives = 3;
let carSpeed = 4;
let gameState = "start";

let roadLinePosition = 0;
let enemyTimer = 0;
let animationId;

let enemyCars = [];

const keys = {
    ArrowLeft: false,
    ArrowRight: false
};

// Player car
const player = {
    x: 225,
    y: 490,
    width: 50,
    height: 85,
    speed: 6
};

// Enemy car colors
const carColors = [
    "#ff3333",
    "#ffcc00",
    "#9b59ff",
    "#ffffff",
    "#ff7b22",
    "#00cc88"
];

// Keyboard controls
document.addEventListener("keydown", function(event) {
    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    ) {
        event.preventDefault();
        keys[event.key] = true;
    }
});

document.addEventListener("keyup", function(event) {
    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    ) {
        keys[event.key] = false;
    }
});

// Mobile touch controls
function setupTouchButton(button, direction) {

    button.addEventListener("pointerdown", function(event) {
        event.preventDefault();

        if (gameState === "playing") {
            keys[direction] = true;
        }

        button.setPointerCapture(event.pointerId);
    });

    function releaseButton() {
        keys[direction] = false;
    }

    button.addEventListener("pointerup", releaseButton);
    button.addEventListener("pointercancel", releaseButton);
    button.addEventListener("lostpointercapture", releaseButton);
}

setupTouchButton(leftButton, "ArrowLeft");
setupTouchButton(rightButton, "ArrowRight");

// Sound effects
let audioContext;

function playSound(frequency, duration, type = "sine") {

    try {

        if (!audioContext) {
            audioContext = new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(
            0.15,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);

    } catch (error) {
        console.log("Audio is not supported.");
    }
}

// Draw highway
function drawRoad() {

    // Grass
    ctx.fillStyle = "#176b35";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Road
    ctx.fillStyle = "#353535";
    ctx.fillRect(65, 0, 370, canvas.height);

    // Road boundaries
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(65, 0, 6, canvas.height);
    ctx.fillRect(429, 0, 6, canvas.height);

    // Lane markings
    ctx.fillStyle = "#ffffff";

    for (let y = -60; y < canvas.height; y += 100) {
        ctx.fillRect(185, y + roadLinePosition, 6, 45);
        ctx.fillRect(309, y + roadLinePosition, 6, 45);
    }

    // Road animation
    roadLinePosition += carSpeed;

    if (roadLinePosition >= 100) {
        roadLinePosition = 0;
    }
}

// Draw detailed cars
function drawDetailedCar(car, isEnemy = false) {

    const x = car.x;
    const y = car.y;
    const w = car.width;
    const h = car.height;

    ctx.save();

    ctx.translate(x + w / 2, y + h / 2);

    if (isEnemy) {
        ctx.rotate(Math.PI);
    }

    const color = isEnemy ? car.color : "#00d9ff";

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.4)";

    ctx.beginPath();
    ctx.roundRect(-w / 2 + 3, -h / 2 + 5, w, h, 12);
    ctx.fill();

    // Tyres
    ctx.fillStyle = "#101010";

    ctx.beginPath();
    ctx.roundRect(-w / 2 - 4, -h / 2 + 13, 8, 20, 3);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(w / 2 - 4, -h / 2 + 13, 8, 20, 3);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(-w / 2 - 4, h / 2 - 33, 8, 20, 3);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(w / 2 - 4, h / 2 - 33, 8, 20, 3);
    ctx.fill();

    // Car body gradient
    const gradient = ctx.createLinearGradient(
        -w / 2, 0, w / 2, 0
    );

    gradient.addColorStop(0, "#222222");
    gradient.addColorStop(0.25, color);
    gradient.addColorStop(0.75, color);
    gradient.addColorStop(1, "#222222");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, 11);
    ctx.fill();

    // Body outline
    ctx.strokeStyle = "rgba(255,255,255,0.65)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Front windshield
    ctx.fillStyle = "#102d40";

    ctx.beginPath();
    ctx.roundRect(
        -w / 2 + 7,
        -h / 2 + 13,
        w - 14,
        22,
        5
    );
    ctx.fill();

    // Rear windshield
    ctx.beginPath();
    ctx.roundRect(
        -w / 2 + 8,
        h / 2 - 32,
        w - 16,
        19,
        4
    );
    ctx.fill();

    // Window reflection
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(-w / 2 + 13, -h / 2 + 16);
    ctx.lineTo(-w / 2 + 20, -h / 2 + 29);
    ctx.stroke();

    // Headlights
    ctx.fillStyle = "#fff7a8";

    ctx.beginPath();
    ctx.roundRect(-w / 2 + 5, -h / 2 + 3, 12, 6, 2);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(w / 2 - 17, -h / 2 + 3, 12, 6, 2);
    ctx.fill();

    // Tail lights
    ctx.fillStyle = "#ff2020";

    ctx.beginPath();
    ctx.roundRect(-w / 2 + 5, h / 2 - 9, 12, 6, 2);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(w / 2 - 17, h / 2 - 9, 12, 6, 2);
    ctx.fill();

    // Side mirrors
    ctx.fillStyle = "#111111";

    ctx.fillRect(-w / 2 - 5, -h / 2 + 25, 5, 10);
    ctx.fillRect(w / 2, -h / 2 + 25, 5, 10);

    ctx.restore();
}

// Draw player
function drawPlayer() {
    drawDetailedCar(player, false);
}

// Draw enemy cars
function drawEnemyCars() {

    enemyCars.forEach(function(car) {
        drawDetailedCar(car, true);
    });

}

// Create enemy car
function createEnemyCar() {

    const lanes = [105, 225, 345];

    const randomLane =
        lanes[Math.floor(Math.random() * lanes.length)];

    const randomColor =
        carColors[Math.floor(Math.random() * carColors.length)];

    enemyCars.push({

        x: randomLane,
        y: -100,
        width: 50,
        height: 85,
        speed: carSpeed,
        color: randomColor

    });

}

// Move player
function movePlayer() {

    if (keys.ArrowLeft) {
        player.x -= player.speed;
    }

    if (keys.ArrowRight) {
        player.x += player.speed;
    }

    // Keep car inside road
    if (player.x < 80) {
        player.x = 80;
    }

    if (player.x > 370) {
        player.x = 370;
    }

}

// Update enemy cars
function updateEnemyCars() {

    for (let i = enemyCars.length - 1; i >= 0; i--) {

        const car = enemyCars[i];

        car.y += car.speed;

        // Score when car is successfully avoided
        if (car.y > canvas.height) {

            enemyCars.splice(i, 1);

            score += 10;

            scoreElement.textContent = score;

            playSound(650, 0.08);

        }

    }

}

// Collision detection
function isColliding(obj1, obj2) {

    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );

}

// Check car collision
function checkCollision() {

    for (let i = enemyCars.length - 1; i >= 0; i--) {

        if (isColliding(player, enemyCars[i])) {

            enemyCars.splice(i, 1);

            lives--;

            livesElement.textContent = lives;

            playSound(120, 0.3, "sawtooth");

            if (lives <= 0) {
                endGame();
            }

            break;
        }

    }

}

// Increase difficulty
function updateDifficulty() {

    carSpeed = 4 + Math.floor(score / 100);

    if (carSpeed > 10) {
        carSpeed = 10;
    }

    speedElement.textContent = Math.round(carSpeed / 4);

}

// Main game loop
function gameLoop() {

    if (gameState !== "playing") {
        return;
    }

    drawRoad();

    movePlayer();

    updateEnemyCars();

    checkCollision();

    if (gameState !== "playing") {
        return;
    }

    // Generate enemy cars
    enemyTimer++;

    if (enemyTimer >= 65) {

        createEnemyCar();

        enemyTimer = 0;

    }

    updateDifficulty();

    drawEnemyCars();

    drawPlayer();

    animationId = requestAnimationFrame(gameLoop);

}

// Start game
function startGame() {

    score = 0;
    lives = 3;
    carSpeed = 4;

    roadLinePosition = 0;
    enemyTimer = 0;

    player.x = 225;
    player.y = 490;

    enemyCars = [];

    keys.ArrowLeft = false;
    keys.ArrowRight = false;

    scoreElement.textContent = score;
    livesElement.textContent = lives;
    speedElement.textContent = "1";

    gameState = "playing";

    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";

    cancelAnimationFrame(animationId);

    gameLoop();

}

// End game
function endGame() {

    gameState = "gameover";

    keys.ArrowLeft = false;
    keys.ArrowRight = false;

    cancelAnimationFrame(animationId);

    finalScoreElement.textContent = score;

    gameOverScreen.style.display = "flex";

}

// Button events
startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", startGame);

