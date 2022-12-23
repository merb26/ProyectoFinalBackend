const inputPasswordConf = document.querySelector('#passwordConfirmation');
const inputPassword = document.querySelector('#password');
const spanError = document.querySelector('#error');

inputPasswordConf.addEventListener('change', (event) => {
  if (inputPassword.value == inputPasswordConf.value && inputPassword != '') {
    success();
  } else {
    inputPassword.value = '';
    error();
  }
});

inputPassword.addEventListener('change', (event) => {
  if (inputPassword.value == inputPasswordConf.value && inputPassword != '') {
    success();
  } else {
    inputPasswordConf.value = '';
    error();
  }
});

const error = () => {
  spanError.removeAttribute('hidden');
  spanError.classList.add('text-danger');
  spanError.classList.remove('text-success');
  spanError.innerHTML = 'No coinciden las contraseñas, intente de nuevo.';
};

const success = () => {
  spanError.removeAttribute('hidden');
  spanError.classList.remove('text-danger');
  spanError.classList.add('text-success');
  spanError.innerHTML = 'Perfecto, si coinciden las contraseñas.';
};
