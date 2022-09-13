const ContainerCars = require("../../containers/firebase/carsFirebase")
class CarsDaoFirebase extends ContainerCars {
  constructor() {
    super("cars")
  }
}

module.exports = { CarsDaoFirebase }
