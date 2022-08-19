"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogRequest {
    async handle({ request }, next) {
        console.log(`-> ${request.method()}: ${request.url()}`);
        await next();
    }
}
exports.default = LogRequest;
//# sourceMappingURL=LogRequest.js.map