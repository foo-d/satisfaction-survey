import { next } from '../model/next.js';
import { radio } from '../model/radio.js';

next('next1');
let question1, question6, question8;
const QUESTION567  =  [];
/* global $ */
$('.next').on('click', function () {
  switch ($(this).data('index')) {
    case 1:
      next('next2');
      document.cookie = 'lastName=' + document.getElementById('lastName')
        .value + ';';
      document.cookie = 'firstName=' + document.getElementById('firstName')
        .value + ';';
      $('#cookie').html('Hello ' + document.cookie.split('; ').find(row => row
        .startsWith('firstName')).split('=')[1] + ' ' + document.cookie
        .split('; ').find(row => row.startsWith('lastName')).split('=')[1] +
        '.');
      question1 = document.getElementById('question1').value;
      break;
    case 2:
      next('next3');
      break;
    case 3:
      next('next4');
      QUESTION567.push(document.getElementById('question5').value, question6,
        document.getElementById('question7').value);
      console.log(QUESTION567);
      break;
    case 4:
      next('next5');
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
  $.get('view/questions-' + $(this).data('index') + '.html', element => {
    $('#page').html(element);
    switch ($(this).data('index')) {
      case 2:
        $('#question5').on('input', _ => $('#number').text(document
          .getElementById('question5').value));
        $('.radio1').on('click', function () {
          question6 = radio($(this));
        });
        break;
      case 3:
        $('.radio2').on('click', function () {
          question8 = radio($(this));
        });
        break;
      default:
        break;
    }
  });
  const PAGE_NUMBER = $('#pageNumber');
  PAGE_NUMBER.text(parseInt(PAGE_NUMBER.text().charAt(0)) + 1 + '/5');
});
