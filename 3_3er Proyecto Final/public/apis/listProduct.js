const btnRemove = (e, index) => {
  const id = document.querySelector(`#id${index}`)
  const fetchDELETE = {
    method: "DELETE",
  }

  fetch(`/products/${id.value}`, fetchDELETE).then(
    setTimeout(() => {
      location.reload()
    }, 500)
  )
}
