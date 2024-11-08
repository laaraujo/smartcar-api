import { Request, NextFunction, Response } from "express";
import * as gm from "../integrations/generic-motors/repository";
import {
  Door,
  FuelOrBattery,
  Vehicle,
  ReqParams,
  StartOrStopEngineReqBody,
  EngineActionSchema,
  EngineActionResult,
} from "./types";
import { NonElectricVehicleError, NonFuelVehicleError } from "./errors";
import { z } from "zod";

export const getVehicle = async (
  req: Request<ReqParams>,
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
  req: Request<ReqParams>,
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

export const getVehicleFuel = async (
  req: Request<ReqParams>,
  res: Response<FuelOrBattery>,
  next: NextFunction
) => {
  try {
    const fuel = await gm.getVehicleFuelOrBattery(req.params.id);
    if (fuel.tankLevel.type == "Null") throw new NonFuelVehicleError();
    res.send({ percent: parseFloat(fuel.tankLevel.value) });
  } catch (err) {
    next(err);
  }
};

export const getVehicleBattery = async (
  req: Request<ReqParams>,
  res: Response<FuelOrBattery>,
  next: NextFunction
) => {
  try {
    const fuel = await gm.getVehicleFuelOrBattery(req.params.id);
    if (fuel.batteryLevel.type == "Null") throw new NonElectricVehicleError();
    res.send({ percent: parseFloat(fuel.batteryLevel.value) });
  } catch (err) {
    next(err);
  }
};

export const startOrStopVehicleEngine = async (
  req: Request<ReqParams, {}, StartOrStopEngineReqBody>,
  res: Response<EngineActionResult>,
  next: NextFunction
) => {
  try {
    const validation = EngineActionSchema.safeParse(req.body);
    if (!validation.success) {
      throw validation.error;
    }
    const result = await gm.startOrStopVehicleEngine(
      req.params.id,
      req.body.action
    );

    res.send({
      status: result.status == "EXECUTED" ? "success" : "error",
    });
  } catch (err) {
    next(err);
  }
};
