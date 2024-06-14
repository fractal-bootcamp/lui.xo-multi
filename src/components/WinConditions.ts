type GameToken = "X" | "O" | null;

export type WinState = {
    outcome: "WIN" | "TIE" | null;
    winner: GameToken
  }
  
  // type BoardType = string[][]
  
  // const getUpdatedBoard = (board: BoardType, rowNum: number, colNum: number, xIsNext: boolean) => {
  //   const newBoard = structuredClone(board)
  //   let newChar = ""
    
  //   if (board[rowNum][colNum] != ""){
  //     console.log("ERROR: getUpdatedBoard attempted on occupied tile.")
  //   }
   
  //   newBoard[rowNum][colNum] = (xIsNext) ? "X" : "O"
  //   return newBoard
  // }

  // You can't access members of type
  // 
  const checkRow = (row: GameToken[]) : WinState => {
    const winner = row.reduce((prev: GameToken, curr: GameToken) => {
      if (prev === "") {
        return ""
      }
      if (prev === curr) {
        return curr
      }
      return ""
    }
  )
  // array.reduce(previous, current) will cycle through
  // all the items in an array and run the function against
  //
  return {outcome: !!winner ? "WIN" : null,  winner: winner}
  // !! checks if something exists
  // ? is ternary operator, gives first result if True, second if False
  
  }
  
  
  const getCol = (board: string[][], colIndex: number) => {
    const colArray = []
  
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      colArray.push(board[rowIndex][colIndex])
    }
    return colArray
  
  }
  
  const getDiagonal = (board: string[][], startingPoint: "nw" | "ne"): string[] => {
    
    if (startingPoint === "nw"){
      const diagonalArray = []
      for (let i = 0; i < board.length; i++) {
        diagonalArray.push(board[i][i])
      }
      return diagonalArray
    }
  
    else if (startingPoint === "ne") {
      const diagonalArray = []
      for (let i = 0; i < board.length; i++) {
        // desired coords here are [2][0] ... [1][1] ... [0][2]
        diagonalArray.push(board[board.length -1 - i][i])
      }
      return diagonalArray
    }
    else {
        console.log("ERROR: irregular diagonal startPoint value passed")
        return [""]
    }
  }
  
  // export const checkWinCondition = (b: typeof board) : WinState => {
  
  
export const checkWinCondition = (b: string[][]) : WinState => {
    
    // Check the Rows
    for (let rowIndex = 0; rowIndex < 3; rowIndex++ ) {
      const rowWinCondition = checkRow(b[rowIndex])
  
    if (!!rowWinCondition.outcome) {
      return rowWinCondition
    }
    }
  
    // Check the Columns
    for (let colIndex = 0; colIndex < 3; colIndex++ ) {
      const colWinCondition = checkRow(getCol(b,colIndex))
      // getCol turns a column into an array, so it can be handled just like a Row
  
    if (!!colWinCondition.outcome) {
      return colWinCondition
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