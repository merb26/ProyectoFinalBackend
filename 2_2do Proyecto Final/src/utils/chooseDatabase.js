const {
  controllerProductsMongodb,
} = require("../../../3_3er Proyecto Final/src/controllers/mongodbProducts")
const {
  controllerProductsFile,
} = require("../controllers/products/fileProducts")
const {
  controllerProductsFirebase,
} = require("../controllers/products/firebaseProducts")

const { controllerCarsFile } = require("../controllers/cars/fileCars")
const { controllerCarsFirebase } = require("../controllers/cars/firebaseCars")
const { controllerCarsMongodb } = require("../controllers/cars/mongodbCars")

let controllerProducts
const db = ["file", "mongodb", "firebase"]

switch (db[1]) {
  case "file":
    controllerProducts = controllerProductsFile
    controllerCars = controllerCarsFile
    break
  case "mongodb":
    controllerProducts = controllerProductsMongodb
    controllerCars = controllerCarsMongodb
    break
  case "firebase":
    controllerProducts = controllerProductsFirebase
    controllerCars = controllerCarsFirebase
    break
}

module.exports = { controllerProducts, controllerCars }
