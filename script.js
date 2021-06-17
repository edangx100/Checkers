import { getAvailableMoveSpaces, checkAvailableJumpSpaces } from './move_or_jump.js';
import { opponentUpLeft, opponentUpRight, opponentDownLeft, opponentDownRight } from './move_or_jump.js';

/*----------- Game State Data ----------*/

// const board = [
//     [null, 0, null, null, null, 2, null, 3],
//     [4, null, null, null, 18, null, null, null],
//     [null, 24, null, 9, null, 10, null, 11],
//     [null, null, null, null, 24, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [12, null, 13, null, 14, null, 15, null],
//     [null, null, null, 17, null, 8, null, null],
//     [20, null, 21, null, 22, null, 23, null]
// ]

const board = [
    [null, 0, null, 1, null, 2, null, 3],
    [4, null, 5, null, 6, null, 7, null],
    [null, 8, null, 9, null, 10, null, 11],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [12, null, 13, null, 14, null, 15, null],
    [null, 16, null, 17, null, 18, null, 19],
    [20, null, 21, null, 22, null, 23, null]
]




// ======= DOM elements ========
const cells1D = $("td");
let cells = [];
while(cells1D.length) cells.push( cells1D.splice(0,8) );  // to make 2D array

const redPiece = "p";
const blackPiece = "span";
let redsPieces = $(redPiece)
let blacksPieces = $(blackPiece)
const redTurnText = $(".red-turn-text")
const blackTurntext = $(".black-turn-text")


// player 
let redTurn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces;


// selected piece 
let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: {row:-1, col:-1},
    isKing: false,
    possibleMoveSpaces: [],
}


/*---------- Event Listeners ----------*/

// initialize event listeners on pieces
 const givePiecesEventListeners = () => {

    if (redTurn) {
        for (let i = 0; i < redsPieces.length; i++) {
            $(redsPieces[i]).on( "click" , getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            $(blacksPieces[i]).on( "click" , getPlayerPieces);
        }
    }
}

/*---------- Logic ----------*/

// holds the length of the players piece count
const getPlayerPieces = () => {

    if (redTurn) {
        playerPieces = redsPieces;
    } else {
        playerPieces = blacksPieces;
    }

    // let newCells = removeCellonclick(cells)
    // cells = newCells.map(function(arr) {
    //     return arr.slice();
    // });
    removeCellonclick(cells);

    resetBorders(playerPieces);
    resetSelectedPieceProperties(selectedPiece);

    getSelectedPiece(selectedPiece);

    // --------- imported functions ---------
    getAvailableMoveSpaces(selectedPiece, board, cells, redTurn);   

    const pieceCoord = {...selectedPiece.indexOfBoardPiece};
    console.log(pieceCoord);
    checkAvailableJumpSpaces(selectedPiece, board, cells, redTurn, "", pieceCoord );
    // --------------------------------------
    
    // event listener added to possible move positions
    givePieceBorderandClick(selectedPiece);
}



// removes possible moves from previous selected piece (* remove when user re-select a piece *)
const removeCellonclick = () => {

    // remove event listeners on all cells
    for (let i = 0; i < cells.length; i++) 
        for (let j = 0; j < cells[i].length; j++) {
            $( cells[i][j] ).off( "click" , makeMove);

            // remove possible colour highlights at DOM for previous selected piece
            cells[i][j].classList.remove("possibleMove");
            cells[i][j].classList.remove("possibleJump");
        }

    return;
 
}

// resets borders to default
const resetBorders = () =>  {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }

    console.log("resetBorders"); 

}

// resets selected piece properties
const resetSelectedPieceProperties = () => {
    selectedPiece.pieceId = -1;
    selectedPiece.indexOfBoardPiece = {row:-1, col:-1};
    selectedPiece.isKing = false;
    selectedPiece.possibleMoveSpaces = [];
}


