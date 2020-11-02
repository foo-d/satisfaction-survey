/* terser controller/*.js -o dist/controller.min.js -c -m */
/* terser model/*.js -o dist/model.min.js -c -m */

import { a, changePageButtons, csv, easeIn, lang, radio } from
  '../dist/model.min.js';

let aLang = lang(navigator.language.substring(0, 2));
$.get('view/questions-0.html', element => {
  $('#page').html(element);
  changePageButtons(0);
  lang(aLang);
});
easeIn();
/* global $ */
$('#lang').on('click', _ => {
  if (aLang === 'fr') aLang = lang('en'); else aLang = lang('fr');
});
let required = true;
const COOKIE = $('#cookie');
let question5 = 2;
let question7 = 2;
const PAGE_NUMBER = $('#pageNumber');
$('.next').on('click', function () {
  switch ($(this).data('from')) {
    case 0:
      required = true;
      const QUESTION0 = ['lastName' + aLang, 'firstName' + aLang, 'age' + aLang,
        'email' + aLang, 'phoneNumber' + aLang, 'question0' + aLang];
      for (const PROPERTY in QUESTION0) {
        if (required === false || document.getElementById(QUESTION0[PROPERTY])
          .value === '') {
          required = false;
        }
      }
      if (required) {
        document.cookie = 'lastName=' + document.getElementById('lastName' +
          aLang).value + ';';
        document.cookie = 'firstName=' + document.getElementById('firstName' +
          aLang).value + ';';
        document.cookie = 'question0=' + document.getElementById('question0' +
          aLang).value + ';';
      }
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
      break;
    case 4:
      const ELEMENT = document.createElement('a');
      const CSV = 'data:text/csv;charset=utf-8,' + csv + '\n' + document.cookie
        .split('; ').map(element => element.split('=')[1]).join(',') + '\n';
      ELEMENT.setAttribute('download', 'satisfaction-survey.csv');
      ELEMENT.setAttribute('href', encodeURI(CSV));
      document.body.appendChild(ELEMENT);
      ELEMENT.click();
      break;
    default:
      break;
  }
  if (required) {
    document.getElementById('required').style.display = 'none';
    if (parseInt(PAGE_NUMBER.text().charAt(0)) !== 5) {
      anime({
        targets: '#home',
        'margin-right': '3840px',
        easing: 'easeInOutBack',
        complete: _ => {
          getPage($(this));
          PAGE_NUMBER.text(parseInt(PAGE_NUMBER.text().charAt(0)) + 1 + '/5');
          easeIn();
        }
      });
    }
  } else {
    document.getElementById('required').style.display = 'block';
  }
});
$('.previous').on('click', function () {
  if ($(this).data('from') === 2) {
    question5 = 2;
  } else if ($(this).data('from') === 3) {
    question7 = 2;
  }
  anime({
    targets: '#home',
    'margin-left': '3840px',
    easing: 'easeInOutBack',
    complete: _ => {
      getPage($(this));
      PAGE_NUMBER.text(parseInt(PAGE_NUMBER.text().charAt(0)) !== 5 ?
        parseInt(PAGE_NUMBER.text().charAt(0)) + 1 + '/5' : '5/5');
      document.getElementById('home').style.marginLeft= '0';
      document.getElementById('home').style.marginRight= '3840px';
      anime({
        targets: '#home',
        'margin-right': '0',
        easing: 'easeInOutBack'
      });
      getPage($(this));
      PAGE_NUMBER.text(parseInt(PAGE_NUMBER.text().charAt(0)) - 1 + '/5');
    }
  });
});

const getPage = element => {
  $.get('view/questions-' + element.data('to') + '.html', page => {
    $('#page').html(page);
    switch (element.data('to')) {
      case 1:
        COOKIE.html('<span lang="en">Hello ' + document.cookie.split('; ')
          .find(row => row.startsWith('firstName')).split('=')[1] + ' ' +
          document.cookie.split('; ').find(row => row.startsWith('lastName'))
            .split('=')[1] + '.</span><span lang="fr">Bonjour ' + document
            .cookie.split('; ').find(row => row.startsWith('firstName'))
            .split('=')[1] + ' ' + document.cookie.split('; ').find(row => row
            .startsWith('lastName')).split('=')[1] + '.</span>');
        break;
      case 2:
        $('#question4').on('input', _ => $("#rangeNumber").text(document
          .getElementById('question4').value));
        $('.radio11, .radio12').on('click', function () {
          question5 = radio($(this));
        });
        break;
      case 3:
        $('.radio2').on('click', function () {
          question7 = radio($(this));
        });
        break;
      case 4:
        COOKIE.html('<span lang="en">Thank you ' + document.cookie.split('; ')
          .find(row => row.startsWith('firstName')).split('=')[1] + ' ' +
          document.cookie.split('; ').find(row => row.startsWith('lastName'))
            .split('=')[1] + ' for taking the time to answer this questionnai' +
          're. Based on your answers, the restaurant obtains the score of:</s' +
          'pan><span lang="fr">Merci ' + document.cookie.split('; ')
            .find(row => row.startsWith('firstName')).split('=')[1] + ' ' +
          document.cookie.split('; ').find(row => row.startsWith('lastName'))
            .split('=')[1] + ' pour avoir pris le temps de répondre à ce ques' +
          'tionnaire. Sur la base de vos réponses, le restaurant obtient la n' +
          'ote de :</span>');
        $('.submitButton').on('click', _ => {
          if ( document.getElementById(aLang !== 'fr' ? 'question91' :
            'question92').value !== '') {
            document.getElementById('required').style.display = 'none';
            $('#comment').html('<span lang="en">Thanks for leaving a comment.' +
              '</span><span lang="fr">Merci d\'avoir laissé un commentaire.</' +
              'span>');
          } else {
            document.getElementById('required').style.display = 'block';
          }
          lang(aLang);
        });
        let score = 0;
        for (const PROPERTY in a) score += parseInt(a[PROPERTY]);
        $('#score').html(score / 8 + '/10');
        const COLORS = ['#FFDDBD', '#FCDFBE', '#F9E1BF', '#F6E3C1', '#F4E5C2',
          '#F1E7C4', '#EEE9C5', '#ECEBC6', '#E9EDC8', '#E6EFC9', '#E4F1CB'];
        d3.csv('satisfaction-survey.csv').then(players => {
          // noinspection JSUnresolvedVariable
          new Chart('ctx', {
            type: 'bar',
            data: {
              labels: players.map(d => d.question0).sort((x, y) => x - y),
              datasets: [
                {
                  data: players.map(d => d.score),
                  backgroundColor: players.map(d => COLORS[d.score])
                }
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: aLang === 'fr' ? 'Fréquentation des restau' +
                        'rants chaque mois' : 'Attendance at restaurants each' +
                        ' month',
                    }
                  }
                ],
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: 'Score',
                    }
                  }
                ]
              }
            },
          });
        });
        document.cookie = 'score=' + score / 8 + ';';
        break;
      default:
        break;
    }
    changePageButtons(element.data('to'));
    lang(aLang);
  });
};
