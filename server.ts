import express from "express"
import cors from "cors";


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
        player2: { token: "X", id:"" },
    },
};



const getUpdatedBoard = (board: string[][], rowNum: number, colNum: number, xIsNext: boolean) => {
    const newBoard = structuredClone(board)
    let newChar = ""
    
    if (board[rowNum][colNum] != ""){
      console.log("ERROR: getUpdatedBoard attempted on occupied tile.")
    }
   
    newBoard[rowNum][colNum] = (xIsNext) ? "X" : "O"
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

    const { coords } = req.body; // same way as saying "const coords = req.body.coords"

    console.log(coords, req)

    // If no game is found    
    if (!game) {
        return res.status(404).send("Game not found (during /post call)");
    }

    // Implement impact of user making their move onto the game state and send it back
    // NOT CURRENTLY CHECKED = WIN CONDITIONS
    game.board = getUpdatedBoard(game.board, coords.rowNum, coords.colNum, game.xIsNext )
    game.xIsNext = !game.xIsNext

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

