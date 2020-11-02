export const lang = (aLang = '') => {
  if (aLang === 'fr') {
    /* global $ */
    $('html').attr('lang', 'fr');
    $('[lang="en"]').hide();
    $('[lang="fr"]').show();
    $('#langImg').attr('src', 'img/1920px-Flag_of_the_United_Kingdom.svg.png');
    return 'fr';
  } else {
    $('html').attr('lang', 'en');
    $('[lang="fr"]').hide();
    $('[lang="en"]').show();
    $('#langImg').attr('src', 'img/1920px-Flag_of_France.svg.png');
    return 'en';
  }
};
