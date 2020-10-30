export const changePageButtons = index => {
  for (let i = 1; i < 3; i++) document.getElementById('previous' + i).style
    .display = 'none';
  for (let i = 1; i < 6; i++) document.getElementById('next' + i).style
    .display = 'none';
  if (index - 1 > 0 && index - 1 < 3) document.getElementById('previous' +
    (index - 1)).style.display = 'block';
  document.getElementById('next' + (index + 1)).style.display = 'block';
};
