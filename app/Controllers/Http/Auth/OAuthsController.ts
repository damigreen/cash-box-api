// import { Exception } from '@adonisjs/core/build/standalone';
// import { validator } from './../../../../config/app';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import CtxExtendContract from "Contracts/ctxExtend";


class OAuthsController {
    async login({ auth, request, response, validator }: CtxExtendContract) {
        const { username, password, email } = await validator.validate({
            // email: validator.schema.string(),
            username: validator.schema.string(),
            password: validator.schema.string(),
        })

        console.log(username, password);

        
        try {
            const x = await User.query()
                // .where("active", true)
                .where("email", username)
                .orWhere("username", username)
                .firstOrFail();

                console.log(x);

        } catch (error) {
            // throw new Exception()
            console.log(error);
        }
        const token = await auth.use('api').attempt(email, password);
        
        response.json({
            status: true,
            token,
        });
    }
}

module.exports = OAuthsController;
