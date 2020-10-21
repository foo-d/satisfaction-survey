/* global $ */
$('.next').on('click', function () {
  switch ($(this).data('index')) {
    case 1:
      document.cookie = 'lastName=' + document.getElementById('lastName')
        .value + ';';
      document.cookie = 'firstName=' + document.getElementById('firstName')
        .value + ';';
      $('#cookie').html('Hello ' + document.cookie.split('; ').find(row => row
        .startsWith('firstName')).split('=')[1] + ' ' + document.cookie
        .split('; ').find(row => row.startsWith('lastName')).split('=')[1] +
        '.');
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    default:
      break;
  }
  $.get('view/questions-' + $(this).data('index') + '.html', element =>
    $('#page').html(element));
});
