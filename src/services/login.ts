
import bcrypt from "bcrypt"
import console from "console"
import { sequelize } from "./../infra/database/models/index"
import Users from "./../infra/database/models/users"
import { authService } from "./jwt"

type UserBody = {
    username: string,
    password: string
}

class LoginService { 
    async login(userBody: UserBody) {
        const { username, password } = userBody;
        
        const userAuth = await Users(sequelize).findOne({ where: { username } })
        const user = await userAuth?.toJSON()
        const verify = await bcrypt.compare(password, user.password);
        console.log(verify)
        
        if (verify) {
            const token = await authService.generateAccessToken(
                user.name
            );
            
            return {
                ...user,
                token,
            };
        }
    }
}

export default new LoginService()