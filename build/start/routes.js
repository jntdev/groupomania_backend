"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return { hello: 'world' };
});
Route_1.default.group(() => {
    Route_1.default.post('users', 'AuthController.register');
    Route_1.default.post('users/login', 'AuthController.login');
    Route_1.default.post('users/checkifican/:id', 'AuthController.checkifican');
    Route_1.default.group(() => {
        Route_1.default.get('posts', 'PostsController.index');
        Route_1.default.post('posts', 'PostsController.store');
        Route_1.default.post('posts/:id', 'PostsController.update');
        Route_1.default.delete('posts/:id', 'PostsController.destroy');
        Route_1.default.post("post/likes", 'PostsController.likes');
    }).middleware(['auth']);
}).prefix('/api');
//# sourceMappingURL=routes.js.map