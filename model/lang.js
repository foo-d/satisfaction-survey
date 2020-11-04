export const lang = (aLang = '') => {
  if (aLang === 'fr') {
    /* global $ */
    $('html').attr('lang', 'fr');
    $('[lang="en"]').hide();
    $('[lang="fr"]').show();
    $('#langImg').attr('src', 'img/flag2.png');
    return 'fr';
  } else {
    $('html').attr('lang', 'en');
    $('[lang="fr"]').hide();
    $('[lang="en"]').show();
    $('#langImg').attr('src', 'img/flag1.png');
    return 'en';
  }
};
