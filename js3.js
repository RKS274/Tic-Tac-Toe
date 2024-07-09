const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-Info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
 
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
//lets initialize the game by creating a function

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //Ui pr empty bhi krn appdga boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //ek or chij krna h green ko htaana bhi to hai
        box.classList = `box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    //backticks ``
}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //UI update i.e on info wala ki change hgya hai
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    //newGameBtn.classList.add("active");
    let answer = "";
    winningPositions.forEach((position) => {
    //all 3 boxes should be non empty and exactly samer in valuee;
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
    && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){
    
        //check if winner is X
        if(gameGrid[position[0]] === "X") answer = "X";
        else answer = "O";

        //disable pointers events

        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });

        //now we know X/) is a winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
});

        //it means we have a winner

        if(answer !== ""){
            gameInfo.innerText = `winner Player - ${answer}`;
            newGameBtn.classList.add("active");
            return;
        }

        //..lets check whether tjetre is tie
        let fillCount = 0;
        gameGrid.forEach((box) => {
            if(box !== "") fillCount++;
        });

        //board is filled game is tie
        if(fillCount === 9){
            gameInfo.innerText = "Game Tied !";
            newGameBtn.classList.add("active");
        }



    
    }



    




function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        //cursor pointer nhii bnnga jbb ek barr daal dngfe value
        boxes[index].style.pointerEvents = "none";
        //swap kro turn ko
        swapTurn();
        //chk koi jeet toh nhii gya
        checkGameOver();
    }
}


boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);
