export { getAvailableMoveSpaces, checkAvailableJumpSpaces }; 
export { opponentUpLeft, opponentUpRight, opponentDownLeft, opponentDownRight }; 


// ================ gets the moves that the selected piece can make ================ 
const moveUpLeft = (coordinate) => {
    return { 
        row: coordinate.row - 1, 
        col: coordinate.col - 1, 
        jumpDir: "" };
};
const moveUpRight = (coordinate) => {
    return { 
        row: coordinate.row - 1, 
        col: coordinate.col + 1, 
        jumpDir: ""  };
};
const moveDownLeft = (coordinate) => {
    return { 
        row: coordinate.row + 1, 
        col: coordinate.col - 1, 
        jumpDir: ""  };
};
const moveDownRight = (coordinate) => {
    return { 
        row: coordinate.row + 1, 
        col: coordinate.col + 1, 
        jumpDir: ""  };
};

const getAvailableMoveSpaces = (selectedPiece, board, cells, redTurn) => {

    console.log(selectedPiece.indexOfBoardPiece);
    console.log('move');

    // get permuation of coordinates of moves to check
    const upLeftCoord = moveUpLeft( selectedPiece.indexOfBoardPiece );
    const upRightCoord = moveUpRight( selectedPiece.indexOfBoardPiece );
    const downLeftCoord = moveDownLeft( selectedPiece.indexOfBoardPiece );
    const downRightCoord = moveDownRight( selectedPiece.indexOfBoardPiece );
    // console.log(downLeftCoord);


    if (upLeftCoord.row >=0 && upLeftCoord.col>=0) {
        if (board[upLeftCoord.row][upLeftCoord.col] === null && 
            $(cells[upLeftCoord.row][upLeftCoord.col]).hasClass("noPieceHere") !== true) {
            
            // '!redTurn' means black turn
            if ( !redTurn || selectedPiece.isKing) {  
                console.log('upLeft possible');
                $(cells[upLeftCoord.row][upLeftCoord.col]).addClass("possibleMove");
                selectedPiece.possibleMoveSpaces.push( upLeftCoord );
            }
        }
    }

    if (upRightCoord.row >=0 && upRightCoord.col>=0) {
        if (board[upRightCoord.row][upRightCoord.col] === null && 
            $(cells[upRightCoord.row][upRightCoord.col]).hasClass("noPieceHere") !== true) {

            // '!redTurn' means black turn
            if ( !redTurn || selectedPiece.isKing) { 
                console.log('upRight possible');
                $(cells[upRightCoord.row][upRightCoord.col]).addClass("possibleMove");
                selectedPiece.possibleMoveSpaces.push( upRightCoord );
            }
        }
    }

    // more checks for black pieces
    if (downLeftCoord.row >=0 && downLeftCoord.row<8 && 
        downLeftCoord.col>=0 && downLeftCoord.col<8) {
        if (board[downLeftCoord.row][downLeftCoord.col] === null && 
            $(cells[downLeftCoord.row][downLeftCoord.col]).hasClass("noPieceHere") !== true) {
            
            if ( redTurn || selectedPiece.isKing) {
                console.log('downLeft possible');
                $(cells[downLeftCoord.row][downLeftCoord.col]).addClass("possibleMove");
                selectedPiece.possibleMoveSpaces.push( downLeftCoord );
            }
                
        }
    }

    if (downRightCoord.row >=0 && downRightCoord.row<8 && 
        downRightCoord.col>=0 && downRightCoord.col<8) {
        if (board[downRightCoord.row][downRightCoord.col] === null && 
            $(cells[downRightCoord.row][downRightCoord.col]).hasClass("noPieceHere") !== true) {


            if ( redTurn || selectedPiece.isKing) {
                console.log('downRight possible');
                $(cells[downRightCoord.row][downRightCoord.col]).addClass("possibleMove");
                selectedPiece.possibleMoveSpaces.push( downRightCoord );
            }
        }
    }
    
}





