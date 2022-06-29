//game constant
let inputDir = {x:0 ,  y:0};
const  gameSound = new Audio("sound1.mp3");
const  foodSound= new Audio("sound2.mp3");
let speed =5;
let lastPaintTime=0;
let snakeArr = [
    {x:13 , y:15}
]
let score=0;
food ={x:14, y:14};

//game function-> game loop
//fps-> frams per secnond
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake ) {
    //if you bump into yorself
    for(let i=1 ;i<snake.length ;i++){
        if((snake[0].x===snake[i].x ) &&(snake[0].y ===snake[i].y)){
            return true;
        }
    }
    //if snake hit the walll
    if(snake[0].x >= 20 || snake[0].x<=0 || snake[0].y >=20 || snake[0].y<=0){
        return true;
    }
}

function gameEngine(){
    //part-1 : updating the snake array
    if(isCollide(snakeArr)) {
        inputDir={x:0, y:0};
        alert("Game over .press any key ot resume");
        snakeArr=[{x:13, y:15}];
        score=0;
    }
    //if the snake eats food , increment the score and regenerate the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x ,y:snakeArr[0].y + inputDir.y});
        //for genrating food
        score +=1;
        scoreBox.innerHTML=`Score: ${score}`;
        let a = 2;
        let b = 19;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+ (b-a)*Math.random())};

    }
    
    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //part 2: display the  snake and food
    //dispaly the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index === 0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    //dispaly the food
   
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement);

}

// main logic start form here
window.requestAnimationFrame(main)

window.addEventListener('keydown', e=>{
    inputDir={x:0  ,y:1 }   //start the game
    gameSound.play();
    //which key is presed
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x =0;
            inputDir.y =-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x =0;
            inputDir.y =1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x =-1;
            inputDir.y =0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x =1;
            inputDir.y =0;
            break;

        default:
            break;
    }
});