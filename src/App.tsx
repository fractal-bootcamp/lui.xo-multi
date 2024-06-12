import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const player = {}
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
  const winner = row.reduce((prev, curr) => {
    if (prev === "") {
      return null
    }
    if (prev === curr) {
      return curr
    }
    return curr
  }
)
// array.reduce(previous, current) will cycle through
// all the items in an array and run the function against
//
return {outcome: !!winner ? "WIN" : null,  winner: winner}
// !! checks if something exists
// ? is ternary operator, gives first result if True, second if False

}

export const checkWinCondition = (b: typeof board) => {

  for (let rowIndex = 0; rowIndex < 3; rowIndex++ ) {
    const winner = checkRow(b[rowIndex])
  }
  checkRow(b[0])
  checkRow(b[1])
  checkRow(b[2])


  return {outcome: null, winner: null}
  // win, tie, loss, or neither
  // if win, who won (X/O/null)

}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="read-the-docs">
        Game will soon be here
      </p>
    </>
  )
}

export default App
