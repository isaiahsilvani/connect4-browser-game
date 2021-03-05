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
    let position = ele.getAttribute('id')
    if (ele.className === 'blank') {
        position = Number(position)
        position = position % 7
        // if the top row of current column is null, increase position by 7. If new position on board is null, increasse by 7. If new position of board is null, increase by 7. If new position of board is filled with something other than null, go back 7 and change that element's class
        let emptySpace = document.getElementById(`${lastEmptySpaceInColumnV2(position)}`)
        console.log(emptySpace)
        //Now, set class of the emptySpace element to either player-2 or player-1, depending on what the turn is set to. Then, multiply turn by -1 to switch 
        // if (turn === 1) {
        //     emptySpace.removeAttribute('class')
        //     emptySpace.setAttribute('class', )
        // }

    }
}
// For some reason, this recursive function is console.logging the expected result but is return undefined
// function lastEmptySpaceInColumn(position) {
//     console.log('position', position)
//     let newPosition = position + 7;
//     if (board[newPosition] === null) {
//         lastEmptySpaceInColumn(newPosition)
//     } else if (board[newPosition] !== null) {
//         console.log('finalPosition', newPosition)
//         //THIS IS WHERE THE PROBLEM IS!!
//         console.log(newPosition - 7)
//         console.log('for the love of god return test please')
//         return "test"
//     }
// }



function lastEmptySpaceInColumnV2(position) {
    let newPosition = position + 7
    for (let i = 0; i <= 7; i++) {
        if (board[newPosition] === null) {
            console.log('in-between indice: ', newPosition, ' boardValue: ', board[newPosition])
            newPosition += 7
    } else {
        return newPosition - 7
        }
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