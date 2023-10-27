var mode = document.querySelector(".fa-solid");

mode.addEventListener("click", function mudar(){
texto = document.querySelectorAll("h5");
body = document.querySelector("body");
do{
    body.classList.add("dark-mode")
}while(
   body.backgroundColor("rgb(203, 220, 220)")
)
});

const retry = document.querySelector(".retry")

retry.addEventListener("click", function replay(){
    const gameOver = document.querySelector(".gameover");
    gameOver.style.display = "none"
    audio2.pause()
    setTimeout(function(){
        location.reload();
    },100);

})


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const h5 = document.querySelector(".score");

const audio = new Audio('../assets/audio.mp3');
const audio2 = new Audio("../assets/gameover.mp3");

const size = 30
const snake = [  {x: 0, y: 0},
]
let direction, loopId 

const drawSnake = () =>{
    ctx.fillStyle = "#ddd"
    
    snake.forEach((position, index) => {

        if(index == snake.length -1) {
             ctx.fillStyle = "#008000"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
};

 const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#014501"

for(let i = 30; i < canvas.width; i += 30) {
    ctx.beginPath()
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 500);
    ctx.stroke()

    ctx.beginPath()
    ctx.lineTo(0, i);
    ctx.lineTo(500, i);
    ctx.stroke()

}  
 }

 const randomNumber = (min, max) =>{
    return Math.round(Math.random() * (max - min) + min)
 }

 const randomPosition = () =>{
    const number =randomNumber(4, canvas.width - size)
    return Math.round(number / 30) * 30
 }



 const randomColor = () =>{
    const red = randomNumber(0, 255)  
    const green = randomNumber(0, 255) 
    const blue = randomNumber(0, 255)
    
    return `rgb(${red}, ${green}, ${blue})`
 }

h5.innerText = randomPosition();



const moveSnake = () =>{
    const head = snake[snake.length -1]
    if(!direction) return
    

    if(direction == "right") {
        snake.push({ x: head.x + size, y: head.y})
    }
      if(direction == "left") {
        snake.push({ x: head.x - size, y: head.y})
    }
    if(direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    if(direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()   
}


const checkLoser = () =>{
    const head = snake[snake.length -1]

    const pegarIndex = snake.length -2

    const limiteCanvas = canvas.width

    const gameOver = document.querySelector(".gameover")

    const normallose = 
        head.x < 0 || head.x > limiteCanvas || head.y < 0 || head.y > limiteCanvas;

    const autoLose = snake.find((position, index) => {
        return index < pegarIndex && position.x == head.x && position.y == head.y
    })

    if( autoLose || normallose){
        audio2.play()
        gameOver.style.display = "block", "transition:3s;"
       
    }

} 

const score = () =>{
    h5.innerText = [snake.length  -1] 
     
   }

   


const alimento = {
    x:randomPosition(),
    y:randomPosition(),
    color: randomColor()
}
const drawAlimento = () =>{
    const {x, y, color} = alimento

    ctx.shadowColor = color
    ctx.shadowBlur = 60
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}


const gamelup = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600);
    moveSnake();
     drawSnake();
     drawGrid();
     drawAlimento();
     eat();
     checkLoser();
     score();

loopId = setTimeout(() => {
    gamelup();
},300)
}

const eat = () =>{
    const head = snake[snake.length -1];
    if(head.x == alimento.x && head.y == alimento.y){
        snake.push(head)
        audio.play()
    
     let x = randomPosition()
     let y =  randomPosition()

    while( snake.find((position) => position.x == x && position.y == y)) {
        x =  randomPosition()
        y =  randomPosition()
        }


        alimento.x = x
        alimento.y = y
        alimento.color = randomColor()


    };

    
};






gamelup();


document.addEventListener("keydown", ({ key })=>{
    if(key == "ArrowRight" && direction != "left"){
        direction = "right"
    }else if(key == "ArrowLeft" && direction != "right"){
        direction = "left"
    }else if(key == "ArrowDown" && direction != "up"){
        direction = "down"
    }else if(key == "ArrowUp" && direction != "down"){
        direction = "up"
    }
});