//GameBoard IIFE module
const gameBoard =(()=>{
    let board = [
        "-","-","-",
        "-","-","-",
        "-","-","-"
    ];

    let playerMove = (player, move)=>{
        //check if position is available, then apply player's move
        let legalMove;
        //if the position isn't already ocuppied
        if(board[move]!=="X" && board[move]!=="O"){
            board[move] = player.piece;
            console.log(`${player.name} placed an "${player.piece}" at ${move}`);
            legalMove=true;
        }
        else{
            //alert("Position already occupied");
            legalMove=false;
        }
        printBoard();
        //returns a true if the move was legal, and false if it wasn't
        return legalMove;
    };

    //For debugging
    let printBoard =() =>{
        console.log(board[0], board[1], board[2]);
        console.log(board[3], board[4], board[5]);
        console.log(board[6], board[7], board[8]);
    }

    let checkForWin = ()=>{
        //check every win condition, return answer
        let gameOver = false;
        let win0,win1,win2,win3,win4 = false;
        //Checks if there are 3 pieces of the same type are in a row
        win0 = board[0]==board[1] && board[0]==board[2] && (board[0]=="X"||board[0]=="O");    //top row
        win1 = board[3]==board[4] && board[3]==board[5] && (board[3]=="X"||board[3]=="O");    //middle row
        win2 = board[6]==board[7] && board[6]==board[8] && (board[6]=="X"||board[6]=="O");    //bottom row

        win3 = board[0]==board[3] && board[0]==board[6] && (board[0]=="X"||board[0]=="O");    //left column
        win4 = board[1]==board[4] && board[1]==board[7] && (board[1]=="X"||board[1]=="O");    //middle column
        win5 = board[2]==board[5] && board[2]==board[8] && (board[2]=="X"||board[2]=="O");    //right column

        win6 = board[0]==board[4] && board[0]==board[8] && (board[0]=="X"||board[0]=="O");    //backslash diagonal
        win7 = board[6]==board[4] && board[6]==board[2] && (board[6]=="X"||board[6]=="O");    //forward slash diagonal
        //if any of the conditions are met => the game is over
        if(win0 || win1 || win2 || win3 || win4 || win5 || win6 || win7 ){
            gameOver=true;
        }
        return gameOver;
    }

    let resetGame = ()=>{
        //resets board for new round
        board = [
            "-","-","-",
            "-","-","-",
            "-","-","-"
        ];

        alert("Game reset!");
        printBoard();
        //cleans up the board
        boardPositionList.forEach((position)=>position.textContent="");
        nextPlayer.textContent = `${player1.name} moves`;
        //sets move count to 0
        count = 0;
    }

    return {playerMove, printBoard, checkForWin, resetGame};
})();


//Player factory
const Player = (name, piece)=>{
    const identifySelf = ()=> console.log(`My name is ${name}, my game piece is "${piece}"`);
    return {name, piece, identifySelf};
}

//const player2Name = document.querySelector("#player2Name").value;

//Create the variables in the global scope 
let player1; //= Player("Juanito","X");
let player2; //= Player("Martin", "O");

const savePlayer1 = document.querySelector("#savePlayer1");
const savePlayer2 = document.querySelector("#savePlayer2");

savePlayer1.addEventListener("click",()=>{
    //Gets the text input for the name and creates the player1 object with it
    const player1Name = document.querySelector("#player1Name").value;
    player1 = Player(`${player1Name}`,"X");
    console.log(player1);
    displayStartMessage();
})

savePlayer2.addEventListener("click",()=>{
    //Gets the text input for the name and creates the player2 object with it
    const player2Name = document.querySelector("#player2Name").value;
    player2 = Player(`${player2Name}`,"O");
    console.log(player2)
    displayStartMessage();
})
//Next player move HTML location
const nextPlayer = document.querySelector("#nextPlayer");

//Start the game message
function displayStartMessage(){

    if(!(player1==undefined) && !(player2==undefined)){
        
        nextPlayer.textContent = `Ready?`;
        setTimeout(()=>{
            nextPlayer.textContent = `${player1.name} moves`
        }, 500);
    }
}

//Counter for the number of moves made
let count=0;

const gameFlow = (()=>{
    let player1Turn = true;
    
    return (move)=>{
        //Checks if the previews move ended the game, if not continue with the game
        if(!gameBoard.checkForWin()){
            //If the game was reset (count = 0) player 1 moves first 
            if(count<1){player1Turn = true};

            let player = player1Turn ? player1 : player2;
            //Shows who is next
            if(!player1Turn){
                nextPlayer.textContent = `${player1.name} moves`;
            } else{
                nextPlayer.textContent = `${player2.name} moves`;
            }
            //Checks if the move was legal (space unoccupied)
            let legalMove = gameBoard.playerMove(player, move);
            if(legalMove){
                player1Turn = !player1Turn;
                ++count;
                boardPositionList[move].textContent = player.piece; 
            }
            //call function to check if someone won or tied
            //use return from function as condition for if statement
            
            if(gameBoard.checkForWin()){
                //if the game is over, display the current player name as the winner
                nextPlayer.textContent = `🎇${player.name} wins!🎇`;
                player1Turn = true;
            } else if(count>8){
                // else if the count is greater than 8 and a player didn't win, display a tie message
                player1Turn = true;
                nextPlayer.textContent = `It's a tie! 👔`;
            }
        }
    }
})();
 
//Gameboard position node list
const boardPositionList = document.querySelectorAll(".boardPosition");

boardPositionList.forEach((position)=>{
    //add an event listener to each position
    position.addEventListener("click",()=>{
        //if any of the two players objects is still not created, display an error message 
        if(player1==undefined || player2==undefined){alert("Please enter the names of both players.")}
        else{
            let move = position.dataset.pos;
            gameFlow(move);
        }
    })
});

//Game reset button
const resetGame = document.querySelector("#resetGame");

resetGame.addEventListener("click", ()=>{
    gameBoard.resetGame();
});
