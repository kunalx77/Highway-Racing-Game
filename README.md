# 🏎️ Highway Racing Game

## 1. Project Overview

Highway Racing is a simple, interactive 2D arcade racing game developed using HTML5, CSS3, JavaScript, and the HTML5 Canvas API.

The player controls a car on a highway and must avoid incoming enemy vehicles to survive and achieve the highest possible score.

The game supports both desktop and Android devices with keyboard and touch controls.

## 2. Objectives

* Develop an interactive 2D racing game.
* Implement keyboard and touch-based user controls.
* Demonstrate animation using the Canvas API.
* Implement collision detection.
* Add scoring and lives management.
* Generate sound effects using the Web Audio API.
* Create a responsive interface for desktop and mobile devices.

## 3. Technology Stack

| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| HTML5                 | Game structure and canvas     |
| CSS3                  | Styling and responsive design |
| JavaScript            | Game logic and interaction    |
| Canvas API            | Drawing cars and highway      |
| Web Audio API         | Generating sound effects      |
| RequestAnimationFrame | Smooth game animation         |

## 4. Features

### Player Controls

* Move the car left and right.
* Desktop controls using arrow keys.
* Android controls using on-screen touch buttons.

### Traffic System

* Enemy cars appear randomly in different lanes.
* Enemy vehicles move downward.
* Different colours are used for enemy cars.

### Scoring System

* The player earns 10 points for every successfully avoided enemy car.
* The score is displayed during gameplay.

### Lives System

* The player starts with 3 lives.
* Each collision with an enemy car decreases one life.
* The game ends when all lives are lost.

### Difficulty System

* Game speed gradually increases as the score increases.
* Maximum car speed is limited to maintain playable gameplay.

### Game Screens

* Start screen with game instructions.
* Main gameplay screen.
* Game Over screen with final score.
* Restart button to play again.

### Multimedia Features

* Animated highway and moving vehicles.
* Car graphics drawn using Canvas.
* Sound effects generated through Web Audio API.
* Crash image displayed on the Game Over screen.

### Responsive Design

* Supports desktop and mobile browsers.
* Touch controls for Android devices.
* Responsive layout for smaller screens.

## 5. Project Folder Structure

```text
Highway-Racing/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── images/
    └── crash.png
```

## 6. How to Run the Project

### Requirements

* Google Chrome, Microsoft Edge, or another modern browser.
* Visual Studio Code (recommended for editing).

### Steps

1. Download or copy the project folder.
2. Open the folder in Visual Studio Code.
3. Ensure all files and folders are present.
4. Open `index.html` in a web browser.
5. Click the Start Game button.

No additional installation or backend setup is required.

## 7. Game Instructions

1. Start the game using the Start Game button.
2. Control your car using the arrow keys or mobile touch buttons.
3. Avoid incoming enemy vehicles.
4. Earn 10 points for every successfully avoided car.
5. Avoid collisions to preserve your lives.
6. The game ends when all 3 lives are lost.
7. Click Play Again to restart.

## 8. Controls

| Action     | Desktop      | Android          |
| ---------- | ------------ | ---------------- |
| Move Left  | Left Arrow   | Left Button      |
| Move Right | Right Arrow  | Right Button     |
| Start Game | Start Button | Tap Start Button |
| Restart    | Play Again   | Tap Play Again   |

## 9. Important JavaScript Concepts Used

### A. Game Loop

The `requestAnimationFrame()` function continuously updates and renders the game.

### B. Collision Detection

Axis-Aligned Bounding Box (AABB) collision detection checks whether the player car overlaps with enemy cars.

### C. Random Enemy Generation

The `Math.random()` function selects random lanes and colours for enemy vehicles.

### D. Event Handling

Keyboard events and pointer events handle desktop and mobile controls.

### E. Score and Lives Management

JavaScript variables maintain the player's score and remaining lives.

### F. Canvas Drawing

The Canvas API draws the highway, cars, windows, tyres, headlights, and other visual elements.

### G. Sound Generation

The Web Audio API generates sound effects using oscillators and gain nodes.

## 10. Main JavaScript Functions

| Function             | Description                               |
| -------------------- | ----------------------------------------- |
| `drawRoad()`         | Draws and animates the highway            |
| `drawDetailedCar()`  | Draws detailed car graphics               |
| `drawPlayer()`       | Draws the player's car                    |
| `drawEnemyCars()`    | Draws enemy vehicles                      |
| `createEnemyCar()`   | Generates enemy cars                      |
| `movePlayer()`       | Handles player movement                   |
| `updateEnemyCars()`  | Updates enemy car positions               |
| `isColliding()`      | Checks collision between objects          |
| `checkCollision()`   | Handles car collisions and life reduction |
| `updateDifficulty()` | Increases game speed                      |
| `gameLoop()`         | Runs the main game animation              |
| `startGame()`        | Starts or restarts the game               |
| `endGame()`          | Displays the Game Over screen             |
| `playSound()`        | Generates audio effects                   |

## 11. Future Enhancements

* Add more vehicle designs.
* Introduce different highway environments.
* Add background music.
* Add a high-score system.
* Introduce additional traffic patterns.
* Add a pause and resume feature.
* Add fuel and bonus power-ups.

## 12. Conclusion

Highway Racing demonstrates the practical implementation of multimedia concepts through an interactive 2D arcade game.

The project combines graphics, animation, sound effects, keyboard interaction, touch controls, and collision detection to provide an engaging gaming experience.

It also demonstrates how HTML5, CSS3, JavaScript, and browser APIs can be used to develop lightweight games without external libraries or frameworks.

---

**Project Name:** Highway Racing
**Project Type:** 2D Arcade Racing Game
**Platform:** Desktop and Android Browsers
**Developed Using:** HTML5, CSS3, JavaScript
