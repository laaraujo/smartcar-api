import client from "../src/integrations/generic-motors/client";
import MockAdapter from "axios-mock-adapter";
import request from "supertest";
import app from "../src/app";
import { mockVehicleNotFound, mockVehicleSecurity } from "./mock-data";

const gmClientMock = new MockAdapter(client);

describe("GET /vehicles/:id/doors", () => {
  test("Returns vehicle's door lock information", async () => {
    gmClientMock.onPost().reply(200, mockVehicleSecurity);
    const expectedResult = mockVehicleSecurity.data!.doors.values.map(
      (door) => ({
        location: door.location.value,
        locked: door.locked.value == "True",
      })
    );
    const res = await request(app).get(`/vehicles/1234/doors`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual(expectedResult);
  });

  test("Returns 404 if vehicle is not found on GM's side", async () => {
    gmClientMock.onPost().reply(200, mockVehicleNotFound);
    const res = await request(app).get(`/vehicles/1234/doors`);
    expect(res.statusCode).toEqual(parseInt(mockVehicleNotFound.status));
    expect(res.body.status).toStrictEqual(parseInt(mockVehicleNotFound.status));
    expect(res.body.description).toStrictEqual(mockVehicleNotFound.reason);
  });
});
