import { validator } from './../../../../config/app';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

class OAuthsController {
    async login({ request, response, validator }) {
        const { username, password } = await validator.validate({
            username: validator.schema.string(),
            password: validator.schema.string(),
        })
        console.log(username, password);

        response.json({
            status: true,
        })
    }
}

module.exports = OAuthsController;
