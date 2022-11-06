import { Router } from "express"
export const routeOrder = Router()

import { controllerCars } from "../controllers/mongodbCars.js"

routeOrder.get("/", controllerCars.getOrder)
