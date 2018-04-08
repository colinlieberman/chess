class Pawn extends Piece {
  constructor(color) {
    super();
    this.node.attr('type', 'pawn');
    this.symbol = color == 'white' ? String.fromCodePoint("0x2659") : String.fromCodePoint("0x265F");
  }
}
