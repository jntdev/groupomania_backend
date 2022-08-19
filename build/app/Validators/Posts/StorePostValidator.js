"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class StorePostValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            title: Validator_1.schema.string(),
            content: Validator_1.schema.string(),
            user_id: Validator_1.schema.number.optional(),
            img_url: Validator_1.schema.string.optional()
        });
        this.messages = {};
    }
}
exports.default = StorePostValidator;
//# sourceMappingURL=StorePostValidator.js.map