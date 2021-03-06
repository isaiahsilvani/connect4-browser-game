/*-------------------------------- Constants --------------------------------*/
const player1 = {
    name: 'Player 1'
}

const player2 = {
    name: 'Player 2'
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
const msg = document.getElementById('message')
const resetBtn = document.getElementById('resetBtn')
/*----------------------------- Event Listeners -----------------------------*/
//Add an event listener for every square on the board using forEach
squares.forEach((square) => {
    square.addEventListener('click', handleClick)
  })

resetBtn.addEventListener('click', init)

player1nameBtn.addEventListener('click', setPlayer1name)
player2nameBtn.addEventListener('click', setPlayer2name)

/*-------------------------------- Functions --------------------------------*/

function setPlayer2name() {
    let name = player2nameInp.value
    player2nameInp.value = ''
    player2.name = name
    render()
}

function setPlayer1name() {
    let name = player1nameInp.value
    player1nameInp.value = ''
    player1.name = name
    render()
}


function handleClick(evt) {
    let ele = evt.target
    let position = ele.getAttribute('id')
    let row = 0
    let column = position[1]
    //IF THE TOP ROW OF THE SELECTED COLUMN IS NULL, CHECK THE NEXT EMPTY SPACE
    if (board[row][column] === null && winner === null) {
        row = nextEmptyRow(column)
        position = `${"" + row + column}`
        console.log('next position right here: ', position)
        let emptySpace = document.getElementById(`${position}`)
        //Then, set the corresponding cell on the HTML page to match whoever's turn it is
        if (turn === 1) {
            emptySpace.removeAttribute('class')
            emptySpace.setAttribute('class', 'player1')
            board[row][column] = 1
            turn *= -1
        } else {
            emptySpace.removeAttribute('class')
            emptySpace.setAttribute('class', 'player2')
            board[row][column] = -1
            turn *= -1
        }

    }
}

function nextEmptyRow(column) {
    let nextRow = 0
    for (i = 0; i < 7; i++) {
        if (board[nextRow][column] === null) {
            nextRow++
        } else {
            return nextRow -= 1
        }
    }
}


// If the column beneath the same row is empty, check the next one! If it's not, come back to the original empty column you just left and get it's position






// return the number of the last empty space of a connect4 board, by checking to see if it's null. If we get a position >= 35, we have identifed that we are at the bottom of the board and it is time to break the loop and set the corresponding div id element with a player1 or player2 color
function init() {
    //SET AN ARRAY TO REPRESENT THE GAME BOARD, PLAYER 1 = TURN WINNER IS NULL
    board = [
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        ['btm', 'btm', 'btm', 'btm', 'btm', 'btm', 'btm']
    ];
    turn = 1
    winner = null
    //clear the actual board on the screen, not just the array in javascript
    squares.forEach((square) => {
        square.removeAttribute('class')
        square.setAttribute('class', 'blank')
      })
    render()
}





function render() {
    //CHECK IF THERE IS A WINNING COMBINATION IF THERE IS CURRENTLY NOT A WINNER
    if (winner === 'player1') {
        msg.innerText = `${player1.name} won the game!!`

    } else if (winner === 'player2') {
        msg.innerText = `${player2.name} won the game!!`
        
    } else if (turn === 1) {
        msg.innerText = `It is now ${player1.name}'s turn`
    } else {
        msg.innerText = `It is now ${player2.name}'s turn`
    }
    //checkBoard(board)
}

init()

// WINNING LOGIC



//CHECK FOR A ROW OF SAME ELEMENTS



function checkWinner(val) {
    if (val === 1) {
        winner = 'player1'
    } else if (val === -1) {
        winner = 'player2'
    }
}




