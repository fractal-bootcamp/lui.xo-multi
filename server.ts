import express from "express"
import cors from "cors";

import { checkWinCondition } from './src/components/WinConditions';



const app = express();

// add json handling
app.use(express.json());

// add cors
app.use(cors());

const emptyBoard = [
    ['','',''],
    ['','',''],
    ['','',''],
]


// Create dictionary to hold all game states in memory
let gamesDict = {
    ["ieoajcthisisgameideioacne"]: {
        id: "ieoajcthisisgameideioacne",
        board: emptyBoard,
        xIsNext: true,
        winState: {outcome: null, winner: null}, // type WinState = { outcome: "WIN" | "TIE" | null; winner: "X" | "O" | null; }
        player1: { token: "X", id:"" },
        player2: { token: "O", id:"" },
    },
};



const getUpdatedBoard = (board: string[][], rowNum: number, colNum: number, xIsNext: boolean) => {
    console.log("getUpdatedBoard has been called with:", board, rowNum, colNum, xIsNext)

    const newBoard = structuredClone(board)
    
    if (board[rowNum][colNum] != ""){
      console.log("ERROR: getUpdatedBoard attempted on occupied tile.")
    }
   
    newBoard[rowNum][colNum] = (xIsNext) ? "X" : "O"
    console.log("board being passed back is", newBoard)
    return newBoard
  }


app.get("/", (req, res) =>{
    res.send("Hello World");
}
)


// Get a game
app.get("/game/:id", (req, res) => {
    const id = req.params.id; // this is how you get a param defined in the route using the : syntax
    const game = gamesDict[id];

    // If no game is found
    if (!game) {
        return res.status(404).send("Game not found (during /get call)")
    }

    // We'll pass back the game object under .game ...body.game(?) ...maybe
    res.json({ game: game })
}
)


app.post("/game/:id/move", (req, res) => {
    const id = req.params.id
    const game = gamesDict[id]

    const { rowNum } = req.body; // same way as saying "const rowNum = req.body.rowNum"
    const { colNum } = req.body

    // If no game is found    
    if (!game) {
        return res.status(404).send("Game not found (during /post call)");
    }

    // Implement impact of user making their move onto the game state and send it back

    game.board = getUpdatedBoard(game.board, rowNum, colNum, game.xIsNext )
    game.winState = checkWinCondition(game.board)
    game.xIsNext = !game.xIsNext

    res.json({game})
}
)




app.post("/game/:id/reset", (req, res) => {
    const id = req.params.id
    const game = gamesDict[id]

    // If no game is found    
    if (!game) {
        return res.status(404).send("Game not found (reset request)");
    }

    game.board = emptyBoard
    game.winState = {outcome: null, winner: null}
    game.xIsNext = true

    res.json({game})
}
)








const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("listening on port " + PORT)
})



// ROUGH PLANNING NOTES FROM THIS MORNING

// const gameState = {
// 	id: ""
// 	board: string[][]
// 	currentPlayer: "X"
// 	player1: {token: "X", id: ""}
// 	player2: {token: "O", id: ""}
// }

// Server

// - Manage game state
// -- Create (reset, create a new game)
// -- Read (existing game, all games, all games that need another player)
// -- Update (join, make a move)
// -- Delete games...
// - Server Actions:
// -- Fetch coordinate from a specific player from a specific game (make a move)

// Update
// -- Send back new game state to both players (websockets)
// OR
// -- Players can get new game state regularly

// Client
// - fetch the game state (websockets, long polling)
// - Lobby
// -- view all of the games that need to be joined
// -- start a new game

