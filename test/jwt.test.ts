import { beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import createServer from "../index";
import { sequelize } from "../src/infra/database/models";
import users from "../src/infra/database/models/users";
import authService from "../src/services/jwt";

const app = createServer();

describe.only("Jwt routes", () => {
  describe("Should tests for refresh token", () => {
    beforeAll(async () => {
      const generateToken = await authService.generateRefreshToken("john")

      await users(sequelize).create({
        name: "John",
        username: "john",
        refresh_token: generateToken,
      });

    });

    it("should generate access token", async () => {
      const token = await authService.generateAccessToken("fake_userid");

      expect(token.length).toBeGreaterThanOrEqual(30);
    });

    it("should refresh token check", async () => {
      const token = await authService.generateRefreshToken("fake_userid");
      const { sub } = await authService.validateRefreshToken(token);

      expect(sub).toEqual("fake_userid");
    });

    it("should generate access token and verify", async () => { 
      const token = await authService.generateAccessToken("fake_token");
      const { sub } = await authService.validateAccessToken(token);
      
      expect(!undefined == true).toEqual(sub !== undefined);
    })

    it("Try generate refresh token and verify", async () => {
      const token = await authService.generateRefreshToken("fake_token");
      const { sub } = await authService.validateRefreshToken(token);

      expect(!undefined == true).toEqual(sub !== undefined)
    });

    it("Try refresh token request", async () => {
      const generateRefreshToken = await authService.generateRefreshToken("fake_token")
      const payload = {
        refresh_token: generateRefreshToken
      }
      
      request(app).post(`/auth/refresh`).send(payload).expect(200);
    })

    it("Try refresh token request", async () => {
      let user = await users(sequelize).findOne({ where: { username: "john" } })
      
      const payload = {
        refresh_token: user?.getRefreshToken(),
      };

      request(app).post(`/auth/refresh`).send(payload).expect(200);
    });
  });
});
