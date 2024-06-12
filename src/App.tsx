import { useState } from 'react'

import './App.css'

// const player = {}

// const board = [
//   ['','',''],
//   ['','',''],
//   ['','',''],
// ]

const board = [
  ['O','O','X'],
  ['X','X','O'],
  ['X','O',''],
]

type WinState = {
  outcome: "WIN" | "TIE" | null;
  winner: "X" | "O" | null;
}

const checkRow = (row: string[]) => {
  const winner = row.reduce((prev: string | null, curr: string) => {
    if (prev === "") {
      return null
    }
    if (prev === curr) {
      return curr
    }
    return null
  }
)
// array.reduce(previous, current) will cycle through
// all the items in an array and run the function against
//
return {outcome: !!winner ? "WIN" : null,  winner: winner}
// !! checks if something exists
// ? is ternary operator, gives first result if True, second if False

}


const getCol = (b: typeof board, colIndex: number) => {
  const colArray = []

  for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    colArray.push(b[rowIndex][colIndex])
  }
  return colArray

}

const getDiagonal = (b: typeof board, startingPoint: "nw" | "ne") => {
  
  if (startingPoint === "nw"){
    const diagonalArray = []
    for (let i = 0; i < b.length; i++) {
      diagonalArray.push(b[i][i])
    }
    return diagonalArray
  }

  else if (startingPoint === "ne") {
    const diagonalArray = []
    for (let i = 0; i < b.length; i++) {
      // desired coords here are [2][0] ... [1][1] ... [0][2]
      diagonalArray.push(b[b.length -1 - i][i])
    }
    return diagonalArray
  }
  else console.log("ERROR: irregular diagonal startPoint value passed")
}

// export const checkWinCondition = (b: typeof board) : WinState => {


export const checkWinCondition = (b: typeof board) => {
  
  // Check the Rows
  for (let rowIndex = 0; rowIndex < 3; rowIndex++ ) {
    const rowCheckOutcome = checkRow(b[rowIndex])

  if (!!rowCheckOutcome.outcome) {
    return rowCheckOutcome
  }
  }

  // Check the Columns
  for (let colIndex = 0; colIndex < 3; colIndex++ ) {
    const colCheckOutcome = checkRow(getCol(b,colIndex))
    // getCol turns a column into an array, so it can be handled just like a Row

  if (!!colCheckOutcome.outcome) {
    return colCheckOutcome
  }
  }

  // Check the Diagonals
  const diagCheck1 = checkRow(getDiagonal(b, "nw"))
  if (!!diagCheck1.outcome) {
    return diagCheck1
    }

  const diagCheck2 = checkRow(getDiagonal(b, "ne"))
  if (!!diagCheck2.outcome) {
    return diagCheck2
    }
    

  const moveCount = b.toString().replace(/,/g,'').length
  // without the /g global modifier this replace function will default to
  // only swapping out the first instance of the character

  const boardSize = b.length * b.length
  // square boards only

  if (moveCount >= boardSize) {
    return {outcome: "TIE", winner: null}
  }


  return {outcome: null, winner: null}
  // win, tie, loss, or neither
  // if win, who won (X/O/null)

}

const ShowTile = (move: string) => {

  const sharedClassName = "flex flex-col text-green-500 bg-gray-100 w-10"

  if (move ==="X") {
    return(
      <div className = {sharedClassName}>
        X
      </div>
    )
  }
  if (move ==="O") {
    return(
      <div className = {sharedClassName}>
        O
      </div>
    )
  }
  else return (
    <div className = {sharedClassName}>
      -
    </div>
  )
}

const ShowBoard = () => {
  console.log(board[0])
  const sharedRowClassName = 'flex'
  return (
    <>
    <div className={sharedRowClassName}>
      {board[0].map(ShowTile)}
    </div>

    <div className={sharedRowClassName}>
      {board[1].map(ShowTile)}
    </div>

    <div className={sharedRowClassName}>
      {board[2].map(ShowTile)}
    </div>
    </>
  )

}

function App() {
  return (
    <>
      <p>
        Game will soon be here
      </p>
      <ShowBoard />
    </>
  )
}

export default App
