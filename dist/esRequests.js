"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esRequests = void 0;
const axios_1 = __importDefault(require("axios"));
exports.esRequests = {
    esHost: 'http://localhost:9200/',
    getOnePost: async (id) => {
        return axios_1.default.get(exports.esRequests.esHost + 'post/_doc/' + id);
    },
    getOneUser: async (id) => {
        return axios_1.default.get(exports.esRequests.esHost + 'user/_doc/' + id);
    },
    // eslint-disable-next-line max-len
    getPostsByUserId: async (userId) => {
        const req = {
            method: 'post',
            body: JSON.stringify({
                'query': {
                    'term': {
                        'user.id': userId
                    }
                }
            }),
            headers: { 'Content-Type': 'application/json' }
        };
        return axios_1.default.post(exports.esRequests.esHost + 'post/_search/', req);
    }
};
//# sourceMappingURL=esRequests.js.map