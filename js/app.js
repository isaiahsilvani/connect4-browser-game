/*-------------------------------- Constants --------------------------------*/
const colors = {
    '1': 'red',
    '-1': 'yellow'
}

/*-------------------------------- Variables --------------------------------*/
let board;
let turn;
let winner;

let player1name;
let player2name;
/*------------------------ Cached Element References ------------------------*/
const player1nameInp = document.getElementById('player1-name')
const player1nameBtn = document.getElementById('player1-btn')
const player2nameInp = document.getElementById('player2-name')
const player2nameBtn = document.getElementById('player2-btn')
const squares = document.querySelectorAll('#board-grid > div')
const message = document.getElementById('message')
const resetBtn = document.getElementById('resetBtn')
/*----------------------------- Event Listeners -----------------------------*/
//Add an event listener for every square on the board using forEach
squares.forEach((square) => {
    square.addEventListener('click', handleClick)
  })

/*-------------------------------- Functions --------------------------------*/
function handleClick(evt) {
    // IF THE SPACE CURRENT PLAYER CLICKS ON IS BLANK, set first number in  ID to 0 so we can start at the top. Then, CHECK THE BOTTOM SPACE IN BOARD TO SEE IF ITS EMPTY. IF IT IS, CHECK THE NEXT BOTTOM SPACE. WHEN NEXT BOTTOM IS FILLED, OR YOU HAVE REACHED THE BOTTOM, FILL BACKGROUND SPACE ACCORDING TO TURN (1 or -1)
    let position = evt.target.getAttribute('id')
    // SET THE POSITION TO THE TOP, KEEP COLUMN THE SAME. SEPERATE ROW AND COLUMN IN ELE'S ID
    let row = 0
    let column = position[1]
    console.log(row + column)
    //nextEmptySpace
}

// function nextEmptySpace(row, column) {
//     // make a for loop. If the next row "beneath" in the same column is null, continue the loop. If the row beneath is not null, return the row and column position that is empty
//     for (i = 0; i < 7; i++) {
//         row++
//         let idx = row + column;
//         if (board[idx] === null) {
//             return true;
//         }
//     }
// }




function init() {
    //SET AN ARRAY TO REPRESENT THE GAME BOARD, PLAYER 1 = TURN WINNER IS NULL
    board = [
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
    ];
    turn = 1
    winner = null
    render()
}

function render() {

}

init()