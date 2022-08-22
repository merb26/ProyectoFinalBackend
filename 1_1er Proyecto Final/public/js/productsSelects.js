const btnRemove = (e, id) => {
  const fetchDELETE = {
    method: "DELETE",
  }

  fetch(`/api/car/1/products/${id}`, fetchDELETE).then(
    setTimeout(() => {
      location.reload()
    }, 500)
  )
}
