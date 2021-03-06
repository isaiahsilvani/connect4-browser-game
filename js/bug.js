board = [null, null, -1, -1, -1, 1, -1, 
null, null, 1, 1, 1, -1, 1, 
null, null, -1, -1, -1, 1, -1,
 1, -1, 1, 1, 1, -1, 1,
  -1, 1, -1, -1, -1, 1, -1,
   1, -1, 1, 1, 1, -1, 1, 
   "btm", "btm", "btm", "btm", "btm", "btm", "btm"]

//    function checkRowWin(board) {
//     for (let i = 0; i <= 35; i += 7) {
//         //First, get all the elements
//         let col0 = board[i]
//         let col1 = board[i + 1]
//         let col2 = board[i + 2]
//         let col3 = board[i + 3]
//         let col4 = board[i + 4]
//         let col5 = board[i + 5]
//         let col6 = board[i + 6]
//         //Then check the 4 possible combinations per row, think sliding window technique
//         if (col0 === col1 && col1 === col2 && col2 === col3) {
//             console.log('this is the problem')
//         } else if (col1 === col2 && col2 === col3 && col3 === col4) {
//             console.log('this is the problem')
//         } else if (col2 === col3 && col3 === col4 && col4 === col5) {
//             console.log('this is the problem')
//         } else if (col3 === col4 && col4 === col5 && col5 === col6) {
//             console.log('this is the problem')
//         }
//     }
// }

// checkRowWin(board)

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