const fetchDELETE = {
  method: 'DELETE',
};

const btnRemove = (index) => {
  const id = document.querySelector(`#id${index}`).value;

  fetch(`/car/1/products/${id}`, fetchDELETE).then(
    setTimeout(() => {
      location.reload();
    }, 500)
  );
};

const btnRemoveCar = () => {
  fetch(`/car/1`, fetchDELETE).then(
    setTimeout(() => {
      location.reload();
    }, 500)
  );
};
