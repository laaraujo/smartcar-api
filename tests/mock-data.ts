import { GMResponse, GMVehicle } from "integrations/generic-motors/types";

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
