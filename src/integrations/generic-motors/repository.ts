import client from "./client";
import {
  GMDoor,
  GMSecurity,
  GMResponse,
  GMVehicle,
  GMFuelOrBattery,
} from "./types";

export const getVehicle = async (id: string): Promise<GMVehicle> => {
  const payload = { id, responseType: "JSON" };
  const res = await client.post<GMResponse<GMVehicle>>(
    `/getVehicleInfoService`,
    payload
  );
  return res.data.data!;
};

export const getVehicleSecurity = async (id: string): Promise<GMDoor[]> => {
  const payload = { id, responseType: "JSON" };
  const res = await client.post<GMResponse<GMSecurity>>(
    `/getSecurityStatusService`,
    payload
  );
  return res.data.data!.doors.values;
};

export const getVehicleFuelOrBattery = async (
  id: string
): Promise<GMFuelOrBattery> => {
  const payload = { id, responseType: "JSON" };
  const res = await client.post<GMResponse<GMFuelOrBattery>>(
    `/getEnergyService`,
    payload
  );
  return res.data.data!;
};
