/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/


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
    // IF THE SPACE CURRENT PLAYER CLICKS ON IS BLANK, 
    console.log(evt.target)
}

function init() {
    //SET AN ARRAY TO REPRESENT THE GAME BOARD
}