"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
const StorePostValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Posts/StorePostValidator"));
const UpdatePostValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Posts/UpdatePostValidator"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
class PostsController {
    async index({ response }) {
        const posts = await Post_1.default
            .query()
            .preload('user')
            .orderBy('created_at', 'desc');
        return response.ok(posts);
    }
    async likes({ request, response }) {
        const payload = request.body();
        const post = await Post_1.default.findOrFail(payload.post_id);
        const liked_by = post.$attributes.liked_by;
        let unpackArr = JSON.parse(liked_by);
        unpackArr == null ?? [];
        if (unpackArr != null && unpackArr.includes(parseInt(payload.user_id))) {
            let index = unpackArr.indexOf(parseInt(payload.user_id));
            unpackArr.splice(index);
        }
        else {
            unpackArr.push(parseInt(payload.user_id));
        }
        let mergeable = {};
        let json = JSON.stringify(unpackArr);
        Object.assign(mergeable, { liked_by: json });
        post.merge(mergeable).save();
        return response.ok(post);
    }
    async store({ request, response }) {
        let url = "";
        const file = request.file('file', {
            size: '2mb',
            extnames: ['jpg', 'jpeg', 'png'],
        });
        if (file != null && !file.isValid) {
            return response.send({ message: "Le fichier n'est pas au bon format" });
        }
        else {
            if (file != null && file.isValid) {
                await file.move(Application_1.default.tmpPath('uploads'));
                console.log(file);
                url = `http://localhost:3333/uploads/${file.fileName}`;
                console.log('if');
            }
            else {
                console.log('else');
            }
        }
        const payload = await request.validate(StorePostValidator_1.default);
        console.log(url);
        payload.img_url = url;
        const post = await Post_1.default.create(payload);
        return response.created(post);
    }
    async show({ response, params }) {
        const post = await Post_1.default.findOrFail(params);
        return response.ok(post);
    }
    async update({ request, response, params }) {
        const post = await Post_1.default.findOrFail(params.id);
        const payload = await request.validate(UpdatePostValidator_1.default);
        let url = "";
        const file = request.file('file', {
            size: '2mb',
            extnames: ['jpg', 'jpeg', 'png'],
        });
        if (file != null && !file.isValid) {
            return response.send({ message: "Le fichier n'est pas au bon format" });
        }
        else {
            if (file != null && file.isValid) {
                await file.move(Application_1.default.tmpPath('uploads'));
                url = `http://localhost:3333/uploads/${file.fileName}`;
                payload.img_url = url;
            }
        }
        post.merge(payload).save();
        return response.ok(post);
    }
    async destroy({ response, params }) {
        const post = await Post_1.default.findOrFail(params.id);
        post.delete();
        return response.ok(post);
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map