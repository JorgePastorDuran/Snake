class Snake {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1
        
    }

    move() {
        let newRect

        if (this.rotateX == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateX == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateY == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if (this.rotateY == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }
        
        this.tail.shift()
        this.tail.push(newRect)
    }
}



class Apple{
    constructor(){
        play1()
        let isTouching
        
        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            
            for (let i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true
                }
            }

            this.size = snake.size
            this.color = "red"

            if (!isTouching) {
                break;
            }
        }
    }
}


class BadApple{
    constructor(){
        play3()
        let isTouching
        
        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            
            for (let i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true
                }
            }

            this.size = snake.size
            this.color = "green"

            if (!isTouching) {
                break;
            }
        }
    }
}

const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext('2d')


window.onload = () => {    
    gameLoop();    
}

function gameLoop() {
    setInterval(show, 1500/20) 
}


function show() {
    update()
    draw()
}

function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    eatApple()
    eatBadApple()
    checkHitWall()
}

function eatApple() {
    if(snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y){
            snake.tail[snake.tail.length] = {x:apple.x, y: apple.y}        
            apple = new Apple();
        }
}


function eatBadApple() {
    if(snake.tail[snake.tail.length - 1].x == appleBad.x &&
        snake.tail[snake.tail.length - 1].y == appleBad.y){
            snake.tail.length = 0;
            snake.tail[snake.tail.length] = {x:appleBad.x, y: appleBad.y}        
            appleBad = new BadApple();
        }
}



function checkHitWall() {
    let headTail = snake.tail[snake.tail.length -1]

    if (headTail.x == - snake.size) {
        headTail.x = canvas.width - snake.size
     } else if (headTail.x == canvas.height) {
         headTail.x = 0
     } else if (headTail.y == - snake.size) {
        headTail.y = canvas.height - snake.size
     } else if (headTail.y == canvas.height) {
        headTail.y = 0 
     }
}

function draw() {
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0, canvas.width, canvas.height)

    for (let i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size- 5, "white")
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: " + (snake.tail.length -1),canvas.width - 120, 18)
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
    createRect(appleBad.x, appleBad.y, appleBad.size, appleBad.size, appleBad.color)
}

function createRect(x,y,width, height,color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

window.addEventListener("keydown", (event) => {     //https://keycode.info/
    setTimeout(() => {
        if (event.keyCode == 37 ||event.keyCode==65 && snake.rotateX != 1) {    //left
            snake.rotateX = -1
            snake.rotateY = 0
        } else if (event.keyCode == 38||event.keyCode==87 && snake.rotateY != 1) { //up
            snake.rotateX = 0
            snake.rotateY = -1
        } else if (event.keyCode == 39||event.keyCode==68 && snake.rotateX != -1) { //right
            snake.rotateX = 1
            snake.rotateY = 0
        } else if (event.keyCode == 40||event.keyCode==83 && snake.rotateY != -1) { //Down
            snake.rotateX = 0
            snake.rotateY = 1
        }
    }, 1)
})


function play3() {

    var audio = new Audio('GreenApple.mp3');
    audio.play();

}


function play2() {

    var audio = new Audio('snake2.mp3');
    audio.play();

}

function play1() {

    var audio = new Audio('effect.mp3');
    audio.play();

}


const snake = new Snake(20,20,20);
let apple = new Apple();
let appleBad= new BadApple();


alert("Red apples will increase your size by one, but if you eat a green apple you will return to the original size.");



