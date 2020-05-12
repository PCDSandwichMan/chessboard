import Pawn from "../components/pawns/Paws";

export default function initializeChessBoard(rowCount) {
  const squares = Array(64).fill(null);

  for (let i = 0; i < rowCount; i++) {
    squares[i] = new Pawn(2);
    squares[i + 40] = new Pawn(1);
  }

  return squares;
}
