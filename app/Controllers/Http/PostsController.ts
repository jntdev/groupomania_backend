import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogRequest from 'App/Middleware/LogRequest'
import Post from 'App/Models/Post'

import StorePostValidator from 'App/Validators/Posts/StorePostValidator'
import UpdatePostValidator from 'App/Validators/Posts/UpdatePostValidator'

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    //let posts = await Post.all()

    const posts = await Post
      .query()
      .preload('user')

    const postsJSON = posts.map((post) => post.serialize())
    return response.ok(postsJSON)
  }


  //$getRelation<Model extends LucidModel>(this: Model, name: string): RelationshipsContract;

  public async store({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(StorePostValidator)
    //const currentUser = auth.user
    //payload.owner_id = currentUser?.$attributes.id
    console.log(payload)
    const post = await Post.create(payload)
    // console.log(post)
    //console.log(auth.user?.$attributes.id)
    return response.created(post)
  }

  public async show({ response, params }: HttpContextContract) {
    console.log(params)
    const post = await Post.findOrFail(params)
    //console.log(post)
    return response.ok(post)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const payload = await request.validate(UpdatePostValidator)
    post.merge(payload).save()
    return response.ok(post)
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    console.log(auth.isAuthenticated)
    // const currentUserId = auth.user?.$attributes.id
    // const currentUserRole = auth.user?.$attributes.is_admin
    const post = await Post.findOrFail(params.id)
    // if (currentUserId == post.userId || currentUserRole == 1) {
    post.delete()
    return response.ok(post)
    // } else {
    // response.methodNotAllowed(post)
    // }

  }
}