// parses pieceId's and returns the index of that piece's place on the board
const findPiece = (pieceId) => {

    let pieceId_Int = parseInt(pieceId);

    // initialise dummy coordinate
    let coordinatePiece = {row:-1, col:-1 };

    try {
        for( let i=0; i<board.length; i++) {

            // iterate through each row of 'board'
            let row = board[i];
            let possible_col = row.indexOf( pieceId_Int );

            if( possible_col >= 0 ) {   // not negative
                coordinatePiece.row = i;
                coordinatePiece.col = possible_col;
                break;
            }
        }
        if( coordinatePiece.col === -1 ) {
            throw( "findPiece() error: index of piece not found");
        }
    } 
    catch(error) {
        console.log( error );
    }

    return coordinatePiece;
};
// console.log( findPiece('2') );  //test


// gets ID and index of the board cell its on
const getSelectedPiece = () => {
    // console.log(event);
    selectedPiece.pieceId = parseInt(event.target.id);

    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);

    // console.log(selectedPiece.indexOfBoardPiece );

    isPieceKing();
}


// checks if selected piece is a king
const isPieceKing = () => {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
}




// gives the piece a green highlight for the user (showing its movable)
const givePieceBorderandClick = (selectedPiece) => {

    console.log( selectedPiece.possibleMoveSpaces );
    console.log( selectedPiece.possibleMoveSpaces[0] );

    if (selectedPiece.possibleMoveSpaces.length !== 0 ) {
        $(`#${selectedPiece.pieceId}`).css( "border", "3px solid green" );
        
        giveCellsClick();
    } else {
        return;
    }
}


// gives the cells on the board a 'click' bassed on the possible moves
const giveCellsClick = () => {

    for (const possibleMove of selectedPiece.possibleMoveSpaces) {

        let row = possibleMove.row;
        let col = possibleMove.col;

        console.log( row + " " + col);
        console.log( cells[row][col] );

        $(cells[row][col]).on("click", { possibleMove_param : possibleMove }, makeMove );
    }

}


// makes the move that was clicked
const makeMove = (event) => {

    console.log( `Chosen to move to:` );
    console.log( event.data.possibleMove_param );
    const moveToRow = event.data.possibleMove_param.row;
    const moveToCol = event.data.possibleMove_param.col;
    const jumpDirection = event.data.possibleMove_param.jumpDir;


    console.log( selectedPiece.pieceId );
    console.log( selectedPiece.indexOfBoardPiece );
    const presentRow = selectedPiece.indexOfBoardPiece.row;
    const presentCol = selectedPiece.indexOfBoardPiece.col;


    $(`${selectedPiece.pieceId}`).remove();
    cells[presentRow][presentCol].innerHTML = "";

    const redPiece = "p";
    const blackPiece = "span";

    if (redTurn) {
        if (selectedPiece.isKing) {
            cells[moveToRow][moveToCol].innerHTML = `<p class="red-piece king" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = $(redPiece);
        } else {
            cells[moveToRow][moveToCol].innerHTML = `<p class="red-piece" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = $(redPiece);
        }
    } else {
        if (selectedPiece.isKing) {
            cells[moveToRow][moveToCol].innerHTML = `<span class="black-piece king" id="${selectedPiece.pieceId}"></span>`;
            blacksPieces = $(blackPiece);
        } else {
            cells[moveToRow][moveToCol].innerHTML = `<span class="black-piece" id="${selectedPiece.pieceId}"></span>`;
            blacksPieces = $(blackPiece);
        }
    }


    const opponent_UL = opponentUpLeft(selectedPiece.indexOfBoardPiece, board, redTurn);
    const opponent_UR = opponentUpRight(selectedPiece.indexOfBoardPiece, board, redTurn);
    const opponent_DL = opponentDownLeft(selectedPiece.indexOfBoardPiece, board, redTurn);
    const opponent_DR = opponentDownRight(selectedPiece.indexOfBoardPiece, board, redTurn);


    if ( jumpDirection !== "" ) {  // If it is a jump
        
        if ( jumpDirection === "UpLeft" ) 
            changeData( [presentRow, presentCol], event.data.possibleMove_param, opponent_UL);
        if ( jumpDirection === "UpRight" ) 
            changeData( [presentRow, presentCol], event.data.possibleMove_param, opponent_UR);
        if ( jumpDirection === "DownLeft" ) 
            changeData( [presentRow, presentCol], event.data.possibleMove_param, opponent_DL);
        if ( jumpDirection === "DownRight" ) 
            changeData( [presentRow, presentCol], event.data.possibleMove_param, opponent_DR);

    } else {   // If it is a just a move
        changeData( [presentRow, presentCol], event.data.possibleMove_param );
    }
}



