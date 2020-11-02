export const displayRequired = (id = '') => {
  document.getElementById('required').style.display = 'none';
  document.getElementById('requiredEmail').style.display = 'none';
  document.getElementById('requiredPhoneNumber').style.display = 'none';
  if (id !== '') document.getElementById(id).style.display = 'block';
};
