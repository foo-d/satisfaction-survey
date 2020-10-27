import { next } from '../model/next.js';

next('next1');
let yearsOfSenority, question5;
const QUESTION456  =  [];
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
      yearsOfSenority = document.getElementById('yearsOfSeniority').value;
      break;
    case 2:
      next('next3');
      break;
    case 3:
      next('next4');
      QUESTION456.push(document.getElementById('question4').value, question5,
        document.getElementById('question6').value);
      console.log(QUESTION456);
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
    if ($(this).data('index') === 2) {
      $('#question4').on('input', _ => $('#number').text(document
        .getElementById('question4').value));
      $('.radio').on('click', function () {
        const RADIO = document.getElementsByClassName('radio');
        for (let i = 0; i < RADIO.length; i++) RADIO[i].style.borderColor =
          'transparent';
        document.getElementById($(this)[0].id).style.borderColor = '#000000';
        question5  = $(this).data('index');
      });
    }
  });
  const PAGE_NUMBER = $('#pageNumber');
  PAGE_NUMBER.text(parseInt(PAGE_NUMBER.text().charAt(0)) + 1 + '/5');
});
