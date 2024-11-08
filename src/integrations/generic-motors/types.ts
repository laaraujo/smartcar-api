type GMString = {
  type: "String";
  value: string;
};

type GMNumber = {
  type: "Number";
  value: string;
};

type GMNullable = {
  type: "Null";
  value: "null";
};

type GMBoolean = {
  type: "Boolean";
  value: "True" | "False";
};

export type GMDoor = {
  location: GMString;
  locked: GMBoolean;
};

export type GMDoors = {
  doors: {
    type: "Array";
    values: GMDoor[];
  };
};

export type GMVehicle = {
  vin: GMString;
  color: GMString;
  fourDoorSedan: GMBoolean;
  twoDoorCoupe: GMBoolean;
  driveTrain: GMString;
};

export type GMFuelOrBattery = {
  tankLevel: GMNumber | GMNullable;
  batteryLevel: GMNumber | GMNullable;
};

export type GMEngineActionResult = {
  status: "EXECUTED" | "FAILED";
};

export type GMResponse<
  T = GMDoors | GMVehicle | GMFuelOrBattery | GMEngineActionResult
> = {
  service?: string;
  status: string;
  data?: T;
  actionResult?: string;
  reason?: string;
};
