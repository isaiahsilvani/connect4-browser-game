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

    render()
    checkUpDiagnols()
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
        ['btm0', 'btm1', 'btm2', 'btm3', 'btm4', 'btm5', 'btm6']
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
    //Display output message for who's turn it is and if anyone has won the game, or if it's a tie game
    turnSwitchMsg()
    //Check for a winner
}

init()

// WINNING LOGIC
function turnSwitchMsg() {
    if (winner === 'player1') {
        msg.innerText = `${player1.name} won the game!!`

    } else if (winner === 'player2') {
        msg.innerText = `${player2.name} won the game!!`
        
    } else if (turn === 1) {
        msg.innerText = `It is now ${player1.name}'s turn`
    } else {
        msg.innerText = `It is now ${player2.name}'s turn`
    }
}


//CHECK FOR A ROW OF SAME ELEMENTS



function checkWinner(val) {
    if (val === 1) {
        winner = 'player1'
    } else if (val === -1) {
        winner = 'player2'
    }
}

//Create a function to check if there are any rows of 4. Go down each row, check consecutive column spaces
function checkRows() {
    for (let r = 0; r <= 5; r++) {
        for (let c = 0; c <= 6; c++) {
            let val0 = board[r][c]
            let val1 = board[r][c + 1]
            let val2 = board[r][c + 2]
            let val3 = board[r][c + 3]
            //check if any of the values in the 4 rows are the same
            if (val0 === val1 && val1 === val2 && val2 === val3) {
                console.log('winner')
                break;
            }
        }


    }
}

function checkColumns() {
    for (let c = 0; c <= 6; c++) {
        for (let r = 0; r <= 5; r++) {
            let val0 = board[r][c]
            let val1 = board[r + 1][c]
            let val2 = board[r + 2][c]
            let val3 = board[r + 3][c]
            //check if any of the values in the 4 rows are the same
            if (val0 === val1 && val1 === val2 && val2 === val3) {
                console.log('winner')
                break;
            }
        }
    }
}

function checkDownDiagnols() {
    for (let r = 0; r <= 3; r++) {
        for (let c = 0; c <= 3; c++) {
            let val0 = board[c][r]
            let val1 = board[c + 1][r + 1]
            let val2 = board[c + 2][r + 2]
            let val3 = board[c + 3][r + 3]
            console.log(val0, val1, val2, val3)
            if (val0 !== null) {
                if (val0 === val1 && val1 === val2 && val2 === val3) {
                    console.log('winner')
                    break;
                }
            }
        }
    }
}

function checkUpDiagnols() {
    for (let c = 3; c <= 5; c++) {
        for (let r = 0; r <= 3; r++) {
            console.log(c, r)
            let val0 = board[c][r]
            let val1 = board[c - 1][r + 1]
            let val2 = board[c - 2][r + 2]
            let val3 = board[c - 3][r + 3]

            if (val0 !== null) {
                if (val0 === val1 && val1 === val2 && val2 === val3) {
                    console.log('winner')
                    break;
                }
            }
        }
    }
}