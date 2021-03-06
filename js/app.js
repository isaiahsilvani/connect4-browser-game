/*-------------------------------- Constants --------------------------------*/
const player1 = {
    name: ''
}

const player2 = {
    name: ''
}

const pieceSound = new Audio('../audio/click.mp3')
pieceSound.volume = 0.3
const cheerSound = new Audio('../audio/Audience_Applause-Matthiew11-1206899159.mp3')
cheerSound.volume = 0.2
const awwSound = new Audio('../audio/awww.mp3')
awwSound.volume = 0.4
/*-------------------------------- Variables --------------------------------*/
let board;
let turn;
let winner;
let turnCount;
let soundToggle;

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
const soundBtn = document.getElementById('soundBtn')
/*----------------------------- Event Listeners -----------------------------*/
//Add an event listener for every square on the board using forEach
squares.forEach((square) => {
    square.addEventListener('click', handleClick)
  })

resetBtn.addEventListener('click', clearBoard)

player1nameBtn.addEventListener('click', setPlayer1name)
player2nameBtn.addEventListener('click', setPlayer2name)

soundBtn.addEventListener('click', toggleSound)

/*-------------------------------- Functions --------------------------------*/
// ---- CORE FUNCTIONS THAT MAKE THE GAME ---
function init() {
    //SET AN ARRAY TO REPRESENT THE GAME BOARD, PLAYER 1 = TURN WINNER IS NULL
    
    //randomize who starts first
    //Set player names to default
    player1.name = 'Player 1'
    player2.name = 'Player 2'
    //Have sound off when user first comes to page
    soundToggle = false;
    toggleText()
    //clear the actual board on the screen, not just the array in javascript
    clearBoard()
}

function render() {
    // check the board for winning conditions, display who's turn it is
    checkBoard()
    turnSwitchMsg()
}

function turnSwitchMsg() {
    if (winner === 'player1') {
        msg.innerText = `${player1.name} won the game!!`
        msg.style.backgroundColor = '#dce629'
        cheer()
        
    } else if (winner === 'player2') {
        msg.innerText = `${player2.name} won the game!!`
        msg.style.backgroundColor = '#F27672'
        cheer()

    }  else if (winner === 'T') {
        msg.textContent = `It's a tie!`
        msg.style.backgroundColor = '#e3e3e3'
        // if soundToggle is on, play an awww sound
        if (soundToggle === true) {
            awwSound.play()
        }
    }
    else if (turn === 1) {
        msg.textContent = `It is now ${player1.name}'s turn`
        msg.style.backgroundColor = '#EBEE96'
    } else if (turn === -1) {
        msg.textContent = `It is now ${player2.name}'s turn`
        msg.style.backgroundColor = '#F27672'
    }
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
            playSound()
        } else {
            emptySpace.removeAttribute('class')
            emptySpace.setAttribute('class', 'player2')
            board[row][column] = -1
            turn *= -1
            playSound()
        }
        turnCount++
        render()
        console.log(board)
        console.log('Turn Count: ', turnCount)
    }
}
// ------------ SETTINGS ---------------------


function toggleSound() {
    if (soundToggle === false) {
        soundToggle = true;
    } else {
        soundToggle = false;
    }
    toggleText()
}

function setPlayer2name() {
    let name = player2nameInp.value
    if (name.indexOf(" ") > -1) {
        player2.name = formatName(name)
        player2nameInp.value = ''
    } else {
        name = name[0].toUpperCase() + name.slice(1).toLowerCase()
        player2.name = name
        player2nameInp.value = ''
    }
    render()
}
function setPlayer1name() {
    let name = player1nameInp.value
    if (name.indexOf(" ") > -1) {
        player1.name = formatName(name)
        player1nameInp.value = ''
    } else {
        name = name[0].toUpperCase() + name.slice(1).toLowerCase()
        player1.name = name
        player1nameInp.value = ''
    }
    render()
}
// ---- SMALL HELPER FUNCTIONS ---------------
//If soundToggle === true, play sound when player takes a turn
function playSound() {
    if (soundToggle === true) {
        pieceSound.play()
    }
}
// If column beneath same row is empty, check the next one! If not, get original position
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
// If name is split with a space, format it properly
function formatName(name) {
    // If the string has a streak of 3 letters in a row, it's not a real name and users are just trying to break your code. Instead, break the function and do not allow them to enter it
    let fullName = name.split(" ")
    let firstName = fullName[0]
    let lastName = fullName[1]
    //format strings to full name,
    fullName = (firstName[0].toUpperCase() + firstName.slice(1).toLowerCase() + " " + (lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()))
    return fullName
}

function toggleText() {
    if (soundToggle === true) {
        soundBtn.innerText = 'SOUND ON '
    } else if (soundToggle === false) {
        soundBtn.innerText = 'SOUND OFF'
    }
    // CHANGE ACTUAL WORDS DEPENDING ON TRUE OR FALSE
}

function cheer() {
    confetti.start(1500)
    if (soundToggle === true) {
        cheerSound.play()
    }
}

function clearBoard() {
    // clear board in 2D array data model
    board = [
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null], 
        ['btm0', 'btm1', 'btm2', 'btm3', 'btm4', 'btm5', 'btm6']
    ];
    //clear board that player sees, set winner to null, turn count to 0
    squares.forEach((square) => {
        square.removeAttribute('class')
        square.setAttribute('class', 'blank')
      })
    winner = null
    turnCount = 0
    // randomize who goes first
    if ((Math.round(Math.random())) === 1 ) {
        turn = 1
    } else {
        turn = -1
    }
    render()
}
// ------------ WINNING LOGIC ----------------
function checkBoard() {
    checkUpDiagnols()
    checkRows()
    checkDownDiagnols()
    checkColumns()
    // if the maximum amount of turns has been taken, set winner to 'T'
    if (turnCount === 42 && winner === null) {
        winner = 'T'
    }
}

function checkRows() {
    for (let r = 0; r <= 5; r++) {
        for (let c = 0; c <= 6; c++) {
            let val0 = board[r][c]
            let val1 = board[r][c + 1]
            let val2 = board[r][c + 2]
            let val3 = board[r][c + 3]
            //check if any of the values in the 4 rows are the same
            if (val0 === val1 && val1 === val2 && val2 === val3) {
                checkWinner(val0)
                break
            }
        }
    }
}

function checkColumns() {
    for (let r = 0; r <= 2; r++) {
        for (let c = 0; c <= 6; c++) {
            let val0 = board[r][c]
            let val1 = board[r + 1][c]
            let val2 = board[r + 2][c]
            let val3 = board[r + 3][c]

            if (val0 !== null) {
                if (val0 === val1 && val1 === val2 && val2 === val3) {
                    checkWinner(val0)
                    break
                }
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
            if (val0 !== null) {
                if (val0 === val1 && val1 === val2 && val2 === val3) {
                    checkWinner(val0)
                    break
                }
            }
        }
    }
}

function checkUpDiagnols() {
    for (let c = 3; c <= 5; c++) {
        for (let r = 0; r <= 3; r++) {
            let val0 = board[c][r]
            let val1 = board[c - 1][r + 1]
            let val2 = board[c - 2][r + 2]
            let val3 = board[c - 3][r + 3]

            if (val0 !== null) {
                if (val0 === val1 && val1 === val2 && val2 === val3) {
                    checkWinner(val0)
                    break
                }
            }
        }
    }
}

function checkWinner(val) {
    if (val === 1) {
        winner = 'player1'
    } else if (val === -1) {
        winner = 'player2'
    }
}

init()