const btnUpdate = () => {
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
    headers: {
      Accept: " application/json ",
      "Content-Type": " application/json ",
    },
  }

  fetch(`/products/${id}`, fetchPUT)
    .then(res => res.json())
    .then(res => {
      alert(JSON.stringify(res))
      window.location.replace("/products")
    })
}
