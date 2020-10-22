export const next = (id = '') => {
  for (let i = 1; i < 6; i++) document.getElementById('next' + i).style
    .display = 'none';
  if (id) document.getElementById(id).style.display = 'block';
};
