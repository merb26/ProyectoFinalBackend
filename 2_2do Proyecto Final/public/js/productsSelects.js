const btnRemove = index => {
  const id = document.querySelector(`#id${index}`).value

  const fetchDELETE = {
    method: "DELETE",
  }

  fetch(`/api/car/1/products/${id}`, fetchDELETE).then(
    setTimeout(() => {
      location.reload()
    }, 500)
  )
}

const btnRemoveCar = () => {
  const fetchDELETE = {
    method: "DELETE",
  }

  fetch(`/api/car/1`, fetchDELETE).then(
    setTimeout(() => {
      location.reload()
    }, 500)
  )
}
