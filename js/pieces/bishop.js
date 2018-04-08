class Bishop extends Piece {
  constructor(color) {
    super(color);
    this.node.attr('type', 'bishop');
    this.symbol = color == 'white' ? String.fromCodePoint("0x2657") : String.fromCodePoint("0x265D");
  }
}
