import { esRequests } from './esRequests';
import { Post, User } from './InternalTypes';

// The root provides a resolver function for each API endpoint
export const root = {
    post: async (id: { id: number }): Promise<Post> => {
        // todo: id.id? gql params returns an object.
        const post = await esRequests.getOnePost(id.id);
        // eslint-disable-next-line one-var
        return post.data._source;
    },
    posts: async (ids: { ids: number[] }): Promise<Post[]> => {
        const posts: Post[] = [];

        await Promise.all(ids.ids.map(async (id: number)  => {
            const post = await esRequests.getOnePost(id);
    
            posts.push(post?.data?._source);
        }));

        return posts;
    },
    user: async (id: { id: number }): Promise<User> => {
        const user = (await esRequests.getOneUser(id.id)).data?._source;

        return {
            ...user,
            posts: async (): Promise<Post[]> => {
                const postsByUserId =
                    await esRequests.getPostsByUserId(user.id);

                return postsByUserId?.data?.hits?.hits.map(
                    (hit: any) => hit?._source
                );
            }};
    },
    users: async (userIds: { userIds: number[] }): Promise<User[]> => {
        const users: User[] = [];

        await Promise.all(userIds.userIds.map(async (id: number) => {
            const user = await esRequests.getOneUser(id);
    
            users.push(user?.data?._source);
        }));

        return users;
    }
};