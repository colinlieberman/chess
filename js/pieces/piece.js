class Piece {
  constructor(color) {
    this.node = $("<piece></piece>");
    this.node.attr('player', color);
    var that = this;
    this.node.click(function(e){that.handle_click(e);});
    this.player = color;
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

  is_own_piece() {
    return this.player == UCP.session.move;
  }

  pick_up() {
    this.node.addClass('selected');
  }

  handle_click(e) {
    var state = UCP.session.state;
    switch(state) {
      case 'SELECT_PIECE':
        if(this.is_own_piece()) {
          this.pick_up();
          UCP.session.advance_state();
        }
        break;

      case 'PLACE_PIECE':
        if(this.is_own_piece()) {
          $('piece.selected').removeClass('selected');
          this.pick_up();
        }
    }
  }
};
