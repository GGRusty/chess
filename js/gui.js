$('#SetFen').on('click', function () {
  var fenStr = $('#fenIn').val();
  $('#error-message').text(''); // Clear any previous error messages
  try {
    ParseFen(fenStr);
    PrintBoard();
  } catch (error) {
    console.error('Failed to parse FEN:', error);
    $('#error-message').text('Invalid FEN string.'); // Display error message
  }
});
