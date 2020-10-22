/* global $ */
document.getElementById('next1').style.visibility = 'visible';
$('.next').on('click', function () {
  switch ($(this).data('index')) {
    case 1:
      document.getElementById('next2').style.visibility = 'visible';
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
    case 5:
      const ELEMENT = document.createElement('a');
      const CSV = 'data:text/csv;charset=utf-8,' + document.cookie.split('; ')
        .map(element => element.split('=')[1]).join(',') + '\n';
      ELEMENT.setAttribute('download', 'satisfaction-survey.csv');
      ELEMENT.setAttribute('href', encodeURI(CSV));
      document.body.appendChild(ELEMENT);
      ELEMENT.click();
      break;
    default:
      break;
  }
  $.get('view/questions-' + $(this).data('index') + '.html', element =>
    $('#page').html(element));
});
