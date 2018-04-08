class Board {
  /* position is hash of pieces by color and position */
    constructor(position) {
    this.squares = {};
    var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    for(var row = 1; row <= 8; row++) {
    this.squares[row] = {};
      for(var i in files) {
        this.squares[row][files[i]] = null;
      }
    }
    if(!position) {
      position = this.default_position();
    }

    for(var color in position) {
      var rows = position[color];
      for(var row_num in rows) {
        var row = rows[row_num]
        for(var file in row) {
          var square_id = file + row_num;
          var type = row[file];
          var piece = Piece.create(color, type);
          this.squares[row_num][file] = piece;
          piece.place_on(square_id);
        }
      }
    }
  };

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
  };

  default_position() {
    return {
      white: {
        1: {a: 'r', b: 'n', c: 'b', d: 'q', e: 'k', f: 'b', g: 'n', h: 'r'},
        2: {a: 'p', b: 'p', c: 'p', d: 'p', e: 'p', f: 'p', g: 'p', h: 'p'}
      },
      black: {
        8: {a: 'r', b: 'n', c: 'b', d: 'q', e: 'k', f: 'b', g: 'n', h: 'r'},
        7: {b: 'p', b: 'p', c: 'p', d: 'p', e: 'p', f: 'p', g: 'p', h: 'p'}
      }
    };
  };
};
