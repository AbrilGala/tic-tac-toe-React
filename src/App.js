import { useState } from "react";

function Square({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick} >{value}</button>
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  let status;

  if(winner){
    status = "Ganador: "+ winner; 
  }else{
    status = "Siguiente jugador: "+ (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    //Si el cuadrado ya esta lleno, no agrego nada
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    //Si el cuadrado está vacío:
    const nextSquares = squares.slice(); //Hago una copia del cuadrado
    if(xIsNext){ //Si sigue la X
      nextSquares[i] = "X";
    }else{ //Si sigue la O
      nextSquares[i] = "O";
    }
    setSquares(nextSquares); //Guardo la modificación del cuadrado (cambio su estado)
    setXIsNext(!xIsNext); //Actualizo el siguiente turno
  }

  function calculateWinner(squares){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    lines.forEach(line => {
      const [a,b,c] = line;
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    });
    
    return null;
  }

  return (
    <>
    <div className="game">
      <h1>Tic Tac Toe!</h1>
      <div className="board">
        <div className="board-row"> 
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>
        <div className="board-row"> 
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>
        <div className="board-row"> 
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
      </div>
      <div className="status">
        <h2>{status}</h2>
      </div>
    </div>
    </>
  )
}
