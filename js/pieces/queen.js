class Queen extends Piece {
  constructor(color) {
    super();
    this.node.attr('type', 'qween');
    this.symbol = color == 'white' ? String.fromCodePoint("0x2655") : String.fromCodePoint("0x265B");
  }
}
