import { changePageButtons } from '../model/change-page-buttons.js';
import { radio } from '../model/radio.js';

$.get('view/questions-0.html', element => $('#page').html(element));
changePageButtons(0);
let question0;
let questions456, questions78 = [];
let question5, question7 = 2;
const PAGE_NUMBER = $('#pageNumber');
/* global $ */
$('.next').on('click', function () {
  changePageButtons($(this).data('to'));
  switch ($(this).data('from')) {
    case 0:
      document.cookie = 'lastName=' + document.getElementById('lastName')
        .value + ';';
      document.cookie = 'firstName=' + document.getElementById('firstName')
        .value + ';';
      $('#cookie').html('Hello ' + document.cookie.split('; ').find(row => row
        .startsWith('firstName')).split('=')[1] + ' ' + document.cookie
        .split('; ').find(row => row.startsWith('lastName')).split('=')[1] +
        '.');
      question0 = document.getElementById('question0').value;
      break;
    case 1:
      /* TODO: get questions 1, 2 & 3 */
      break;
    case 2:
      questions456 = [document.getElementById('question4').value, question5,
        document.getElementById('question6').value];
      break;
    case 3:
      questions78 = [question7];
      /* TODO: get question 8 */
      console.log(questions78);
      break;
    case 4:
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
  getPage($(this));
  PAGE_NUMBER.text(parseInt(PAGE_NUMBER.text().charAt(0)) + 1 + '/5');
});
$('.previous').on('click', function () {
  changePageButtons($(this).data('to'));
  if ($(this).data('from') === 2) {
    question5 = 2;
  } else if ($(this).data('from') === 3) {
    question7 = 2;
  }
  getPage($(this));
  PAGE_NUMBER.text(parseInt(PAGE_NUMBER.text().charAt(0)) - 1 + '/5');
});

const getPage = element => {
  $.get('view/questions-' + element.data('to') + '.html', page => {
    $('#page').html(page);
    switch (element.data('to')) {
      case 2:
        $('#question4').on('input', _ => $("#number").text(document
          .getElementById('question4').value));
        $('.radio1').on('click', function () {
          question5 = radio($(this));
        });
        break;
      case 3:
        $('.radio2').on('click', function () {
          question7 = radio($(this));
        });
        break;
      default:
        break;
    }
  });
};
