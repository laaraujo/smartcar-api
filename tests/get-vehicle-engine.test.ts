import client from "../src/integrations/generic-motors/client";
import MockAdapter from "axios-mock-adapter";
import request from "supertest";
import app from "../src/app";
import {
  mockSuccessfulEngineAction,
  mockFailedEngineAction,
  mockVehicleNotFound,
} from "./mock-data";

const gmClientMock = new MockAdapter(client);

describe("GET /vehicles/:id/engine", () => {
  const endpoint = "/vehicles/1234/engine";

  describe("With action: 'START'", () => {
    const payload = { action: "START" };

    test("Returns 'success' and 200", async () => {
      gmClientMock.onPost().reply(200, mockSuccessfulEngineAction);
      const expectedResult = { status: "success" };
      const res = await request(app).post(endpoint).send(payload);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toStrictEqual(expectedResult);
    });

    test("Returns 'error' and 200", async () => {
      gmClientMock.onPost().reply(200, mockFailedEngineAction);
      const expectedResult = { status: "error" };
      const res = await request(app).post(endpoint).send(payload);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toStrictEqual(expectedResult);
    });
  });

  describe("With action: 'STOP'", () => {
    const payload = { action: "STOP" };
    test("Returns 'success' and 200", async () => {
      gmClientMock.onPost().reply(200, mockSuccessfulEngineAction);
      const expectedResult = { status: "success" };
      const res = await request(app).post(endpoint).send(payload);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toStrictEqual(expectedResult);
    });

    test("Returns 'error' and 200", async () => {
      gmClientMock.onPost().reply(200, mockFailedEngineAction);
      const expectedResult = { status: "error" };
      const res = await request(app).post(endpoint).send(payload);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toStrictEqual(expectedResult);
    });
  });

  test("Returns 404 if vehicle is not found on GM's side", async () => {
    gmClientMock.onPost().reply(200, mockVehicleNotFound);
    const res = await request(app).post(endpoint).send({ action: "START" });
    expect(res.statusCode).toEqual(parseInt(mockVehicleNotFound.status));
    expect(res.body.status).toStrictEqual(parseInt(mockVehicleNotFound.status));
    expect(res.body.description).toStrictEqual(mockVehicleNotFound.reason);
  });

  test("Returns 500 when 'action' is not in the request's body", async () => {
    const res = await request(app).post(endpoint);
    expect(res.statusCode).toEqual(500);
    expect(res.body.status).toEqual(500);
    expect(res.body.description).toStrictEqual([
      {
        expected: "'START' | 'STOP'",
        received: "undefined",
        code: "invalid_type",
        path: ["action"],
        message: "Required",
      },
    ]);
  });

  test("Returns 500 with invalid 'action'", async () => {
    const invalidAction = "TEST";
    const res = await request(app)
      .post(endpoint)
      .send({ action: invalidAction });
    expect(res.statusCode).toEqual(500);
    expect(res.body.status).toEqual(500);
    expect(res.body.description).toStrictEqual([
      {
        received: invalidAction,
        code: "invalid_enum_value",
        options: ["START", "STOP"],
        path: ["action"],
        message: `Invalid enum value. Expected 'START' | 'STOP', received '${invalidAction}'`,
      },
    ]);
  });
});
