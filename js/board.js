class Board {
  /* position is hash of pieces by color and position */
  constructor(position) {
    this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    this.kings = {black: null, white: null};
    this.init_squares(position);
    this.set_position(position);
  }

  init_squares(position) {
    var files = this.files;
    this.squares = {};
    for(var row = 1; row <= 8; row++) {
    this.squares[row] = {};
      for(var i in this.files) {
        this.squares[row][files[i]] = null;
      }
    }
  }

  next_file(file) {
    if(file == 'h') {
      throw "there is nothing to the right of the h file";
    }
    /* ascii is sequential */
    return String.fromCharCode(file.charCodeAt(0) + 1);
  }

  prev_file(file) {
    if(file == 'a') {
      throw "there is nothing to the left of the a file";
    }
    return String.fromCharCode(file.charCodeAt(0) - 1);
  }

  set_position(position) {
    if(!position) {
      position = this.default_position();
    }

    for(var color in position) {
      var n_pawns = 0;
      var rows = position[color];
      for(var row_num in rows) {
        var row = rows[row_num]
        for(var file in row) {
          var square_id = file + row_num;
          var type = row[file];
          var piece = Piece.create(color, type);
          this.squares[row_num][file] = piece;
          piece.place_on(square_id);
          switch(type) {
            case 'p':
              if(++n_pawns > 8) {
                throw "Can't have more than 8 pawns of one color";
              }
              break;
            /* other pieces I guess you could have more than two by doing weird pawn promotions */
            case 'k':
              if(this.kings[color]) {
                throw "Can't have more than one king of one color";
              }
              this.kings[color] = piece;
              break;
          }
        }
      }
    }
  }

  rotate() {
    var board = $('board');
    var rows  = board.find('row');
    var file_labels = $('#file-labels');
    rows.each(function() {
      var row = $(this);
      var label = row.find('label');
      var squares = row.find('square');
      board.prepend(row);
      squares.each(function() {
        row.prepend(this);
      });
      row.prepend(label);
    });
    file_labels.find('label').each(function() {
      file_labels.prepend(this);
    });
  }

  default_position() {
    return {
      white: {
        1: {a: 'r', b: 'n', c: 'b', d: 'q', e: 'k', f: 'b', g: 'n', h: 'r'},
        2: {a: 'p', b: 'p', c: 'p', d: 'p', e: 'p', f: 'p', g: 'p', h: 'p'}
      },
      black: {
        8: {a: 'r', b: 'n', c: 'b', d: 'q', e: 'k', f: 'b', g: 'n', h: 'r'},
        7: {a: 'p', b: 'p', c: 'p', d: 'p', e: 'p', f: 'p', g: 'p', h: 'p'}
      }
    };
  }

  king_safe_with_move(player, piece, to_row, to_file) {
    /* set up mock board and test position of the king */
    var test_squares = Object.assign(this.squares);
    var test_piece   = Object.assign(piece);
    var king = this.kings[player];
    var files = this.files;
    var max_file_i = files.length - 1;
    var king_file_index = king.file_index();

    var file, test_square;

    test_squares[to_row][to_file] = test_piece;
    test_piece.row = to_row;
    test_piece.file = to_file;
    test_squares[piece.row][piece.file] = null;

    if(piece.type() == 'king') {
      king = test_piece;
    }

    /* start with the king, and look along all horizontals and diagonals until
       we find an enemy piece, and then see if it's one that can attack us;
       when the square we're looking at is one of the one's we're testing, adjust accordingly
    */
    /* up */
    var row, file_i, interval;
    for(row = king.row + 1; row <= 8; row++) {
      test_square = test_squares[row][king.file];
      if(test_square) {
        interval = row - king.row;
        if(this.threat_horizontal(test_square, player, interval)) {
          return false;
        }
        else {
          /* means it's our own piece, so no threat */
          break;
        }
      }
    }
    /* down */
    for(row = king.row - 1; row >= 1; row--) {
      test_square = test_squares[row][king.file];
      if(test_square) {
        interval = king.row - row;
        if(this.threat_horizontal(test_square, player, interval)) {
          return false;
        }
        else {
          break;
        }
      }
    }
    /* left */
    for(file_i = king_file_index - 1; file_i >= 1; file_i--) {
      file = files[file_i];
      test_square = test_squares[king.row][file];
      if(test_square) {
        interval = king_file_index - file_i;
        if(this.threat_horizontal(test_square, player, interval)) {
          return false;
        }
        else {
          break;
        }
      }
    }
    /* right */
    for(file_i = king_file_index + 1; file_i <= 7; file_i++) {
      file = files[file_i];
      test_square = test_squares[king.row][file];
      if(test_square) {
        interval = file_i - king_file_index;
        if(this.threat_horizontal(test_square, player, interval)) {
          return false;
        }
        else {
          break;
        }
      }
    }

    /* now diagonal */
    /* up to the left */
    var test_pawns = false;
    for(row = king.row + 1, file_i = king_file_index - 1; row <= 8 && file_i >= 1; row++, file_i--) {
      test_pawns = player == 'white' ? true : false;
      test_square = test_squares[row][file_i];
      if(test_square) {
        interval = row - king.row;
        if(this.threat_diagonal(test_square, player, interval, test_pawns)) {
          return false;
        }
        else {
          /* means it's our own piece, so no threat */
          break;
        }
      }
    }
    /* up to the right */
    for(row = king.row + 1, file_i = king_file_index + 1; row <= 8 && file_i <= 7; row++, file_i++) {
      test_pawns = player == "white" ? true : false;
      test_square = test_squares[row][file_i];
      if(test_square) {
        interval = row - king.row;
        if(this.threat_diagonal(test_square, player, interval, test_pawns)) {
          return false;
        }
        else {
          /* means it's our own piece, so no threat */
          break;
        }
      }
    }
    /* down to the left */
    for(row = king.row - 1, file_i = king_file_index; row >= 1 && file_i >= 1; row--, file_i--) {
      test_pawns = player == "white" ? false : true;
      test_square = test_squares[row][file_i];
      if(test_square) {
        interval = king.row - row;
        if(this.threat_diagonal(test_square, player, interval, test_pawns)) {
          return false;
        }
        else {
          /* means it's our own piece, so no threat */
          break;
        }
      }
    }
    /* down to the right */
    for(row = king.row - 1, file_i = king_file_index + 1; row >=1 && file_i <= 7; row--, file_i++) {
      test_pawns = player == "white" ? false : true;
      test_square = test_squares[row][file_i];
      if(test_square) {
        interval = king.row - row;
        if(this.threat_diagonal(test_square, player, interval, test_pawns)) {
          return false;
        }
        else {
          /* means it's our own piece, so no threat */
          break;
        }
      }
    }

    /* then test knights */

    return true;
  }

  threat_horizontal(test_square, player, interval_distance) {
    if(test_square.player == player) {
      return false;
    }
    else {
      var type = test_square.type();
      if(type == 'rook' || type == 'queen') {
        return true;
      }
      else if(type == 'king' && interval_distance == 1)  {
        return true;
      }
    }
    return false;
  }

  threat_diagonal(test_square, player, interval_distance, test_pawns) {
    if(test_square.player == player) {
      return false;
    }
    else {
      var type = test_square.type();
      if(type == 'bishop' || type == 'queen') {
        return true;
      }
      else if(type == 'king' && interval_distance == 1)  {
        return true;
      }
      else if(test_pawns && type == 'pawn' && interval_distance == 1){
        return true;
      }
    }
    return false;
  }
};
