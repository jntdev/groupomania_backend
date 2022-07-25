import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Like extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public like: boolean

  @column({ serializeAs: null })
  public userId: string

  @column({ serializeAs: null })
  public postId: string
}
