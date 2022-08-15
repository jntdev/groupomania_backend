import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Like extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public like: boolean

  @column({ serializeAs: null })
  public user_id: string

  @column({ serializeAs: null })
  public post_id: string
}
