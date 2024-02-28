import { useState } from "react";

function Square({value, onSquareClick}){
  return <button onClick={onSquareClick} className="square">{value}</button>;
}

function Board({xIsNext, squares, onPlay}) {

  function handleClick(i){

    if(squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);

  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Ganhador: " + winner;
  }else{
    status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  }
  
  return (
    <>
      <div className="status">{status}</div>
      
      { squares.map((item, index_div, array) => {

        return index_div % 3 === 0 &&
          <div key={index_div} className="board-row">
            {
              array.map((item, index_item) => {

                if(index_item >= index_div && index_item <= (index_div + 2)){

                  return <Square key={index_item} value={item} onSquareClick={() => handleClick(index_item)} />;

                }

              })
            }
          </div>;

      }) }
    </>
  );

}

export default function Game(){

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0){
      description = "Você está no movimento #" + move;
    }else{
      description = "Clique para iniciar o jogo";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );

}