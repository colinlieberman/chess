class Bishop extends Piece {
  constructor(color) {
    super(color);
    this.node.attr('type', 'bishop');
    this.symbol = color == 'white' ? String.fromCodePoint("0x2657") : String.fromCodePoint("0x265D");
  }

  can_move() {
    /* if a neighboring diagonal square is empty or occupied by an enemy piece, I can move */
    /* up left */
    var my_row  = this.row;
    var my_file = this.file;
    var square  = null;
    var board   = UCP.board;
    var squares = UCP.board.squares;

    /* up left */
    var to_row, to_file;
    if(my_row != 8 && my_file != 'a') {
      to_row = my_row + 1;
      to_file = board.prev_file(my_file);
      square = squares[to_row][to_file];
      if(this.empty_or_enemy(square) && board.king_safe_with_move(this.player, this, to_row, to_file)) {
        return true;
      }
    }
    /* up right */
    if(my_row != 8 && my_file != 'h') {
      to_row = my_row + 1;
      to_file = board.next_file(my_file);
      square = squares[to_row][to_file];
      if(this.empty_or_enemy(square) && board.king_safe_with_move(this.player, this, to_row, to_file)) {
        return true;
      }
    }
    /* down left */
    if(my_row != 1 && my_file != 'a') {
      to_row = my_row - 1;
      to_file = board.prev_file(my_file);
      square = squares[to_row][to_file];
      if(this.empty_or_enemy(square) && board.king_safe_with_move(this.player, this, to_row, to_file)) {
        return true;
      }
    }
    /* down right */
    if(my_row != 1 && my_file != 'h') {
      to_row = my_row - 1;
      to_file = board.next_file(my_file);
      square = squares[to_row][to_file];
      if(this.empty_or_enemy(square) && board.king_safe_with_move(this.player, this, to_row, to_file)) {
        return true;
      }
    }
    return false;
  }
}
