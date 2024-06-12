const testBoard = [
    ['X','O','O'],
    ['X','X','X'],
    ['X','O',''],
  ]


const testBoardRow = [
    ['X','O','O'],
    ['X','X','X'],
    ['X','O',''],
  ]


const testBoardCol = [
    ['X','O','O'],
    ['X','','X'],
    ['X','O',''],
  ]


const testBoardDiagonal = [
    ['O','O','X'],
    ['X','X','O'],
    ['X','O','O'],
  ]

const testBoardTie = [
    ['O','X','X'],
    ['X','O','O'],
    ['X','O','X'],
  ]

const testBoardNull = [
    ['','O','X'],
    ['X','','O'],
    ['X','O',''],
  ]

import { checkWinCondition } from "./src/App"

const winState = checkWinCondition(testBoard)

console.log('testBoard', checkWinCondition(testBoard))

console.log('testBoardRow', checkWinCondition(testBoardRow))

console.log('testBoardCol', checkWinCondition(testBoardCol))

console.log('testBoardDiagonal', checkWinCondition(testBoardDiagonal))

console.log('testBoardTie', checkWinCondition(testBoardTie))

console.log('testBoardNull', checkWinCondition(testBoardNull))



