import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LikesSchema extends BaseSchema {
  protected tableName = 'likes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.boolean('like').nullable()
      table.string('userId', 255).notNullable()
      table.string('postId', 30).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
