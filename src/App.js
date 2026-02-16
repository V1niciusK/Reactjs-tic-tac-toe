import { useState } from 'react';

function Square({ value, onSquareClick }) { //ATTENTION: NOTICE THE OBJECT WRAPPER AROUND THE FUNCTION ARGUMENT!!
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  ) ;
}

function Row( { id, value, onSquareClick } ) { //ATTENTION: NOTICE THE OBJECT WRAPPER AROUND THE FUNCTION ARGUMENT!!
  return (
    <div className="board-row">
      <Square value={value[0]} onSquareClick={ () => onSquareClick(id, 0) } />
      <Square value={value[1]} onSquareClick={ () => onSquareClick(id, 1) } />
      <Square value={value[2]} onSquareClick={ () => onSquareClick(id, 2) } />
    </div>
  ) ;
}

function Board( { xIsNext, board, onPlay } ) { //ATTENTION: NOTICE THE OBJECT WRAPPER AROUND THE FUNCTION ARGUMENT!!

  const winner = calculateWinner(board);

  function handleClick(l, c) {
    const nextSquares = board.map( (row) => row.slice() ); // need to slice each inner array, otherwise shallow copy will still reference the old inner arrays
    if( nextSquares[l][c] !== null || winner !== null ) return;
    let mark = xIsNext ? "X" : "O";
    nextSquares[l][c] = mark;
    onPlay(nextSquares);
  }

  let status;

  if (winner !== null) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X": "O"}`;
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
        "xIsPlayer": xIsNext,
        "board": Array.from( {length: 3}, () => Array(3).fill(null) )
      }
    ]
  );
  const currentBoard = history[ currentMove ].board;

  console.log(`currentMove: ${currentMove}`)
  console.log(`currentBoard: ${history[ currentMove ]}`)

  function handlePlay(nextSquares){
    const nextHistory = [ ...history.slice(0, currentMove + 1), { 'xIsPlayer': xIsNext, 'board': nextSquares } ];
    setHistory( nextHistory );
    setCurrentMove( nextHistory.length - 1 );
  }

  
  let moveList = history.map( ( state, move ) => { //By default, for each item, arg0 is the item itself, arg1 is its index number
    let description;
    if (move > 0) {
      description = `Rollback to move #${move}`;
    } else {
      description = 'Reset game';
    }
    return (
      <li key={move}>
        <button onClick={ () => rollBack(move) }>{description}</button>
      </li>
    )
    
  } )
  
  function rollBack(move) {
    setCurrentMove(move);
  }
  return (
    <div className='game'>

      <div className='game-board'>
        <Board xIsNext={xIsNext} board={currentBoard} onPlay={handlePlay} />
      </div>

      <div className='game-info'>
        <ol>{moveList}</ol>
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