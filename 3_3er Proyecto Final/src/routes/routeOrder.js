import { Router } from "express"
export const routeOrder = Router()

import { controllerCars } from "../controllers/mongodbCars.js"
import { loginMongodb } from "../controllers/login.js"

routeOrder.get("/:id", loginMongodb.authentic, controllerCars.getOrder)
