const snakeboard = document.getElementById("SnakeCanvas");
const snakeboard_ctx = snakeboard.getContext("2d");
const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';
let snake;
// Horizontal
let dx = 10;
// Vertical
let dy = 0;
let gameEnd;
let food_x;
let food_y;
let snakeReset = false;
let Smove;
let score = 0;
document.querySelector('.startSnake').addEventListener("click",start);
document.querySelector('.resetSnake').addEventListener("click",resetSnake);
document.addEventListener("keydown", changeDirection)

initialSnakeboard()

function initialSnakeboard(){
    snake = [
        {x: 200, y: 200},
        {x: 190, y: 200},
        {x: 180, y: 200},
        {x: 170, y: 200},
        {x: 160, y: 200}
    ]
    clearCanvas();
    gen_food();
    drawSnake();
}

function start() {
    gameEnd = false;
    clearCanvas();
    drawSnake();
    snakeStarted();
}

function snakeStarted() {

    if(gameEnd){
        return;
    }
    
    document.querySelector('.startSnake').style.display = "none";
    document.querySelector('.resetSnake').style.display = "initial";
    Smove = setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameEnded();
        snakeStarted();
    }, 100);
}

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snakePart.x,snakePart.y,10,10);
    snakeboard_ctx.strokeRect(snakePart.x,snakePart.y,10,10)
}

function drawSnake(){
    snake.forEach(drawSnakePart)
}

function moveSnake(){
    
    const head = {x: snake[0].x + dx, y: snake[0].y + dy}
    snake.unshift(head);
    const foodEat = snake[0].x === food_x && snake[0].y === food_y;
    if (foodEat){
        score += 10;
        document.getElementById('score').innerHTML = score;
        gen_food()
    } else {
        snake.pop();
    }
}

function changeDirection(event){
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight)
    {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown)
    {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft)
    {
        dx = 10;
        dy = 0;
    }


    if (keyPressed === DOWN_KEY && !goingUp)
    {
        dx = 0;
        dy = 10;
    }

}

function random_food(min,max){
    return Math.round((Math.random()*(max-min) + min) / 10 ) * 10;
}

function gen_food(){
    food_x = random_food(0, snakeboard.width - 10);
    food_y = random_food(0, snakeboard.height - 10);
    snake.forEach(function snakeEatFood(part){
        const snakeEaten = part.x == food_x && part.y == food_y;
        if (snakeEaten) {
            gen_food();
        }
    });
}

function drawFood(){
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokestyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x,food_y,10,10);
    snakeboard_ctx.strokeRect(food_x,food_y,10,10);
}

function gameEnded(){
    for (let i = 4; i < snake.length; i++){
        const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if(has_collided){
            gameEnd = true;
            return gameEnd;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitDownWall = snake[0].y > snakeboard.height -10;

    if(hitLeftWall || hitRightWall || hitTopWall || hitDownWall) {
        gameEnd = true;
        return gameEnd;
    }
}

function clearCanvas() {
    //  reset background
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function resetSnake(){
    gameEnd = true;
    clearTimeout(Smove)
    initialSnakeboard()
    score = 0;
    document.getElementById('score').innerHTML = score;
    document.querySelector('.startSnake').style.display = "";
    document.querySelector('.resetSnake').style.display = "none";
}