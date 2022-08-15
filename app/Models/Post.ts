import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public userId: number

  @column()
  public created_at: Date

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

}

