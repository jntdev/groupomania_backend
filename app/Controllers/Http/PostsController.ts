import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import StorePostValidator from 'App/Validators/Posts/StorePostValidator'
import UpdatePostValidator from 'App/Validators/Posts/UpdatePostValidator'

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    const posts = await Post
      .query()
      .preload('user')

    return response.ok(posts)
  }
  public async likes({request, response }: HttpContextContract) {
    const payload =request.body()
    const post = await Post.findOrFail(payload.post_id)
    const liked_by = post.$attributes.liked_by
    let unpackArr = JSON.parse( liked_by )
    if(unpackArr == null){
      unpackArr = []
    }

    if(unpackArr != null && unpackArr.includes(parseInt(payload.user_id))){
      let index = unpackArr.indexOf(parseInt(payload.user_id))
      unpackArr.splice(index)
    }
    else{
     unpackArr.push(parseInt(payload.user_id))
    }
    let mergeable = {}
    let json = JSON.stringify(unpackArr)
    Object.assign(mergeable, {liked_by: json})
    post.merge(mergeable).save()
    return response.ok(post)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StorePostValidator)
    const post = await Post.create(payload)
    console.log(response)
    return response.created(post)
  }

  public async show({ response, params }: HttpContextContract) {
    console.log(params)
    const post = await Post.findOrFail(params)
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
    const post = await Post.findOrFail(params.id)
    post.delete()
    return response.ok(post)
  }
}
