"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
const esRequests_1 = require("./esRequests");
// The root provides a resolver function for each API endpoint
exports.root = {
    post: async (id) => {
        // todo: id.id? gql params returns an object.
        const post = await esRequests_1.esRequests.getOnePost(id.id);
        // eslint-disable-next-line one-var
        return post.data._source;
    },
    posts: async (ids) => {
        const posts = [];
        await Promise.all(ids.ids.map(async (id) => {
            var _a;
            const post = await esRequests_1.esRequests.getOnePost(id);
            posts.push((_a = post === null || post === void 0 ? void 0 : post.data) === null || _a === void 0 ? void 0 : _a._source);
        }));
        return posts;
    },
    user: async (id) => {
        var _a;
        return (_a = (await esRequests_1.esRequests.getOneUser(id.id)).data) === null || _a === void 0 ? void 0 : _a._source;
    },
    users: async (userIds) => {
        const users = [];
        await Promise.all(userIds.userIds.map(async (id) => {
            var _a;
            const user = await esRequests_1.esRequests.getOneUser(id);
            users.push((_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a._source);
        }));
        return users;
    },
    postsByUser: async (userId) => {
        var _a, _b;
        const postsByUserId = await esRequests_1.esRequests.getPostsByUserId(userId.userId);
        return (_b = (_a = postsByUserId === null || postsByUserId === void 0 ? void 0 : postsByUserId.data) === null || _a === void 0 ? void 0 : _a.hits) === null || _b === void 0 ? void 0 : _b.hits.map((hit) => hit === null || hit === void 0 ? void 0 : hit._source);
    }
};
//# sourceMappingURL=resolvers.js.map