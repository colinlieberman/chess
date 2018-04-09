class Game {
  constructor() {
    this.states = [
      'SELECT_PIECE', 'PLACE_PIECE', 'EVALUATE_LEGAL_MOVE',
       'EVALUATE_CHECK', 'EVALUATE_CHECKMATE', 'COMPLETE'
    ];
    this.state = 'SELECT_PIECE';
    this.resoluation = ''; /* resolutions are 0-1, 1-0, and .5-.5 */
    this.check = false;
    this.move = 'white';
    this.board = UCP.board;
    this.pieces = {white: [], black: []};
    this.identify_pieces();
    this.set_active_pieces();
    $('board').attr('state', this.state);
  }

  advance_state() {
    if(this.state == 'COMPLETE') {
      throw "Trying to advance state from finished game";
    }
    /* treat 'COMPLETE' as a special state */
    var max_state = this.states.length - 1;
    for(var i in this.states) {
      if(i != max_state) {
        if(this.state == this.states[i]) {
          this.state = this.states[parseInt(i)+1]; /* i is string "0" for some reason */
          break;
        }
      }
      else {
        /* state must be EVALUATE_CHECKMATE at this point;
           assume resolution is now set if the game is over
        */
        if(this.resolution) {
          this.state = COMPLETE;
        }
        else {
          this.state = 'SELECT_PIECE';
        }
      }
    }
    $('board').attr('state', this.state);
  }

  retreat_state() {
    if(this.state == 'SELECT_PIECE') {
      throw "cannot retreat state from piece selection";
    }
    var max_state = this.states.length - 1;
    for(var i in this.states) {
      if(i != max_state) {
        if(this.state == this.states[i]) {
          this.state = this.states[parseInt(i)-1]; /* i is string "0" for some reason */
          break;
        }
      }
    }
    $('board').attr('state', this.state);
  }

  identify_pieces() {
    for(var row_num in this.board.squares) {
      var row = this.board.squares[row_num];
      for(var file in row) {
        var piece = row[file];
        if(piece) {
          this.pieces[piece.player].push(piece);
        }
      }
    }
  }

  set_active_pieces() {
    $('piece').removeClass('active');
    for(var i in this.pieces[this.move]) {
      this.pieces[this.move][i].node.addClass('active');
    }
  }

}
