"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
const esRequests_1 = require("./esRequests");
// The root provides a resolver function for each API endpoint
exports.root = {
    post: async (id) => {
        // todo: id.id? gql params returns an object.
        const post = await esRequests_1.esRequests.getOnePost(id.id);
        // eslint-disable-next-line no-console
        console.log('???????? ', post);
        // eslint-disable-next-line one-var
        return post.data._source;
    }
    // posts: async (ids: number[]) => {
    //     const posts = [];
    //     await Promise.all(ids.ids.map(async (id: number)  => {
    //         const post = await getOnePost(id);
    //         const result = await post.json();
    //         posts.push(result?._source);
    //     }));
    //     return posts;
    // },
    // user: async (id: number) => {
    //     const user = await getOneUser(id.id);
    //     const result = await user.json();
    //     return result?._source;
    // },
    // users: async userIds => {
    //     const users = [];
    //     await Promise.all(userIds.userIds.map(async (id: number) => {
    //         const user = await getOneUser(id);
    //         const result = await user.json();
    //         users.push(result?._source);
    //     }));
    //     return users;
    // },
    // postsByUser: async userId => {
    //     const postsByUserId = await getPostsByUserId(userId.userId),
    //         result = await postsByUserId.json();
    //     return result?.hits?.hits.map(hit => hit?._source);
    // }
};
//# sourceMappingURL=resolvers.js.map