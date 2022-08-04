import { sequelize } from "./../infra/database/models/index";
import Users from "./../infra/database/models/users";

import bcrypt from "bcrypt";
import console from "console";

type User = {
  id?: string;
  username: string;
  name: string;
  password: string;
  email: string;
  refresh_token: string;
};

type UserDeleteParams = {
    id: string;
}


class UsersService {
  async create(user: User) {
    try {
      const salt = await bcrypt.genSalt(10);

      //Hash generate
      const hash = await bcrypt.hash(user.password, salt);

      const verifyEmail = await Users(sequelize).findOne({
        where: { email: user.email },
      });

      const userFind = verifyEmail?.toJSON();

      if (userFind?.email || userFind?.username) {
        throw Error("Email or Username already!");
      }

      if (userFind !== undefined) {
        console.log("aquii");
        throw Error("User is up in up4tech, Try other data for your user.");
      }

      user.password = hash;

      return await Users(sequelize).create({ ...user });
    } catch (error) {
      throw new Error("Erro in create users!" + error);
    }
  }

  async userOne(user: User) {
    try {
      return await Users(sequelize).findOne({
        where: { id: user.id },
      });
    } catch (error) {
      throw new Error("Erro in find user!" + error);
    }
  }

  async update(user: User) {
    try {
      return await Users(sequelize).update(
        {
          name: user.name,
          email: user.email,
          username: user.username
        },
        {
          where: { id: user.id },
        }
      );

    } catch (error) {
      throw new Error("Erro in find user!" + error);
    }
  }

  async delete(user: UserDeleteParams) {
    try {
      return await Users(sequelize).destroy({ where: { id: user.id } });
    } catch (error) {
      throw new Error("Erro in find user!" + error);
    }
  }
}

export default new UsersService();