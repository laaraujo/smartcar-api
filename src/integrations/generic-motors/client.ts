import axios, { AxiosResponse } from "axios";
import env from "../../env";
import { GMResponse } from "./types";
import { GMError } from "./errors";

const client = axios.create({
  baseURL: env.GM_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const gmResponseInterceptor = (response: AxiosResponse) => {
  const data: GMResponse = response.data;

  if (data.status != "200") {
    throw new GMError(data.status, data.reason || "Generic Motos API Error");
  }

  return response;
};

client.interceptors.response.use(gmResponseInterceptor);

export default client;
