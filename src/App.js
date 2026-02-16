import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  ) ;
}

function Row( { id, value, onSquareClick } ) {
  return (
    <div className="board-row">
      <Square value={value[0]} onSquareClick={ () => onSquareClick(id, 0) } />
      <Square value={value[1]} onSquareClick={ () => onSquareClick(id, 1) } />
      <Square value={value[2]} onSquareClick={ () => onSquareClick(id, 2) } />
    </div>
  ) ;
}

export default function Board() {
  const [ xIsNext, setXIsNext ] = useState( true );
  const[ board, setBoard ] = useState( () => Array.from( {length: 3}, () => Array(3).fill(null) ) ) ;

  const winner = calculateWinner(board);

  function handleClick(l, c) {

    const nextSquares = board.slice();

    if( nextSquares[l][c] !== null || winner !== null ) return;

    console.log(`called handle click with l=${l} and c=${c}`);


    console.log(nextSquares.toString());
    console.log(`Square before: ${nextSquares[l][c]}`)

    let mark = xIsNext ? "X" : "O";

    nextSquares[l][c] = mark;

    console.log(`Board after: ${nextSquares.toString()}`);

    setBoard(nextSquares);
    setXIsNext( !xIsNext );
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
    <Row id="0" value={board[0]} onSquareClick={ handleClick } />
    <Row id="1" value={board[1]} onSquareClick={ handleClick } />
    <Row id="2" value={board[2]} onSquareClick={ handleClick } />
  </>
  );
}

function calculateWinner(board) {
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
  ]

  for ( let g = 0; g < games.length; g++ ) {
    const [a, b, c] = games[g];
    if (board[ a[0] ][ a[1] ] && board[ a[0] ][ a[1] ] === board[ b[0] ][ b[1] ] && board[ a[0] ][ a[1] ] === board[ c[0] ][ c[1] ] ) {
      return board[ a[0] ][ a[1] ];
    }
  }
  return null;
}