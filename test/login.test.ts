import * as Jest from "@jest/globals"
import request from "supertest"
import app from "../index"

Jest.describe("Login routes", () => { 
    Jest.it("should login success", async () => { 
        let username = "wsbltx"
        let password = "1234123"

        const res = await request(app)
          .post("/login")
            .send({ username, password });

        Jest.expect(res.body.username).toEqual(username);
    })
})