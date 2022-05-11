
const colors = [String("green"), String("red"), String("white"), String("blue"), String("orange"), String("yellow")]
const balls = []
const numberOfBalls = Number(50)

const display = document.getElementById("display");
display.height = Number(display.clientHeight) * Number(window.devicePixelRatio);
display.width = Number(display.clientWidth) * Number(window.devicePixelRatio);
const context = display.getContext("2d");

generateBalls(numberOfBalls)

window.addEventListener('resize', () => { 
    display.height = Number(display.clientHeight) * Number(window.devicePixelRatio);
    display.width = Number(display.clientWidth) * Number(window.devicePixelRatio);
    for (ball in balls) {
        balls.pop()
    }
    generateBalls(numberOfBalls)

});

setInterval(moveAll, 20)

// Generate a given number of balls
function generateBalls(number) {
    for (let index = 0; index < number; index++) {
        balls.push(createball(colors[getRandomInt(0, colors.length)]))
    }
}

function moveAll() {
    //console.log("moving balls")

    // Clear the specified pixels within the given rectangle
    context.clearRect(0, 0, display.width, display.height);

    // Move all the balls
    for (let index2 = 0; index2 < balls.length; index2++) {
        balls[index2] = move(balls[index2])
    }
}

// Create a ball object
function createball(color) {

    // Set up initial position and speed
    const x = getRandomArbitrary(50, display.width - 50)
    const y = getRandomArbitrary(50, display.height - 50)

    const horizontalSpeed = Math.floor((getRandomArbitrary(-1, 1) * 6))
    const verticalSpeed = Math.floor((getRandomArbitrary(-1, 1) * 12))

    const radius = Number(15)

    return {
        x,
        y,
        horizontalSpeed,
        verticalSpeed,
        radius,
        color,
    }
}

// Draw and move a ball
function move(ball) {
    // Creating a circle
    context.beginPath();
    context.strokeStyle = ball.color;
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.stroke();

    // Conditions so that the ball bounces
    // from the edges
    if (ball.radius + ball.x > display.width) {
        ball.horizontalSpeed = 0 - ball.horizontalSpeed;
    }
    if (ball.x - ball.radius < 0) {
        ball.horizontalSpeed = 0 - ball.horizontalSpeed;
    }
    if (ball.y + ball.radius > display.height) {
        ball.verticalSpeed = 0 - ball.verticalSpeed;
    }
    if (ball.y - ball.radius < 0) {
        ball.verticalSpeed = 0 - ball.verticalSpeed;
    }
        
    ball.x = ball.x + ball.horizontalSpeed;
    ball.y = ball.y + ball.verticalSpeed;

    return ball
}

// From here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}