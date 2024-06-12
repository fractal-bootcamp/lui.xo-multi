const testBoard = [
    ['X','X','X'],
    ['X','',''],
    ['X','',''],
  ]

import { checkWinCondition } from "./src/App"

const winState = checkWinCondition(testBoard)

console.log(winState)