import * as Jest from "@jest/globals";
import request from "supertest";
import createServer from "../index";

const app = createServer()

Jest.describe("Login routes", () => {
  Jest.it("success create user", (done) => {
    let payload = {
      username: "wsbltx",
      password: "1234123",
    };
      
    request(app).post(`/login`).send(payload).expect(200);
    done();
  });
});
