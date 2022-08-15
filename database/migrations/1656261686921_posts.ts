import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostsSchema extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title', 255).notNullable()
      table.string('content', 255).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
    })
  }


  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
