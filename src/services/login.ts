
import Users from "./../infra/database/models/users"
import { sequelize } from "./../infra/database/models/index"


type UserBody = {
    username: string,
    password: string
}

class LoginService { 
    async login(userBody: UserBody) {
        const { username, password } = userBody;
        const user = await Users(sequelize).findOne({ where: { username, password } })
        
        if (user) { 
            console.log("User valid!" +  user)
        }
    }
};