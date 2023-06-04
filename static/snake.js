let gameBoard = document.getElementById('game-board');

let snake = [];
let snakeLength = 5;
let positions = [];

for (let i = 0; i < snakeLength; i++) {
    let segment = document.createElement('div');
    segment.classList.add('snake');
    segment.style.left = i * 20 + 'px';
    gameBoard.appendChild(segment);
    snake.unshift(segment);
    positions.unshift({ x: i * 20, y: 0 });
}

let targetX = 0;
let targetY = 0;
let speed = 1; // Set the speed of the snake
let fruitsEaten = 0;

document.addEventListener('mousemove', function(e) {
    targetX = e.clientX;
    targetY = e.clientY;
});

setInterval(function() {
    let currentX = snake[0].offsetLeft;
    let currentY = snake[0].offsetTop;

    let diffX = targetX - currentX;
    let diffY = targetY - currentY;

    let distance = Math.hypot(diffX, diffY);

    if (distance > speed) {
        let angle = Math.atan2(diffY, diffX);

        let newX = currentX + speed * Math.cos(angle);
        let newY = currentY + speed * Math.sin(angle);

        // Prevent the snake from escaping the game board
        if (newX >= 0 && newX <= gameBoard.offsetWidth - snake[0].offsetWidth) {
            snake[0].style.left = newX + 'px';
        }
        if (newY >= 0 && newY <= gameBoard.offsetHeight - snake[0].offsetHeight) {
            snake[0].style.top = newY + 'px';
        }

        positions.unshift({ x: newX, y: newY });
        if (positions.length > snake.length * 20) {
            positions.pop();
        }

        // Make the rest of the snake follow the head
        for (let i = 1; i < snake.length; i++) {
            snake[i].style.left = positions[i * 20].x + 'px';
            snake[i].style.top = positions[i * 20].y + 'px';
        }
    }
}, 10);

setInterval(function() {
    let fruit = document.createElement('div');
    fruit.classList.add('fruit');
    gameBoard.appendChild(fruit);

    fruit.style.left = Math.random() * (gameBoard.offsetWidth - fruit.offsetWidth) + 'px';
    fruit.style.top = Math.random() * (gameBoard.offsetHeight - fruit.offsetHeight) + 'px';

    setTimeout(function() {
        fruit.remove();
    }, 5000);
}, 5000);

setInterval(function() {
    let fruits = document.getElementsByClassName('fruit');

    for (let i = 0; i < fruits.length; i++) {
        let fruit = fruits[i];

        let diffX = fruit.offsetLeft - snake[0].offsetLeft;
        let diffY = fruit.offsetTop - snake[0].offsetTop;

        let distance = Math.hypot(diffX, diffY);

        if (distance < snake[0].offsetWidth / 2 + fruit.offsetWidth / 2) {
            fruit.remove();
            speed += 0.5;
            fruitsEaten += 1;

            // Increase the length of the snake
            let segment = document.createElement('div');
            segment.classList.add('snake');
            gameBoard.appendChild(segment);
            snake.push(segment);

            // Update the scoreboard
            document.getElementById('fruits-eaten').textContent = 'Fruits eaten: ' + fruitsEaten;
            document.getElementById('speed').textContent = 'Speed: ' + speed.toFixed(1);
        }
    }
}, 10);