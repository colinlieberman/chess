class Piece {
  constructor(color) {
    this.row  = '';
    this.file = '';
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
    this.row  = parseInt(id.substr(1));
    this.file = id.substr(0,1);
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
    $('piece.selected').removeClass('selected');
    var state = UCP.session.state;
    switch(state) {
      case 'SELECT_PIECE':
        if(this.is_own_piece() && this.can_move()) {
          this.pick_up();
          UCP.session.advance_state();
        }
        break;

      case 'PLACE_PIECE':
        if(this.is_own_piece) {
          if(this.can_move()) {
            this.pick_up();
          }
          else {
            UCP.session.retreat_state();
          }
        }
        break;
    }
  }

  type() {
    this.node.attr('type');
  }

  file_index() {
    var file_ascii = this.file.charCodeAt(0);
    return file_ascii - 97; /* 97 is 'a' */
  }

  empty_or_enemy(piece) {
    return !(piece && piece.player == this.player);
  }
};
