function checkWinner(squares) {
  const winIndex = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of winIndex) {
    if (
      (squares[a] === "X" || squares[a] === "O") &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    )
      return squares[a];
  }
  if (squares.every((s) => s != null)) return "#"; //for tie
  return null;
}


function getGameCode()
{
    return window.location.href.split("/").slice(-1)[0]
}


function getWinner(winner,nameX,nameO)
{
    if(winner==="X")
        return nameX;
    if(winner==="O")
        return nameO;
    if(winner==="#")
       return  "TIE"
}
export { checkWinner, getGameCode, getWinner };