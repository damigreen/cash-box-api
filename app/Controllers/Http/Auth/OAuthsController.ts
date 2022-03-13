// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

class OAuthsController {
    async login({ request, response }) {


        console.log("request+++++++++++++")
        console.log("request+++++++++++++")
        console.log(request)
        response.json({
            status: true,
        })
    }
}

module.exports = OAuthsController;
