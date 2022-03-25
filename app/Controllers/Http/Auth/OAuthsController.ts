// import { Exception } from '@adonisjs/core/build/standalone';
// import { validator } from './../../../../config/app';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import LoginValidator from "App/Validators/Auth/LoginValidator";
import CtxExtendContract from "Contracts/ctxExtend";


class OAuthsController {
    async login({ auth, request, response, validator }) {
        // const { username, password, email } = await validator.validate({
        //     // email: validator.schema.string(),
        //     username: validator.schema.string(),
        //     password: validator.schema.string(),
        // })
        const payload = await request.validate(LoginValidator);
        
        try {
            await User.query()
                // .where("active", true)
                .where("email", payload.username)
                .orWhere("username", payload.username)
                .firstOrFail();

                // console.log(x);

        } catch (error) {
            // throw new Exception()
            console.log(error);
        }
        console.log("token_________")
        console.log(payload.password)
        const token = await auth.use('api').attempt(payload.username, payload.password);
        console.log(token)
        
        response.json({
            status: true,
            token,
        });
    }
}

module.exports = OAuthsController;
