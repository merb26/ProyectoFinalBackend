const btnUpdateCar = () => {
  const id = document.querySelector('#id').value;
  const timestamp = new Date();
  const name = document.querySelector('#name').value;
  const description = document.querySelector('#description').value;
  const code = document.querySelector('#code').value;
  const urlPicture = document.querySelector('#urlPicture').value;
  const price = document.querySelector('#price').value;
  const amount = document.querySelector('#amount').value;

  const productUpdate = {
    timestamp,
    name,
    description,
    code,
    urlPicture,
    price,
    amount,
  };

  const fetchPUT = {
    method: 'PUT',
    body: JSON.stringify({productUpdate}),
    headers: {
      Accept: ' application/json ',
      'Content-Type': ' application/json ',
    },
  };

  fetch(`/car/${id}`, fetchPUT)
    .then((res) => res.json())
    .then((res) => {
      window.location.replace('/car/1/products');
    });
};
