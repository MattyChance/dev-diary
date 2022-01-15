import { esRequests } from './esRequests';
import { Post, User } from './InternalTypes';

// The root provides a resolver function for each API endpoint
export const root = {
    post: async (id: { id: number }): Promise<Post> => {
        // todo: id.id? gql params returns an object.
        return (await esRequests.getOnePost(id.id)).data?._source;
    },
    posts: async (ids: { ids: number[] }): Promise<Post[]> => {
        const posts: Post[] = [];

        await Promise.all(ids.ids.map(async (id: number)  => {
            const post = await esRequests.getOnePost(id);
    
            posts.push(post?.data?._source);
        }));

        return posts;
    },
    user: async (id: { id: string }): Promise<User> => {
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
    users: async (userIds: { userIds: string[] }): Promise<User[]> => {
        const users: User[] = [];

        await Promise.all(userIds.userIds.map(async (id: string) => {
            const user = await esRequests.getOneUser(id);
    
            users.push(user?.data?._source);
        }));

        return users;
    },
    createNewPost: (

    ): void => {
        return;
    },
    createNewUser: async (
        args: {
            id: string,
            alias: string,
            firstName: string,
            lastName: string
        }): Promise<any> => {

        try {
            await esRequests.createUser(
                args.id,
                args.alias,
                args.firstName,
                args.lastName
            );

            // eslint-disable-next-line one-var
            const resp = await esRequests.getOneUser(args.id);

            return resp?.data?._source;

        } catch (e: unknown) {
            throw e;
            console.log('errr', e.response.data);
        }

        // uuid generator to create our own IDs

        // TODO: mapping generator

        // TODO: error handling


        // eslint-disable-next-line no-console
        // console.log('??????? ', createUserResp);
    }
};