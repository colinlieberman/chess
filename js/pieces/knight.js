class Knight extends Piece {
  constructor(color) {
    super();
    this.node.attr('type', 'knight');
    this.symbol = color == 'white' ? String.fromCodePoint("0x2658") : String.fromCodePoint("0x265E");
  }
}
