import {
  GMDoor,
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
