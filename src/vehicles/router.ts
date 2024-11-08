import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.get("/:id", controllers.getVehicle);
router.get("/:id/doors", controllers.getVehicleDoors);
router.get("/:id/fuel", controllers.getVehicleFuel);
router.get("/:id/battery", controllers.getVehicleBattery);

export default router;
