import { describe, it } from "@jest/globals";
import request from "supertest";
import createServer from "../index";

const app = createServer();

describe("Login routes", () => {
  describe("given the product does not exist", () => {
    it("success login", (done) => {
      let payload = {
        username: "wsbltx",
        password: "1234123",
      };

      request(app)
        .post(`/login`)
        .send(payload)
        .expect(200)
        .end(() => {
          done();
        });
    });
  });
});
