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
    position = Number(position)
    position = position % 7
    let topRow = document.getElementById(position)
    if (topRow.className === 'blank' && winner === null) {
        // if the top row of current column is null, increase position by 7. If new position on board is null, increasse by 7. If new position of board is null, increase by 7. If new position of board is filled with something other than null, go back 7 and change that element's class
        let boardIdx = lastEmptySpaceInColumnV2(position)
        let emptySpace = document.getElementById(`${boardIdx}`)
        console.log(emptySpace)
        //Now, set class of the emptySpace element to either player-2 or player-1, depending on what the turn is set to. Then, multiply turn by -1 to switch 
        if (turn === 1) {
            board[boardIdx] = 1
            emptySpace.removeAttribute('class')
            emptySpace.setAttribute('class', 'player1')
            turn *= -1
            render()
        } else {
            board[boardIdx] = -1
            emptySpace.removeAttribute('class')
            emptySpace.setAttribute('class', 'player2')
            turn *= -1
            render()
        }
        render()
    }
    
}

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
    checkBoard(board)
}

init()

// WINNING LOGIC



//CHECK FOR A ROW OF SAME ELEMENTS
function checkRowWin(board) {
    for (let i = 0; i <= 35; i += 7) {
        //First, get all the elements
        let col0 = board[i]
        let col1 = board[i + 1]
        let col2 = board[i + 2]
        let col3 = board[i + 3]
        let col4 = board[i + 4]
        let col5 = board[i + 5]
        let col6 = board[i + 6]
        //Then check the 4 possible combinations per row, think sliding window technique
        if (col0 === col1 && col1 === col2 && col2 === col3) {
            checkWinner(col3)
        } else if (col1 === col2 && col2 === col3 && col3 === col4) {
            checkWinner(col3)
        } else if (col2 === col3 && col3 === col4 && col4 === col5) {
            checkWinner(col3)
        } else if (col3 === col4 && col4 === col5 && col5 === col6) {
            checkWinner(col3)
        }
    }
}

function checkColWin(board) {
    //grab the values of the rows in a column
    for (let i = 0; i <= 6; i++) {
        let row0 = board[i]
        let row1 = board[i + 7]
        let row2 = board[i + 14]
        let row3 = board[i + 21] 
        let row4 = board[i + 28]
        let row5 = board[i + 35]
    
    //check if 4 rows have the same value
    if (row0 === row1 && row1 === row2 && row2 === row3) {
        checkWinner(row3)
    } else if (row1 === row2 && row2 === row3 && row3 === row4) {
        checkWinner(row3)
    } else if (row2 === row3 && row3 === row4 && row4 === row5) {
        checkWinner(row3)
    }
}
}

function checkIncreasingDiagnolWin(board) {
    for (let i = 21; i <= 38; i++) {
        let dagVal0 = board[i]
        let dagVal1 = board[i - 6]
        let dagVal2 = board[i - 12]
        let dagVal3 = board[i - 18]
        // see if any of these values match up
        if (dagVal0 === dagVal1 && dagVal1 === dagVal2 && dagVal2 === dagVal3) {
            checkWinner(dagVal2)
        }
    }
}

function checkDecreasingDiagonalWin(board) {
    for (let i = 0; i <= 17; i++) {
        let dagVal0 = board[i]
        let dagVal1 = board[i + 6]
        let dagVal2 = board[i + 12]
        let dagVal3 = board[i + 18]
        // see if any of these values match up
        if (dagVal0 === dagVal1 && dagVal1 === dagVal2 && dagVal2 === dagVal3) {
            checkWinner(dagVal2)
        }
    }
}

function checkBoard(board) {
    checkRowWin(board)
    checkColWin(board)
    checkDecreasingDiagonalWin(board)
    checkIncreasingDiagnolWin(board)
}

function checkWinner(val) {
    if (val === 1) {
        winner = 'player1'
    } else if (val === -1) {
        winner = 'player2'
    }
}




