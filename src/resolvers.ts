import { esRequests } from './esRequests';
import { Post, User } from './InternalTypes';
import { errHandler } from './errorHandler';
import { v4 as uuidV4 } from 'uuid';
import moment from 'moment';

// The root provides a resolver function for each API endpoint
export const root = {
    post: async (id: { id: string }): Promise<Post> => {
        // todo: id.id? gql params returns an object.
        return (await esRequests.getOnePost(id.id)).data?._source;
    },
    posts: async (ids: { ids: string[] }): Promise<Post[]> => {
        const posts: Post[] = [];

        await Promise.all(ids.ids.map(async (id: string) => {
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
            }
        };
    },
    users: async (userIds: { userIds: string[] }): Promise<User[]> => {
        const users: User[] = [];

        await Promise.all(userIds.userIds.map(async (id: string) => {
            const user = await esRequests.getOneUser(id);

            users.push(user?.data?._source);
        }));

        return users;
    },
    createNewUser: async (
        args: {
            alias: string,
            firstName: string,
            lastName: string
        }): Promise<User> => {

        const uuid = uuidV4();

        try {
            await esRequests.createUser(
                uuid,
                args.alias,
                args.firstName,
                args.lastName
            );

            // eslint-disable-next-line one-var
            const resp = await esRequests.getOneUser(uuid);

            return resp?.data?._source;

        } catch (e: unknown) {
            errHandler.reportError(e);
            throw e;
        }
    },
    // deleteUser: () => {},
    modifyPost: async (
        args: {
            postId: string,
            title: string,
            notes: string,
            code: string,
            tag: string,
        }
    ): Promise<Post> => {
        const updateDate = moment().format();

        try {
            await esRequests.modifyPost(
                args.postId,
                args.title,
                args.notes,
                args.code,
                args.tag,
                updateDate
            );

            const modifiedPost = await esRequests.getOnePost(args.postId);

            return modifiedPost?.data?._source;

        } catch (e) {
            errHandler.reportError(e);
            throw e;
        }

    },
    createNewPost: async (
        args: {
            userId: string,
            title: string,
            notes: string,
            code: string,
            tag: string
        }
    ): Promise<Post> => {
        const postId = uuidV4(),
            createDate = moment().format(),
            updateDate = moment().format();

        try {
            await esRequests.createPost(
                args.userId,
                postId,
                args.title,
                createDate,
                updateDate,
                args.notes,
                args.code,
                args.tag
            );

            const getOnePostResp = await esRequests.getOnePost(postId);
            return getOnePostResp?.data?._source;
        } catch (e) {
            errHandler.reportError(e);
            throw e;
        }
    }
    // deletePost: () => {},
};