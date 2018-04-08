class King extends Piece {
  constructor(color) {
    super();
    this.node.attr('type', 'king');
    this.symbol = color == 'white' ? String.fromCodePoint("0x2654") : String.fromCodePoint("0x265A");
  }
}
