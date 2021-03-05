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
    let ele = evt.target
    if (ele.className === 'blank') {
    // IF THE SPACE CURRENT PLAYER CLICKS ON IS BLANK, set first number in  ID to 0 so we can start at the top. Then, CHECK THE BOTTOM SPACE IN BOARD TO SEE IF ITS EMPTY. IF IT IS, CHECK THE NEXT BOTTOM SPACE. WHEN NEXT BOTTOM IS FILLED, OR YOU HAVE REACHED THE BOTTOM, FILL BACKGROUND SPACE ACCORDING TO TURN (1 or -1)
    ele.className = 'player1'
        let position = ele.getAttribute('id')
        // SET THE POSITION TO THE TOP, KEEP COLUMN THE SAME. SEPERATE ROW AND COLUMN IN ELE'S ID
        position = Number(position)
        //get remainder of 7 to start position at the top of the board
        position = position % 7
        // if the top row of current column is null, increase position by 7. If new position on board is null, increasse by 7. If new position of board is null, increase by 7. If new position of board is filled with something other than null, go back 7 and change that element's class
        let test = lastEmptySpaceInColumn(position)
        console.log('output', test)
    }
}

function lastEmptySpaceInColumn(position) {
    console.log('position', position)
    let newPosition = position + 7;
    if (board[newPosition] === null) {
        lastEmptySpaceInColumn(newPosition)
    } else if (board[newPosition] !== null) {
        console.log('finalPosition', newPosition)
        //THIS IS WHERE THE PROBLEM IS!!
        console.log(newPosition - 7)
        console.log('for the love of god return poop please')
        return "poop"
    }
}
// return the number of the last empty space of a connect4 board, by checking to see if it's null. If we get a position >= 35, we have identifed that we are at the bottom of the board and it is time to break the loop and set the corresponding div id element with a player1 or player2 color
function init() {
    //SET AN ARRAY TO REPRESENT THE GAME BOARD, PLAYER 1 = TURN WINNER IS NULL
    board = [
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, 
        'btm', 'btm', 'btm', 'btm', 'btm', 'btm', 'btm', 
    ];
    turn = 1
    winner = null
    render()
}

function render() {

}

init()