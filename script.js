console.log("test");

//Gameboard object -> module IIFE
//gameboard array inside object


const gameBoard =(()=>{
    let board = [
        "1","2","3",
        "4","5","6",
        "7","8","9"
    ];

    let playerMove = (player, move)=>{
        //check if position is available, then apply player move
        let legalMove;
        if(board[move]!=="X" && board[move]!=="O"){
            board[move] = player.piece;
            
            console.log(`${player.name} placed an "${player.piece}" at ${move}`);
            legalMove=true;
        }
        else{
            alert("Position already occupied");
            legalMove=false;
        }
        printBoard();
        return legalMove;
    };

    let printBoard =() =>{
        console.log(board[0], board[1], board[2]);
        console.log(board[3], board[4], board[5]);
        console.log(board[6], board[7], board[8]);
    }

    let checkForWin = ()=>{
        //check every win condition, return answer
        let gameOver = false;
        let win0,win1,win2,win3,win4 = false;
        win0 = board[0]==board[1] && board[0]==board[2];    //top row
        win1 = board[3]==board[4] && board[3]==board[5];    //middle row
        win2 = board[6]==board[7] && board[6]==board[8];    //bottom row
        win3 = board[0]==board[4] && board[0]==board[8];    //backslash diagonal
        win4 = board[6]==board[4] && board[6]==board[2];    //forward slash diagonal
        if(win0 || win1 || win2 || win3 || win4){
            gameOver=true;
        }
        return gameOver;
    }

    return {playerMove, printBoard, checkForWin};
})();


//Player factory
const Player = (name, piece)=>{
    const identifySelf = ()=> console.log(`My name is ${name}, my game piece is "${piece}"`);
    return {name, piece, identifySelf};
}

const player1 = Player("Juanito","X");
const player2 = Player("Martin", "O");


const gameFlow = (()=>{
    let gameState = true;
    let player1Turn = true;
    let count=0;
    
    return (move)=>{
        if(gameState){
            console.log("init gameState= " + gameState);
            console.log("gameFlow move= " + move)
            let player = player1Turn ? player1 : player2;
            let legalMove = gameBoard.playerMove(player, move);
            if(legalMove){
                //updateBoard with player.piece
                player1Turn = !player1Turn;
                ++count;
            }
            //call function to check if someone won or tied
            //use return from function as condition for if statement
            if(gameBoard.checkForWin() || count>8){
                gameState=false;
                alert("Game over!")
            };
        }
        console.log("end gameState= " + gameState);
        //updateBoard
    }

})();
 
const boardPositionList = document.querySelectorAll(".boardPosition");

boardPositionList.forEach((position)=>{
    position.addEventListener("click",()=>{
        let move = position.dataset.pos;
        console.log("Button click move= " +move);
        gameFlow(move);
    })
});