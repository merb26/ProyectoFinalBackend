const imagen = document.querySelector(".information__avatar")
const valueImg = imagen.getAttributeNode("src").value

const info = document.querySelectorAll(".info")

const infoArray = []
info.forEach(val => {
  infoArray.push(val.innerHTML)
})

infoArray.push(valueImg)

localStorage.setItem("user", JSON.stringify(infoArray))
