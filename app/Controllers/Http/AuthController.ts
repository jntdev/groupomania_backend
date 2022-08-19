import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import StoreUserValidator from "App/Validators/Auth/StoreUserValidator"
import User from "App/Models/User"
import LoginValidator from "App/Validators/Auth/LoginValidator"

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreUserValidator)
    const user = await User.create(payload)
    return response.created({ user })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)
    const token = await auth.use('api').attempt(email, password)
    const user = auth.user!
    return response.ok({
      "token": token.token,
      "user": {
        "id": user.id,
        "email": user.email,
        "is_admin": user.is_admin
      }
    })
  }

  public async checkifican({ auth, params, response }: HttpContextContract) {
    await auth.use('api').logout()
    await auth.use('api').loginViaId(params.id)
    const token = await auth.use('api').loginViaId(params.id)
    console.log(token.token)
    console.log(auth.user?.$attributes)
    return response.ok({
      "isAdmin": auth.user?.$attributes.is_admin,
      "id": auth.user?.$attributes.id,
      "token": token.token
    })
  }
}
