import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.get("/:id", controllers.getVehicle);

export default router;
