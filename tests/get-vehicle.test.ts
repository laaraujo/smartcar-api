import client from "../src/integrations/generic-motors/client";
import MockAdapter from "axios-mock-adapter";
import request from "supertest";
import app from "../src/app";
import { mockVehicleInfo, mockVehicleNotFound } from "./mock-data";

const gmClientMock = new MockAdapter(client);

describe("GET /vehicles/:id", () => {
  test("Returns vehicle information", async () => {
    gmClientMock.onPost().reply(200, mockVehicleInfo);
    const expectedResult = {
      vin: mockVehicleInfo.data!.vin.value,
      color: mockVehicleInfo.data!.color.value,
      doorCount: mockVehicleInfo.data!.fourDoorSedan.value == "True" ? 4 : 2,
      driveTrain: mockVehicleInfo.data!.driveTrain.value,
    };
    const res = await request(app).get(`/vehicles/1234`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual(expectedResult);
  });

  test("Returns 404 if vehicle is not found on GM's side", async () => {
    gmClientMock.onPost().reply(200, mockVehicleNotFound);
    const res = await request(app).get(`/vehicles/1234`);
    expect(res.statusCode).toEqual(parseInt(mockVehicleNotFound.status));
    expect(res.body.status).toStrictEqual(parseInt(mockVehicleNotFound.status));
    expect(res.body.description).toStrictEqual(mockVehicleNotFound.reason);
  });
});
