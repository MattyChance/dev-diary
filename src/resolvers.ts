import { esRequests } from './esRequests';

// The root provides a resolver function for each API endpoint
export const root = {
    post: async (id: any): Promise<any> => {
        // todo: id.id? gql params returns an object.
        const post = await esRequests.getOnePost(id.id);

        return (await post.json())?._source;
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