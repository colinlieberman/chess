class Piece {
  constructor(color) {
    this.node = $("<piece></piece>");
    this.node.attr('player', color);
  }

  static create(color, type) {
    switch(type) {
      case 'p':
        return new Pawn(color);
        break;
      case 'r':
        return new Rook(color);
        break;
      case 'n':
        return new Knight(color);
        break;
      case 'b':
        return new Bishop(color);
        break;
      case 'q':
        return new Queen(color);
        break;
      case 'k':
        return new King(color);
        break;
      default:
        throw "Unknown piece type " + type;
    }
  }

  place_on(id) {
    this.position = id;
    this.node.text(this.symbol);
    $('#' + id).append(this.node);
  };
};
