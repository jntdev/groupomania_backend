import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostsSchema extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title', 255).notNullable()
      table.string('content', 255).notNullable()
      table.string('owner_id', 30).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
