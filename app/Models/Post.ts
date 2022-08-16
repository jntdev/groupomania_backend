import { column, BaseModel, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Like from './Like'
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

  @column()
  public userLikeList: Array<number>

  @column()
  public liked_by: String

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>
}

