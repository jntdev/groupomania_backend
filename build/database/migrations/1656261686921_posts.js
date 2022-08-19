"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class PostsSchema extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'posts';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.string('title', 255).notNullable();
            table.string('content', 255).notNullable();
            table
                .integer('user_id')
                .unsigned()
                .references('users.id')
                .onDelete('CASCADE');
            table.string('liked_by').defaultTo('[]');
            table.string("img_url").nullable();
            table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = PostsSchema;
//# sourceMappingURL=1656261686921_posts.js.map