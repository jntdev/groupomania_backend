"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateUserValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string.optional({ trim: true }, [
                Validator_1.rules.email(),
                Validator_1.rules.unique({ table: 'users', column: 'email' }),
            ]),
            password: Validator_1.schema.string.optional(),
        });
    }
}
exports.default = UpdateUserValidator;
//# sourceMappingURL=UpdateUserValidator.js.map