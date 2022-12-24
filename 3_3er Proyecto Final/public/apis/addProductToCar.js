const addProductToCar = (id) => {
  const amount = document.querySelector('#stock').value;

  const url = `../car/${id}/products`;

  const data = {amount};

  postData(url, data)
    .then((res) => console.log(res))
    .then(
      setTimeout(() => {
        window.location.replace('../car/1/products');
      }, 1000)
    )
    .catch((err) => console.log(err));
};

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};
