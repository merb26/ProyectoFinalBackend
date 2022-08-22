const btnUpdate = e => {
  const id = document.querySelector("#id").value
  const timestamp = new Date()
  const name = document.querySelector("#name").value
  const description = document.querySelector("#description").value
  const code = document.querySelector("#code").value
  const urlPicture = document.querySelector("#urlPicture").value
  const price = document.querySelector("#price").value
  const stock = document.querySelector("#stock").value

  const product = {
    timestamp,
    name,
    description,
    code,
    urlPicture,
    price,
    stock,
  }

  const fetchPUT = {
    method: "PUT",
    body: JSON.stringify(product),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }

  fetch(`/api/products/${id}`, fetchPUT).then(alert("Ha actualizado con éxito"))

  return false
}
