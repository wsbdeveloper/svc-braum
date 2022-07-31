import Users from "./../infra/database/models/users"
import { sequelize } from "./../infra/database/models/index"


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
      return await (await Users(sequelize).create(user)).toJSON();
    } catch (error) {
      throw new Error("Erro in create users!" + error);
    }
  }

  async userOne(user: User) {
    try {
      return await await Users(sequelize).findOne({
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