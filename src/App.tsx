import { useState } from 'react'

import './App.css'

// const player = {}

const board = [
  ['','',''],
  ['','',''],
  ['','',''],
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
  const diagonalArray = []

  if (startingPoint === "nw"){
    for (let rowColIndex = 0; rowColIndex < b.length; rowColIndex++) {
      diagonalArray.push(b[rowColIndex][rowColIndex])
    }
  }

  if (startingPoint === "ne") {
    for (let rowColIndex = b.length - 1; rowColIndex >= 0; rowColIndex--) {
      diagonalArray.push(b[rowColIndex][rowColIndex])
    }

  }
  return diagonalArray
}

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
  checkRow(getDiagonal(b, "nw"))
  checkRow(getDiagonal(b, "ne"))


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

const ShowBoard = (b: typeof board) => {
  return

}

function App() {
  return (
    <>
      <p>
        Game will soon be here
      </p>
      {board}
    </>
  )
}

export default App
