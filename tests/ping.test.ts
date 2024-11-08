import request from "supertest";
import app from "../src/app";

describe("GET /ping", () => {
  test("Returns 'pong' and 200", async () => {
    const res = await request(app).get(`/ping`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toStrictEqual("pong");
  });
});
