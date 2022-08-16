import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Like from 'App/Models/Like'
import StoreLikeValidator from 'App/Validators/Likes/StoreLikeValidator'

export default class LikesController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreLikeValidator)
    const load = request.body()
    let alreadyLikedPost = await Database
      .from('likes')
      .where("post_id", load.post_id).where('user_id', load.user_id).first()



    if (alreadyLikedPost == null) {
      const like = await Like.create(payload)
      return response.created(like.$attributes)
    } else {

        let LikesRow = Object.values(JSON.parse(JSON.stringify(alreadyLikedPost)))
        const like = await Like.findOrFail(LikesRow[0])
        console.log(like.$attributes)

        if(like.$attributes.like == 0){
          //console.log(like.$attributes.like)

          like.$attributes.like = 1
          like.save()

        }else{
          //console.log(like.$attributes.like)

          like.$attributes.like = 0
          like.save()

        }

        return response.ok(like.$attributes)
    }
  }



}
