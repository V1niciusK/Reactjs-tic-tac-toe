import { useState } from 'react';

function Square({ value, onSquareClick }) { //ATTENTION: NOTICE THE OBJECT {WRAPPER} AROUND THE FUNCTION ARGUMENT!!
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  ) ;
}

function Row( { id, value, onSquareClick } ) { // Use props for downward movement of data, like value={0}
  return (
    <div className="board-row">
      <Square value={value[0]} onSquareClick={ () => onSquareClick(id, 0) } />
      <Square value={value[1]} onSquareClick={ () => onSquareClick(id, 1) } />
      <Square value={value[2]} onSquareClick={ () => onSquareClick(id, 2) } />
    </div>
  ) ;
}

function Board( { currentMove, board, onPlay } ) {

  const winner = calculateWinner(board);
  const xIsNext = currentMove % 2 === 0;

  function handleClick(l, c) {
    const nextSquares = board.map( (row) => row.slice() ); // need to slice each inner array, otherwise shallow copy will still reference the old inner arrays
    if( nextSquares[l][c] !== null || winner !== null ) return;
    let mark = xIsNext ? "X" : "O";
    nextSquares[l][c] = mark;
    onPlay(nextSquares, l, c); //use functions passed onto Components for upward data movement
  }

  let status;

  if (winner !== null) {
    status = `Winner: ${winner}`;
  } else if (currentMove < 9) {
    status = `Next player: ${xIsNext ? "X": "O"}`;
  } else {
    status = "Stalemate"
  }

  return (
  <>
    <div className='status'>{status}</div>
    <Row id={0} value={board[0]} onSquareClick={ handleClick } />
    <Row id={1} value={board[1]} onSquareClick={ handleClick } />
    <Row id={2} value={board[2]} onSquareClick={ handleClick } />
  </>
  );
}


export default function Game() {
  const [ currentMove, setCurrentMove ] = useState(0);
  const xIsNext = currentMove % 2 === 0; // To update in case o multi-player (3-way t3 anyone?)
  const [ history, setHistory ] = useState( 
    [ 
      {
        "xIsPlayer": xIsNext, //redundant, but forces me to exercise object manipulation with useState
        "board": Array.from( {length: 3}, () => Array(3).fill(null) ),
        "status": "Initialized board" // next step: naming what was done in each recorded item
      }
    ]
  );
  const currentBoard = history[ currentMove ].board;

  function handlePlay(nextSquares, l, c){
    const nextHistory = [ ...history.slice(0, currentMove + 1), { 'xIsPlayer': xIsNext, 'board': nextSquares, 'status': `${xIsNext ? "X" : "O"} played on (${l},${c})` } ];
    setHistory( nextHistory );
    setCurrentMove( nextHistory.length - 1 );
  }

  // New moveList, last item is not a button

  function moveList() {
    let tempList = [];
    let description;
    
    for (let s = 0 ; s < ( history.length - 1 ); s ++) {
      if (s > 0) {
        description = `Rollback to when ${history[s].status}`;
      } else {
        description = 'Reset game';
      }
      tempList.push(
        <li key={s - 1}>
          <button onClick={ () => rollBack(s) }>{description}</button>
        </li>
      )
    }

    if (currentMove < 9){
      tempList.push(
        <li key={history.length}>
          <p>{ currentMove % 2 === 0 ? "X" : "O" } moves</p>
        </li>
      )
    }

    return tempList;
  }
  
  function rollBack(move) {
    setCurrentMove(move);
    setHistory( (prevHistory) => prevHistory.slice(0, move + 1) ); // destructive rollback, deletes history
  }
  return (
    <div className='game'>

      <div className='game-board'>
        <Board currentMove={currentMove} board={currentBoard} onPlay={handlePlay} />
      </div>

      <div className='game-info'>
        <ol>{moveList()}</ol>
      </div>

    </div>
  );
}

function calculateWinner(board) { //Winning calculation thru brute forcing for now (more than 3x3 t3 anyone?)

  const games = [
    //rows
    [ [0,0], [0,1], [0,2] ],
    [ [1,0], [1,1], [1,2] ],
    [ [2,0], [2,1], [2,2] ],
    
    //Columns
    [ [0,0], [1,0], [2,0] ],
    [ [0,1], [1,1], [2,1] ],
    [ [0,2], [1,2], [2,2] ],

    //Diagonals
    [ [0,0], [1,1], [2,2] ],
    [ [0,2], [1,1], [2,0] ]
  ];

  for ( let g = 0; g < games.length; g++ ) {
    const [a, b, c] = games[g];

    if (board[ a[0] ][ a[1] ] && board[ a[0] ][ a[1] ] === board[ b[0] ][ b[1] ] && board[ a[0] ][ a[1] ] === board[ c[0] ][ c[1] ] ) {
      return board[ a[0] ][ a[1] ];
    }
  }

  return null;
}