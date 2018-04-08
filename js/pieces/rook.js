class Rook extends Piece {
  constructor(color) {
    super();
    this.node.attr('type', 'rook');
    this.symbol = color == 'white' ? String.fromCodePoint("0x2656") : String.fromCodePoint("0x265C");
  }
}
