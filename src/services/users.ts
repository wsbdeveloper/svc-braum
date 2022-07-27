import Users from "./../infra/database/models/users"
import { sequelize } from "./../infra/database/models/index"


type User = {
    username: string,
    name: string,
    password: string,
    email: string,
    refresh_token: string
}


class UsersService { 
    async create(user: User) {
        try {
            return await (await Users(sequelize).create(user)).toJSON()
        } catch (err) { 
            throw new Error("Erro in create users!" + err)
        }
    }
}

export default new UsersService();