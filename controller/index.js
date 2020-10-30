import { a } from '../model/a.js';
import { changePageButtons } from '../model/change-page-buttons.js';
import { radio } from '../model/radio.js';

$.get('view/questions-0.html', element => $('#page').html(element));
changePageButtons(0);
const COOKIE = $('#cookie');
let question0;
let question5 = 2;
let question7 = 2;
const PAGE_NUMBER = $('#pageNumber');
/* global $ */
$('.next').on('click', function () {
  switch ($(this).data('from')) {
    case 0:
      document.cookie = 'lastName=' + document.getElementById('lastName')
        .value + ';';
      document.cookie = 'firstName=' + document.getElementById('firstName')
        .value + ';';
      COOKIE.html('Hello ' + document.cookie.split('; ').find(row => row
        .startsWith('firstName')).split('=')[1] + ' ' + document.cookie
        .split('; ').find(row => row.startsWith('lastName')).split('=')[1] +
        '.');
      question0 = document.getElementById('question0').value;
      break;
    case 1:
      a.question1 = document.getElementById('question11').value * document
        .getElementById('question12').value * 10 / 8;
      a.question2 = document.querySelector('input[name="question2"]:checked')
        .value * 10 / 4;
      a.question3 = document.getElementById('question3').value === '' ? 10 : 0;
      break;
    case 2:
      a.question4 = document.getElementById('question4').value;
      a.question5 = question5 * 10 / 3;
      a.question6 = document.getElementById('question6').value / 10;
      break;
    case 3:
      a.question7 = question7 * 10 / 3;
      a.question8 = document.getElementById('question8').checked ? 10 : 0;
      COOKIE.html('Thank you ' + document.cookie.split('; ').find(row => row
        .startsWith('firstName')).split('=')[1] + ' ' + document.cookie
        .split('; ').find(row => row.startsWith('lastName')).split('=')[1] +
        ' for taking the time to answer this questionnaire. Based on your ans' +
        'wers, the restaurant obtains the score of:');
      /* TODO: chart */
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
      case 4:
        let score = 0;
        for (const PROPERTY in a) score += parseInt(a[PROPERTY]);
        $('#score').html(score / 8 + '/10');
        break;
      default:
        break;
    }
  });
  changePageButtons(element.data('to'));
};
