"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdatePostValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            title: Validator_1.schema.string.optional(),
            content: Validator_1.schema.string.optional(),
            user_id: Validator_1.schema.number.optional(),
            img_url: Validator_1.schema.string.optional()
        });
        this.messages = {};
    }
}
exports.default = UpdatePostValidator;
//# sourceMappingURL=UpdatePostValidator.js.map