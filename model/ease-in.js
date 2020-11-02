export const easeIn = _ => {
  document.getElementById('home').style.marginRight= '0';
  document.getElementById('home').style.marginLeft= '3840px';
  anime({
    targets: '#home',
    'margin-left': '0',
    easing: 'easeInOutBack'
  });
};
