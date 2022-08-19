"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StoreUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/StoreUserValidator"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const LoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Auth/LoginValidator"));
class AuthController {
    async register({ request, response }) {
        const payload = await request.validate(StoreUserValidator_1.default);
        const user = await User_1.default.create(payload);
        return response.created({ user });
    }
    async login({ auth, request, response }) {
        const { email, password } = await request.validate(LoginValidator_1.default);
        const token = await auth.use('api').attempt(email, password);
        const user = auth.user;
        return response.ok({
            "token": token.token,
            "user": {
                "id": user.id,
                "email": user.email,
                "is_admin": user.is_admin
            }
        });
    }
    async checkifican({ auth, params, response }) {
        await auth.use('api').logout();
        await auth.use('api').loginViaId(params.id);
        const token = await auth.use('api').loginViaId(params.id);
        console.log(token.token);
        console.log(auth.user?.$attributes);
        return response.ok({
            "isAdmin": auth.user?.$attributes.is_admin,
            "id": auth.user?.$attributes.id,
            "token": token.token
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map