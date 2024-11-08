import { Request, NextFunction, Response } from "express";
import * as gm from "../integrations/generic-motors/repository";
import { Door, Vehicle } from "./types";

export const getVehicle = async (
  req: Request<{ id: string }>,
  res: Response<Vehicle>,
  next: NextFunction
) => {
  try {
    const vehicle = await gm.getVehicle(req.params.id);
    res.send({
      vin: vehicle.vin.value,
      color: vehicle.color.value,
      doorCount: vehicle.fourDoorSedan.value == "True" ? 4 : 2,
      driveTrain: vehicle.driveTrain.value,
    });
  } catch (err) {
    next(err);
  }
};

export const getVehicleDoors = async (
  req: Request<{ id: string }>,
  res: Response<Door[]>,
  next: NextFunction
) => {
  try {
    const security = await gm.getVehicleSecurity(req.params.id);
    const doors = security.map((door) => ({
      location: door.location.value,
      locked: door.locked.value == "True",
    }));
    res.send(doors);
  } catch (err) {
    next(err);
  }
};
