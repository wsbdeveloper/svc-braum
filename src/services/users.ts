import Users from "./../infra/database/models/users"
import { sequelize } from "./../infra/database/models/index"

import bcrypt from "bcrypt"

type User = {
  id?: string;
  username: string;
  name: string;
  password: string;
  email: string;
  refresh_token: string;
};


class UsersService {
  async create(user: User) {
      try {
        const salt = await bcrypt.genSalt(10);

        //Hash generate
        const hash = await bcrypt.hash(user.password, salt);

        const isUp = await Users(sequelize).findOne({
          where: { email: user.email },
        });
          
        user.password = hash
          
        if (isUp !== null) { 
            throw Error("User is up in up4tech!")
        }
          
        return (await Users(sequelize).create({ ...user }))
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
      return await await Users(sequelize).findByPk(user.id);
    } catch (error) {
      throw new Error("Erro in find user!" + error);
    }
  }

  async delete(user: User) {
    try {
        return await await Users(sequelize).destroy({ where: { id: user.id} });
    } catch (error) {
      throw new Error("Erro in find user!" + error);
    }
  }
}

export default new UsersService();