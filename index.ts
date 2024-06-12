const testBoard = [
    ['O','O','O'],
    ['X','O','X'],
    ['X','O',''],
  ]

import { checkWinCondition } from "./src/App"

const winState = checkWinCondition(testBoard)

console.log(winState)



