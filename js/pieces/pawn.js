class Pawn extends Piece {
  constructor(color) {
    super(color);
    this.en_passant_possible = null; /* would be the piece that could be captured in this manner */
    this.node.attr('type', 'pawn');
    this.symbol = color == 'white' ? String.fromCodePoint("0x2659") : String.fromCodePoint("0x265F");
  }

  can_move() {
    /* I can move if
        * there is one or two spaces in front of me (so one space is the same thing)
        * an enemy piece is kitty corner to me
        * en_passant is possible
    */
    var my_row  = this.row;
    var my_file = this.file;
    var board   = UCP.board;
    var squares = board.squares;
    var to_row, to_file;

    /* can I go forward? */
    if(this.player == 'white') {
      /* assuming this cannot be 8th rank because would have promoted */
      to_row = my_row + 1;
      to_file = this.file;
      if(to_row < 8 && squares[to_row][to_file] == null && board.king_safe_with_move(this.player, this, to_row, to_file)) {
        return true;
      }
    }
    else {
      to_row = my_row - 1;
      to_file = this.file;
      if(to_row > 1 && squares[to_row][to_file] == null && board.king_safe_with_move(this.player, this, to_row, to_file)) {
        return true;
      }
    }

    /* can I capture a piece? */
    if(this.player == 'white') {
      /* capture to the right */
      if(my_file != 'h' && my_row < 8) {
        to_row = my_row + 1;
        to_file = board.next_file(this.file);
        var square = squares[to_row][to_file];
        if(square && square.player == 'black' && board.king_safe_with_move(this.player, this, to_row, to_file)) {
          return true;
        }
      }
      /* to the left */
      if(my_file != 'a' && my_row < 8) {
        to_row = my_row + 1;
        to_file = board.prev_file(this.file);
        var square = squares[to_row][to_file];
        if(square && square.player == 'black' && board.king_safe_with_move(this.player, this, to_row, to_file)) {
          return true;
        }
      }
    }
    else { /* black pieces */
      /* capture to the right */
      if(my_file != 'a' && my_row > 1) {
        to_row = my_row - 1;
        to_file = board.prev_file(this.file);
        var square = board.squares[to_row][to_file];
        if(square && square.player == 'white' && board.king_safe_with_move(this.player, this, to_row, to_file)) {
          return true;
        }
      }
      /* to the left */
      if(my_file != 'h' && my_row > 1) {
        to_row = my_row - 1;
        to_file = board.next_file(this.file);
        var square = board.squares[to_row][to_file];
        if(square && square.player == 'white' && board.king_safe_with_move(this.player, this, to_row, to_file)) {
          return true;
        }
      }
    }
    if(this.en_passant_possible) {
      return true;
    }
    return false;
  }
}
