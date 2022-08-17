import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import StorePostValidator from 'App/Validators/Posts/StorePostValidator'
import UpdatePostValidator from 'App/Validators/Posts/UpdatePostValidator'
import Application from '@ioc:Adonis/Core/Application'

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    const posts = await Post
      .query()
      .preload('user')
      .orderBy('created_at', 'desc')

    return response.ok(posts)
  }
  public async likes({request, response }: HttpContextContract) {
    const payload =request.body()
    const post = await Post.findOrFail(payload.post_id)
    const liked_by = post.$attributes.liked_by
    let unpackArr = JSON.parse( liked_by )

      unpackArr  == null ?? []


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
    console.log("toto")
    let url =""
    const file = request.file('file', {
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png'],
    })

    if(file != null && !file.isValid){

      return response.send({message: "Le fichier n'est pas au bon format"})
    }else{
      if (file != null  && file.isValid) {
        await file.move(Application.tmpPath('uploads'))
        console.log(file)
        url = `http://localhost:3333/uploads/${file.fileName}`
      }
    }
      const payload = await request.validate(StorePostValidator)
      console.log(url)
      payload.img_url = url
      const post = await Post.create(payload)
      return response.created(post)
    }

  public async show({ response, params }: HttpContextContract) {
    // console.log(params)
    const post = await Post.findOrFail(params)
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
