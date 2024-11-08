import client from "./client";
import { GMResponse, GMVehicle } from "./types";

export const getVehicle = async (id: string): Promise<GMVehicle> => {
  const payload = { id, responseType: "JSON" };
  const res = await client.post<GMResponse<GMVehicle>>(
    `/getVehicleInfoService`,
    payload
  );
  return res.data.data!;
};
