import { useEffect, useState } from 'react'

import './App.css'

// const player = {}

const PORT = 4000

const serverPath = `http://localhost:${PORT}`

const getGame = async (id: string) =>{
  const response = await fetch(`${serverPath}/game/${id}`);
  const json = await response.json();
  console.log("getGame json", json)
  return json
}

const makeAMove = async (id: string, rowNum: number, colNum: number) => {
  const response = await fetch(`${serverPath}/game/${id}/move`, {
    method: "POST",
    body: JSON.stringify({ rowNum, colNum }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log("makeAMove json:", json)
  return json
}

// FOR NOW WE JUST USE A HARDCODED GAME ID

const gameId = "ieoajcthisisgameideioacne"

const startingBoard = [
  ['','',''],
  ['','',''],
  ['','',''],
]

const exampleBoard = [
  ['O','O','X'],
  ['','X','X'],
  ['O','O',''],
]


//// STYLING USED IN NextPlayerMessage AND ShowTile //// 

const xClass = "text-green-500"
const oClass = "text-purple-500"

const NextPlayerMessage = ({ xIsNext } : { xIsNext: boolean }) => {

  const nextChar = (xIsNext) ? "x" : "o"
  let className = (xIsNext) ? xClass : oClass
  className = className + " text-2xl font-bold"
  return(
    <div>
      <div>
        Next move is:
      </div>
      <div className = {className}>
        {nextChar.toUpperCase()}
      </div>
    </div>
)
}

const ShowTile = ({rowNum, colNum, game, makeAMove }: {rowNum: number, colNum: number, game: Game, makeAMove: Function}) => {

  const sharedClassName = "flex flex-col text-green-500 bg-gray-100 w-10 h-10 rounded-sm m-1 p-2"
  const nullClass = "text-gray-200 cursor-pointer"

  if (game.board[rowNum][colNum] ==="X") {
    return(
      <div className = {sharedClassName + " " + xClass}>
        X
      </div>
    )
  }
  if (game.board[rowNum][colNum] ==="O") {
    return(
      <div className = {sharedClassName + " " + oClass}>
        O
      </div>
    )
  }
  else return (
    <a onClick={() => makeAMove(game.id, rowNum, colNum)}>
    <div className = {sharedClassName + " " + nullClass}>
      
    </div>
    </a>
  )
}

const ShowBoard = ({ game, makeAMove } : { game: Game, makeAMove: Function} ) => {

  const sharedRowClassName = 'flex'

  // const testClick = () => {
  //   console.log("testClick")
  //   const testThing = setBoard(getUpdatedBoard(board, 2, 2))
  //   console.log("testThing", testThing)
  // }

  return (
    <>
    {/* <div className={sharedRowClassName}>
      {board.map((nestedArray, indexAndRowNum) => nestedArray.map(
        (element, indexAndColNum) => 
          <>
          <div className={sharedRowClassName}>
          <ShowTile 
            rowNum={indexAndRowNum} 
            colNum={indexAndColNum} 
            board={board} 
            setBoard={setBoard} 
            xIsNext={xIsNext} 
            setXIsNext={setXIsNext} />
          </>
        )
        )} */}
      {/* {
        board.map(
          (rowArray) => {() +
            rowArray.map((cellValue) => <div> cellValue</div>)}
        
      } */}
      <br />
      {/* {board[0].map(ShowTile(move=index, rowNum=0,colNum=index, board=board, setBoard=setBoard))} */}


      <div className={sharedRowClassName}>
      {game.board[0].map(
          (element, indexAndColNum) => 
            <ShowTile 
              rowNum={0} 
              colNum={indexAndColNum} 
              game={game} 
              makeAMove = {makeAMove}
              />
      )}
      </div>

      <div className={sharedRowClassName}>
      {game.board[0].map(
          (element, indexAndColNum) => 
            <ShowTile 
              rowNum={1} 
              colNum={indexAndColNum} 
              game={game}  
              makeAMove = {makeAMove} 
              />
      )}
      </div>

      <div className={sharedRowClassName}>
      {game.board[0].map(
          (element, indexAndColNum) => 
            <ShowTile 
              rowNum={2} 
              colNum={indexAndColNum} 
              game={game}  
              makeAMove = {makeAMove} 
              />
      )}
      </div>
{/* 
      <div className={sharedRowClassName}>
      <ShowTile rowNum={0} colNum={0} board={board} setBoard={setBoard} xIsNext={xIsNext} setXIsNext={setXIsNext} />
      <ShowTile rowNum={0} colNum={1} board={board} setBoard={setBoard} xIsNext={xIsNext} setXIsNext={setXIsNext} />
      <ShowTile rowNum={0} colNum={2} board={board} setBoard={setBoard} xIsNext={xIsNext} setXIsNext={setXIsNext} />

    </div>

    <div className={sharedRowClassName}>
      <ShowTile rowNum={1} colNum={0} board={board} setBoard={setBoard} xIsNext={xIsNext} setXIsNext={setXIsNext} />
      <ShowTile rowNum={1} colNum={1} board={board} setBoard={setBoard} xIsNext={xIsNext} setXIsNext={setXIsNext} />
      <ShowTile rowNum={1} colNum={2} board={board} setBoard={setBoard} xIsNext={xIsNext} setXIsNext={setXIsNext} />

    </div>

    <div className={sharedRowClassName}>
      <ShowTile rowNum={2} colNum={0} board={board} setBoard={setBoard} xIsNext={xIsNext} setXIsNext={setXIsNext} />
      <ShowTile rowNum={2} colNum={1} board={board} setBoard={setBoard} xIsNext={xIsNext} setXIsNext={setXIsNext} />
      <ShowTile rowNum={2} colNum={2} board={board} setBoard={setBoard} xIsNext={xIsNext} setXIsNext={setXIsNext} />
    </div> */}
    </>
  )

}

const RefreshButton = ({ setBoard, setXIsNext } : { setBoard: Function, setXIsNext: Function }) => {
  
  const refreshBoard = () => {
    setBoard(startingBoard);
    setXIsNext(true)
  }

  return(
    <>
      <br />
      <button onClick={() => refreshBoard()}>Start again</button>
      <br />
    </>
  )
}

const ShowResults = ( {outcome, winner} : {outcome: string | null, winner: string | null }  ) => {
  if (outcome === "WIN"){
    return(
      <div>
        The winner is {winner}
        <br />
        Congratulations!
      </div>
    )
  }
  else if (outcome === "TIE"){
    return(
      <div>
        The game is TIED! No winner today.
      </div>
    )
  }
  else return null
}

export type Game = {
  id: string,
  board: string[][],
  xIsNext: boolean,
  winState: {outcome: "WIN" | "TIE" | null, winner: "X" | "O" | null },
  player1: { token: string, id: string },
  player2: { token: string, id: string },
}

function App() {
  console.log("==== APP REFRESH ====")

  const emptyGame = {
    id: "nogameid",
    board: exampleBoard,
    xIsNext: true,
    winState: {outcome: null, winner: null}, // type WinState = { outcome: "WIN" | "TIE" | null; winner: "X" | "O" | null; }
    player1: { token: "X", id:"" },
    player2: { token: "O", id:"" },
  }

  const [game, setGame] = useState<Game>(emptyGame);
  const [poller, setPoller] = useState(0);

  // const [board, setBoard] = useState(structuredClone(startingBoard))
  // const [xIsNext, setXIsNext] = useState(true)
  // const currentWinState = checkWinCondition(board)

  useEffect(() => {
    const initializeGame = async () => {
      //Go get a game
      const data = await getGame(gameId);

      // store the game in state
      setGame(data.game)
      console.log("GAME HAS BEEN SET")
      console.log("NEW GAME DETAILS", game.board)
    }
    
    // call the function
    initializeGame();

    // polling
    setTimeout(() => {
      setPoller(poller + 1);
    }, 1000);
  }, [poller]);

  // we'll add in a check for WIN CONDITION here later

  const xIsNext = game.xIsNext

  console.log("WINSTATE IS", game.winState)

  return (
    <>
      <NextPlayerMessage xIsNext={xIsNext} />
      <br />

      <ShowBoard game={game} makeAMove = {makeAMove} />

      {/* <RefreshButton setBoard = {setBoard} setXIsNext = {setXIsNext} /> */}

      <ShowResults outcome={game.winState.outcome} winner={game.winState.winner} />
    </>
  )
}

export default App
