export const radio = element => {
  const RADIO = document.getElementsByClassName(element[0].className);
  for (let i = 0; i < RADIO.length; i++) RADIO[i].style.borderColor =
    'transparent';
  document.getElementById(element[0].id).style.borderColor = '#000000';
  return element.data('index');
};