// ================ gets the moves that the selected piece can jump ================ 
// jump to coordinates t
const jumpUpLeft = (jumpFrom) => {

    let opArray = [];
    if (jumpFrom.opponentArray) {
        opArray = [...jumpFrom.opponentArray];
    }

    return { 
        row: jumpFrom.row - 2, 
        col: jumpFrom.col - 2, 
        jumpDir: "UpLeft", 
        opponentArray: opArray };
};
const jumpUpRight = (jumpFrom) => {

    let opArray = [];
    if (jumpFrom.opponentArray) {
        opArray = [...jumpFrom.opponentArray];
    }

    return { 
        row: jumpFrom.row - 2, 
        col: jumpFrom.col + 2, 
        jumpDir: "UpRight", 
        opponentArray: opArray };
};
const jumpDownLeft = (jumpFrom) => {

    let opArray = [];
    if (jumpFrom.opponentArray) {
        opArray = [...jumpFrom.opponentArray];
    }

    return { 
        row: jumpFrom.row + 2, 
        col: jumpFrom.col - 2, 
        jumpDir: "DownLeft", 
        opponentArray: opArray };
};
const jumpDownRight = (jumpFrom) => {

    let opArray = [];
    if (jumpFrom.opponentArray) {
        opArray = [...jumpFrom.opponentArray];
    }

    return { 
        row: jumpFrom.row + 2, 
        col: jumpFrom.col + 2, 
        jumpDir: "DownRight", 
        opponentArray: opArray };
};

// check opponent
const opponentUpLeft = (coordinate, board_param, redTurn) => {
    const oppRow = coordinate.row - 1;
    const oppCol = coordinate.col - 1;

    const opponent = { 
        row : oppRow,   
        col : oppCol,
        opponentExist : false
    }

    if (oppRow >=0 && oppRow<8 && oppCol>=0 && oppCol<8) {
        if ( board_param[oppRow][oppCol] !== null ) {
            if (redTurn) opponent.opponentExist = (board_param[oppRow][oppCol] >= 12) ? true : false;
                else opponent.opponentExist = (board_param[oppRow][oppCol] < 12) ? true : false;
        }
    }
    return opponent;
};
const opponentUpRight = (coordinate, board_param, redTurn) => {
    const oppRow = coordinate.row - 1;
    const oppCol = coordinate.col + 1;

    const opponent = { 
        row : oppRow,   
        col : oppCol,
        opponentExist : false
    }

    if (oppRow >=0 && oppRow<8 && oppCol>=0 && oppCol<8) {
        if ( board_param[oppRow][oppCol] !== null ) {
            if (redTurn) opponent.opponentExist = (board_param[oppRow][oppCol] >= 12) ? true : false;
                else opponent.opponentExist = (board_param[oppRow][oppCol] < 12) ? true : false;
        }
    }
    return opponent;
};
const opponentDownLeft = (coordinate, board_param, redTurn) => {
    const oppRow = coordinate.row + 1;
    const oppCol = coordinate.col - 1;
    
    const opponent = { 
        row : oppRow,   
        col : oppCol,
        opponentExist : false
    }

    if (oppRow >=0 && oppRow<8 && oppCol>=0 && oppCol<8) {
        if ( board_param[oppRow][oppCol] !== null ) {
            if (redTurn) opponent.opponentExist = (board_param[oppRow][oppCol] >= 12) ? true : false;
                else opponent.opponentExist = (board_param[oppRow][oppCol] < 12) ? true : false;
        }
    }
    return opponent;
};
const opponentDownRight = (coordinate, board_param, redTurn) => {
    const oppRow = coordinate.row + 1;
    const oppCol = coordinate.col + 1;
    
    const opponent = { 
        row : oppRow,   
        col : oppCol,
        opponentExist : false
    }

    if (oppRow >=0 && oppRow<8 && oppCol>=0 && oppCol<8) {
        if ( board_param[oppRow][oppCol] !== null ) {
            if (redTurn) opponent.opponentExist = (board_param[oppRow][oppCol] >= 12) ? true : false;
                else opponent.opponentExist = (board_param[oppRow][oppCol] < 12) ? true : false;
        }
    }
    return opponent;
};


