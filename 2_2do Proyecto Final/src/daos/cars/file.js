const Container = require("../../containers/file")

class CarsDaoFile extends Container {
  constructor() {
    const fileURL = "../../dbs/car.json"
    super(fileURL)
  }
}

module.exports = CarsDaoFile
