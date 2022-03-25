// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import StoreValidator from "App/Validators/People/User/StoreValidator"

export default class UsersController {
    async index({ request, response }) {
        return response.json({
            status: true,
        })
    }

    async store({ request, response }) {
        const payload = await request.validate(StoreValidator);
        console.log(payload);

        const username = payload.name.slice(0, payload.name.indexOf(' '))

        // Format phone number for whatsapp
        // if (phone.startsWith("+234") && phone[4] != 0) {
        //     phone = phone
        // } else if (phone.startsWith("+234") && phone[4] == 0) {
        //     phone = phone.replace("0", "")
        // } else if (phone.startsWith("0") && phone.length == 11) {
        //     phone = "+234" + phone.substring(1);
        // }
        const user = await User.firstOrCreate({
            name: payload.name,
            username: username,
            email: payload.email,
            phone: payload.phone,
            password: payload.password
        })

        // TODO
        // Send email to activate account
        // click on login link to activate

        return response.json({
            status: true,
            user
        })
    }
}