const checkAvailableJumpSpaces = ( selectedPiece, board, cells, redTurn, previousJump="", jumpFromCoord={} ) => {

    console.log(selectedPiece.indexOfBoardPiece);
    console.log('jump');
    console.log(jumpFromCoord);

    const jumpUpLeftCoord = jumpUpLeft( jumpFromCoord );
    const jumpUpRightCoord = jumpUpRight( jumpFromCoord );
    const jumpDownLeftCoord = jumpDownLeft( jumpFromCoord );
    const jumpDownRightCoord = jumpDownRight( jumpFromCoord );

    console.log('land');
    console.log( jumpUpLeftCoord );

    // console.log(jumpDownLeftCoord);
    console.log( "opponent UL ");
    console.log( opponentUpLeft(jumpFromCoord, board, redTurn) );
    console.log( "opponent UR ");
    console.log( opponentUpRight(jumpFromCoord, board, redTurn) );
    console.log( "opponent DL ");
    console.log( opponentDownLeft(jumpFromCoord, board, redTurn) );
    console.log( "opponent DR ");
    console.log( opponentDownRight(jumpFromCoord, board, redTurn) );

    const opponent_UL = opponentUpLeft(jumpFromCoord, board, redTurn);
    const opponent_UR = opponentUpRight(jumpFromCoord, board, redTurn);
    const opponent_DL = opponentDownLeft(jumpFromCoord, board, redTurn);
    const opponent_DR = opponentDownRight(jumpFromCoord, board, redTurn);


    if( previousJump !== "downRight") {
        if (jumpUpLeftCoord.row >=0 && jumpUpLeftCoord.col>=0) {

            if ( board[jumpUpLeftCoord.row][jumpUpLeftCoord.col] === null && 
                cells[jumpUpLeftCoord.row][jumpUpLeftCoord.col].classList.contains("noPieceHere") !== true &&
                opponent_UL.opponentExist ) {
                
                // !redTurn means black turn
                if ( !redTurn || selectedPiece.isKing) {  
                    console.log('Jump upLeft possible');
                    cells[jumpUpLeftCoord.row][jumpUpLeftCoord.col].classList.add("possibleJump");
                    
                    const jumpToCoord_UL = {...jumpUpLeftCoord};
                    jumpToCoord_UL.opponentArray.push(opponent_UL);
                    selectedPiece.possibleMoveSpaces.push( jumpToCoord_UL );

                    // recursive check 
                    checkAvailableJumpSpaces(selectedPiece, board, cells, redTurn, "upLeft", jumpToCoord_UL);
                }
            }
        }
    }

    if( previousJump !== "downLeft") {
        if (jumpUpRightCoord.row >=0 && jumpUpRightCoord.col>=0) {

            if ( board[jumpUpRightCoord.row][jumpUpRightCoord.col] === null && 
                cells[jumpUpRightCoord.row][jumpUpRightCoord.col].classList.contains("noPieceHere") !== true &&
                opponent_UR.opponentExist  ) { 

                // !redTurn means black turn
                if ( !redTurn || selectedPiece.isKing) {
                    console.log('Jump upRight possible');
                    cells[jumpUpRightCoord.row][jumpUpRightCoord.col].classList.add("possibleJump");

                    const jumpToCoord_UR = {...jumpUpRightCoord};
                    jumpToCoord_UR.opponentArray.push(opponent_UR);
                    selectedPiece.possibleMoveSpaces.push( jumpToCoord_UR );

                    // recursive check
                    checkAvailableJumpSpaces(selectedPiece, board, cells, redTurn, "upRight", jumpToCoord_UR);
                }
            }
        }
    }

    // more checks for black pieces
    if( previousJump !== "upRight") {
        if (jumpDownLeftCoord.row >=0 && jumpDownLeftCoord.row<8 && 
            jumpDownLeftCoord.col>=0 && jumpDownLeftCoord.col<8) {

            if ( board[jumpDownLeftCoord.row][jumpDownLeftCoord.col] === null && 
                cells[jumpDownLeftCoord.row][jumpDownLeftCoord.col].classList.contains("noPieceHere") !== true &&
                opponent_DL.opponentExist  ) {

                if ( redTurn || selectedPiece.isKing) {
                    console.log('Jump downLeft possible');
                    cells[jumpDownLeftCoord.row][jumpDownLeftCoord.col].classList.add("possibleJump");

                    const jumpToCoord_DL = {...jumpDownLeftCoord};
                    jumpToCoord_DL.opponentArray.push(opponent_DL);
                    selectedPiece.possibleMoveSpaces.push( jumpToCoord_DL );

                    // recursive check
                    checkAvailableJumpSpaces(selectedPiece, board, cells, redTurn, "downLeft", jumpToCoord_DL);
                }
            }
        }
    }
    if( previousJump !== "upLeft") {
        if (jumpDownRightCoord.row >=0 && jumpDownRightCoord.row<8 && 
            jumpDownRightCoord.col>=0 && jumpDownRightCoord.col<8) {

            if (board[jumpDownRightCoord.row][jumpDownRightCoord.col] === null && 
                cells[jumpDownRightCoord.row][jumpDownRightCoord.col].classList.contains("noPieceHere") !== true &&
                opponent_DR.opponentExist  ) {

                if ( redTurn || selectedPiece.isKing) {
                    console.log('Jump downRight possible');
                    cells[jumpDownRightCoord.row][jumpDownRightCoord.col].classList.add("possibleJump");

                    const jumpToCoord_DR = {...jumpDownRightCoord};
                    jumpToCoord_DR.opponentArray.push(opponent_DR);
                    selectedPiece.possibleMoveSpaces.push( jumpToCoord_DR );

                    // recursive check
                    checkAvailableJumpSpaces(selectedPiece, board, cells, redTurn, "downRight", jumpToCoord_DR);
                }
            }
        }
    }
}

