//game constants
let inputDir = {x:0,y:0};
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 5;
let lastPaintTime = 0;  // Stores the time when the screen was last updated
let score = 0;
let snakeArr = [
    {
        x: 13,
        y: 15,
    }
];

food = {
    x: 6,
    y: 7,
};



//game functions
function main(ctime)    //current time
{
    musicSound.play();
    window.requestAnimationFrame(main);  //Most screens refresh at 60 frames per second (FPS).
                                        //requestAnimationFrame ensures that your animation updates match this refresh rate, providing a smooth user experience.
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
};

function isCollide(snake){
    for(let i = 1; i < snakeArr.length;i++){
        //if snake collide itself
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }

    //if snake collide with wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
    {
        return true;
    }
}

function gameEngine(){
    //part 1: Updating snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x : 0,y:0};
        alert("Game Over! Please try again");
        snakeArr = [ {x : 13, y : 15} ];
        // musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score : " + score;
    }

    //If you have eaten the food regenerate the food and increment the score
    // If the snake eats the food, grow the snake and generate new food
if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    // Add a new segment at the head position
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "Score : " + score;
    snakeArr.unshift({
        x: snakeArr[0].x + inputDir.x,
        y: snakeArr[0].y + inputDir.y
    });

    // Generate new food at a random location
    let a = 2;
    let b = 16;
    food = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random())
    };

    // Increment the score
    score += 1;
    console.log("Score:", score);
}


    //moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: display the snake
    let board = document.querySelector("#board");
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0)
        {
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//main logic starts from here

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x : 0,y : 1}    // start the game
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp" :
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown" :
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft" :
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
         case "ArrowRight" :
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
         default :
            break;
    }
});