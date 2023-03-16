import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { uuid } from "uuidv4";
import createServer from "../index";
import jwt from "../src/services/jwt";

const app = createServer();

const UUID = uuid();

describe("Should test session function", () => {
  beforeAll(async () => {
    // given
    let payload = {
      id: UUID,
      name: "John",
      email: "john@fake.com",
      password: "0101",
      refresh_token: "refresh",
      username: "john",
    };

    await request(app).post(`/users`).send(payload).expect(200);
  });

  it("Should request for session is already up", async () => {
    const tokenGenerate = await jwt.generateAccessToken("john");

    await request(app)
      .get(`/auth/session`)
      .set("Accept", "application/json")
      .set("Authorization", tokenGenerate)
      .expect(200);
  });

  it("Should exception for user not exists", async () => {
    const tokenGenerate = await jwt.generateAccessToken("fakeeee");

    await request(app)
      .get(`/auth/session`)
      .set("Accept", "application/json")
      .set("Authorization", tokenGenerate)
      .expect(400);
  });

  it("Should request for session with roles valid type user exception", async () => {
    const tokenGenerate = await jwt.generateAccessToken("fakee");

    const response = await request(app)
      .get(`/auth/session`)
      .set("Accept", "application/json")
      .set("Authorization", tokenGenerate)
      .expect(400);

    expect(response.body.error).toEqual(400);
  });

  it("Should request for session with roles valid type user", async () => {
    const tokenGenerate = await jwt.generateAccessToken("john");

    const response = await request(app)
      .get(`/auth/session`)
      .set("Accept", "application/json")
      .set("Authorization", tokenGenerate)
      .expect(200);

    expect(response.body.data.roles[0]).toEqual("user");
  });

  afterAll(async () => {
    const response = await request(app).delete(`/users/${UUID}`).expect(200);

    expect(response.body).toEqual(1);
  });
});
