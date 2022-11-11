const info = JSON.parse(localStorage.getItem("user"))

document.querySelector("#email").innerHTML = info[0]
document.querySelector("#name").innerHTML = info[1]
document.querySelector("#address").innerHTML = info[2]
document.querySelector("#phone").innerHTML = info[3]
