import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import { uuid } from "uuidv4";
import createServer from "../index";

const app = createServer();

const UUID = uuid();

describe("Users CRUD", () => {
  it("should create users", (done) => {
    let payload = {
      id: UUID,
      name: "John",
      email: "john@fake.com",
      password: "0101",
      refresh_token: "refresh",
      username: "john",
    };

    request(app)
      .post(`/users`)
      .send(payload)
      .expect(200)
      .end(() => {
        done();
      });
  });

  it("should update fields user", (done) => {
    let payload = {
      id: UUID,
      username: "wsbltx",
      email: "fuuulano@hotgmail.com",
      password: "1234123",
    };

    request(app)
      .patch(`/users`)
      .send(payload)
      .expect(200)
      .end(() => {
        done();
      });
  });

  it("should update fields user by id, username and email", (done) => {
    
    let id = UUID
    let payload = {
      id,
      username: "wsbltx",
      email: "fuuulano@hotgmail.com",
      password: "1234123",
    };

    request(app)
      .patch(`/users/${id}`)
      .send(payload)
      .expect(200)
      .end(() => {
        done();
      });
  });

  it("should find one user", (done) => {
    let payload = {
      id: UUID,
      name: "John",
      email: "john@fake.com",
      refresh_token: "refresh",
      username: "john",
    };

    request(app)
      .patch("/users")
      .send(payload)
      .expect(200)
      .end(() => {
        done();
      });
  });

  it("should delete user", async () => {
    const response = await request(app).delete(`/users/${UUID}`).expect(200);

    expect(response.body).toEqual(1);
  });
});
