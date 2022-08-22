const btnRemove = (e, id) => {
  const fetchDELETE = {
    method: "DELETE",
  }

  fetch(`/api/products/${id}`, fetchDELETE).then(
    setTimeout(() => {
      location.reload()
    }, 500)
  )
}
