import { z } from "zod";

export const EngineActionSchema = z.object({
  action: z.enum(["START", "STOP"]),
});

export type ReqParams = {
  id: string;
};

export type StartOrStopEngineReqBody = z.infer<typeof EngineActionSchema>;

export type Vehicle = {
  vin: string;
  color: string;
  doorCount: number;
  driveTrain: string;
};

export type Door = {
  location: string;
  locked: boolean;
};

export type FuelOrBattery = {
  percent: number;
};

export type EngineActionResult = {
  status: "success" | "error";
};
