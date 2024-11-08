import {
  GMFuelOrBattery,
  GMResponse,
  GMSecurity,
  GMVehicle,
} from "../src/integrations/generic-motors/types";

export const mockVehicleInfo: GMResponse<GMVehicle> = {
  service: "getVehicleInfo",
  status: "200",
  data: {
    vin: {
      type: "String",
      value: "123123412412",
    },
    color: {
      type: "String",
      value: "China Blue",
    },
    fourDoorSedan: {
      type: "Boolean",
      value: "True",
    },
    twoDoorCoupe: {
      type: "Boolean",
      value: "False",
    },
    driveTrain: {
      type: "String",
      value: "v8",
    },
  },
};

export const mockVehicleNotFound: GMResponse = {
  status: "404",
  reason: "Vehicle id: 1233 not found.",
};

export const mockVehicleSecurity: GMResponse<GMSecurity> = {
  service: "getSecurityStatus",
  status: "200",
  data: {
    doors: {
      type: "Array",
      values: [
        {
          location: {
            type: "String",
            value: "frontRight",
          },
          locked: {
            type: "Boolean",
            value: "True",
          },
        },
        {
          location: {
            type: "String",
            value: "frontLeft",
          },
          locked: {
            type: "Boolean",
            value: "False",
          },
        },
      ],
    },
  },
};

export const mockVehicleFuel: GMResponse<GMFuelOrBattery> = {
  service: "getEnergy",
  status: "200",
  data: {
    tankLevel: {
      type: "Number",
      value: "19.92",
    },
    batteryLevel: {
      type: "Null",
      value: "null",
    },
  },
};

export const mockVehicleBattery: GMResponse<GMFuelOrBattery> = {
  service: "getEnergy",
  status: "200",
  data: {
    tankLevel: {
      type: "Null",
      value: "null",
    },
    batteryLevel: {
      type: "Number",
      value: "23.88",
    },
  },
};
