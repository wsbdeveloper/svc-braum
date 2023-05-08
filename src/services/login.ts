import bcrypt from "bcrypt";
import { sequelize } from "./../infra/database/models/index";
import Users from "./../infra/database/models/users";
import authService from "./jwt";

type UserBody = {
  username: string;
  password: string;
};

class LoginService {
  async login(userBody: UserBody) {
    // Refactor for Bean or Decorator for extract credentials the 
    
    const { username, password } = userBody;
    const userAuth = await Users(sequelize).findOne({ where: { username } });
    const user = await userAuth?.toJSON();
    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      throw new Error("User credentials not valid!");
    }

    const token = await authService.generateAccessToken(user.username);
    const refresh_token = await authService.generateRefreshToken(user.username);

    userAuth?.set("refresh_token", refresh_token);
    userAuth?.save();

    return {
      ...user,
      refresh_token,
      token,
    };
  }
}

export default new LoginService();
