const info = document.querySelectorAll('.info');

const infoArray = [];
info.forEach((val) => {
  infoArray.push(val.innerHTML);
});

localStorage.setItem('user', JSON.stringify(infoArray));
