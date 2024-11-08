import client from "../src/integrations/generic-motors/client";
import MockAdapter from "axios-mock-adapter";
import request from "supertest";
import app from "../src/app";
import {
  mockVehicleNotFound,
  mockVehicleFuel,
  mockVehicleBattery,
} from "./mock-data";
import { NonElectricVehicleError } from "../src/vehicles/errors";

const gmClientMock = new MockAdapter(client);

describe("GET /vehicles/:id/battery", () => {
  test("Returns vehicle's fuel tank information", async () => {
    gmClientMock.onPost().reply(200, mockVehicleBattery);
    const expectedResult = {
      percent: parseFloat(mockVehicleBattery.data!.batteryLevel.value),
    };
    const res = await request(app).get(`/vehicles/1234/battery`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual(expectedResult);
  });

  test("Returns 404 if vehicle is not found on GM's side", async () => {
    gmClientMock.onPost().reply(200, mockVehicleNotFound);
    const res = await request(app).get(`/vehicles/1234/battery`);
    expect(res.statusCode).toEqual(parseInt(mockVehicleNotFound.status));
    expect(res.body.status).toStrictEqual(parseInt(mockVehicleNotFound.status));
    expect(res.body.description).toStrictEqual(mockVehicleNotFound.reason);
  });

  test("Returns 422 if vehicle is NOT electric", async () => {
    gmClientMock.onPost().reply(200, mockVehicleFuel);
    const res = await request(app).get(`/vehicles/1234/battery`);
    const customError = new NonElectricVehicleError();
    expect(customError.statusCode).toEqual(422);
    expect(customError.message).toEqual(
      "This operation only supports electric vehicles"
    );
    expect(res.statusCode).toEqual(customError.statusCode);
    expect(res.body.status).toEqual(customError.statusCode);
    expect(res.body.description).toStrictEqual(customError.message);
  });
});