const changeData = ( [presentRow_param, presentCol_param], possibleMove_param, removePiece="moveOnly" ) => {
    
    const [presentRow, presentCol] = [presentRow_param, presentCol_param];
    const moveToRow = possibleMove_param.row;
    const moveToCol = possibleMove_param.col;
    
    console.log( "ChangeData Move to");
    console.log( moveToRow + " " + moveToCol );

    // Move the piece
    board[presentRow][presentCol] = null;
    board[moveToRow][moveToCol] = parseInt(selectedPiece.pieceId);
    console.log( board[moveToRow][moveToCol] );

    if ( redTurn && moveToRow===7 ) {// if red's turn and last row
        $(`#${selectedPiece.pieceId}`).addClass("king");
    }
    if ( !redTurn && moveToRow===0 ) {// if red's turn and last row
        $(`#${selectedPiece.pieceId}`).addClass("king");
    }


    // Remove opponent piece if jump
    if ( removePiece !== "moveOnly" ) {
        console.log( "Opponents to remove");
        console.log( possibleMove_param.opponentArray );

        for ( const opponentToRemove of possibleMove_param.opponentArray ) {
            let oppRow = opponentToRemove.row;
            let oppCol = opponentToRemove.col;

            board[oppRow][oppCol] = null;
            cells[oppRow][oppCol].innerHTML ="";

            if (redTurn) blackScore--;
            if (!redTurn) redScore--;
        }

        console.log( "black " + blackScore + ", red " + redScore);
    }

    resetSelectedPieceProperties(selectedPiece);
    removeCellonclick();
    removeEventListeners(redTurn);

}

// ======================

// removes the 'on click' event listeners for pieces
const removeEventListeners = (redTurn) => {
    if (redTurn) {
        for (let i = 0; i < redsPieces.length; i++) {
            $(redsPieces[i]).off( "click" , getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            $(blacksPieces[i]).off( "click" , getPlayerPieces);
        }
    }
    checkForWin();
}

// Checks for a win
const checkForWin = () => {
    if (blackScore === 0) {
        // for (let i = 0; i < redTurnText.length; i++) {
        //     redTurnText[i].style.color = "black";
        //     blackTurntext[i].style.display = "none";
        //     redTurnText[i].textContent = "RED WINS!";
        // }
        redTurnText[0].style.color = "black";
        blackTurntext[0].style.display = "none";
        redTurnText[0].textContent = "RED WINS!";
        }
    
    else if (redScore === 0) {
        blackTurntext[0].style.color = "black";
        redTurnText[0].style.display = "none";
        blackTurntext[0].textContent = "BLACK WINS!";
    
    }
    changePlayer();
}

// Switches players turn
const changePlayer = () => {

    console.log(redTurnText[0]);

    if (redTurn) {
        redTurn = false;
        redTurnText[0].style.color = "lightGrey";
        blackTurntext[0].style.color = "black";
        
    } else {
        redTurn = true;
        // for (let i = 0; i < blackTurntext.length; i++) {
        //     blackTurntext[i].style.color = "lightGrey";
        //     redTurnText[i].style.color = "black";
        // }
        blackTurntext[0].style.color = "lightGrey";
        redTurnText[0].style.color = "black";
    }
    givePiecesEventListeners();
}

givePiecesEventListeners()
