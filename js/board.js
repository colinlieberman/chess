UCP.Board = {
  rotate: function() {
    var board = $('board');
    var rows  = board.find('row');
    var file_labels = $('#file-labels');
    rows.each(function() {
      var row = $(this);
      var label = row.find('label');
      row.prepend(label);
      board.prepend(row);
    });
    file_labels.find('label').each(function() {
      file_labels.prepend(this);
    });
  },
};
