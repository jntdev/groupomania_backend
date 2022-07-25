import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import StoreUserValidator from "App/Validators/Auth/StoreUserValidator"
import User from "App/Models/User"
import LoginValidator from "App/Validators/Auth/LoginValidator"
import UpdateUserValidator from 'App/Validators/Auth/UpdateUserValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreUserValidator)
    const user = await User.create(payload)
    console.log(response)
    return response.created({ user }) // 201 CREATED
    //Trouver comment generer un token pour log.
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)
    const token = await auth.attempt(email, password)
    const user = auth.user!
    console.log(response)
    return response.ok({
      "token": token,
      ...user.serialize(),
    })
  }

  public async me({ auth, response }: HttpContextContract) {
    return response.ok(auth.user)
  }

  public async getAll({ response }: HttpContextContract) {
    const allUser = await Database.query().from('users').select('*')
    return response.ok(allUser)
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateUserValidator)
    const user = await auth.user!.merge(payload).save()
    return response.ok(user) // 200 OK
  }

}
