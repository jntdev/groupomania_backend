import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import StorePostValidator from 'App/Validators/Posts/StorePostValidator'
import UpdatePostValidator from 'App/Validators/Posts/UpdatePostValidator'

export default class TasksController {
  public async index({ response }: HttpContextContract) {
    const posts = await Post.all()
    console.log(posts)
    return response.ok(posts)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StorePostValidator)
    console.log(payload)
    const post = await Post.create(payload)
    return response.created(post)
  }

  public async show({ response, params }: HttpContextContract) {
    console.log(params)
    const post = await Post.findOrFail(params.id)
    console.log(post.content)
    return response.ok(post)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const payload = await request.validate(UpdatePostValidator)
    post.merge(payload).save()
    return response.ok(post)
  }

  public async destroy({ response, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    post.delete()
    return response.ok(post)
  }
}
