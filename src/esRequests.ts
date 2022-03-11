import axios from 'axios';
import 'dotenv/config';

// should i change these  this always returns an internal types
export const esRequests = {
    // eslint-disable-next-line max-len
    esHost: process.env.ES_CLUSTER,
    getOnePost: async (id: string): Promise<any> => {
        return axios.get(esRequests.esHost + '/post/_doc/' + id);
    },
    getOneUser: async (id: string): Promise<any> => {
        const result = await axios.get(esRequests.esHost + '/user/_doc/' + id);

        return result;
    },
    // eslint-disable-next-line max-len
    getPostsByUserId: async (userId: number): Promise<any> => {    
        const query = {
            'query': {
                'term': {
                    'user.id': userId
                }
            }
        };
            
        return axios.get(
            esRequests.esHost + '/post/_search/',
            {data: query, headers: {'Content-Type': 'application/json'}}
        );
    },
    getNumberOfUsers: async (): Promise<number> => {
        // eslint-disable-next-line no-useless-catch
        try {
            const result = await axios.get(`${esRequests.esHost}/user/_count`);
            return result.data?.count;
        } catch (e) {
            throw e;
        }
    },
    createUser: async (
        id: string,
        alias: string,
        firstName: string,
        lastName: string
    ): Promise<any> => {

        const data = {
            id,
            alias,
            firstName,
            lastName
        };

        return axios({
            method: 'post',
            url: `${esRequests.esHost}/user/_doc/${id}`,
            data
        });
    },
    createPost: async (
        userId: string,
        postId: string,
        title: string,
        createDate: string,
        updateDate: string,
        notes: string,
        code: string,
        tag: string
    ): Promise<any> => {
        const user = (await esRequests.getOneUser(userId))?.data?._source,
            data = {
                id: postId,
                title,
                createDate,
                updateDate,
                notes,
                code,
                tag,
                user
            };
        
        return axios({
            method: 'post',
            url: `${esRequests.esHost}/post/_doc/${postId}`,
            data
        });
    },
    modifyPost: async (
        postId: string,
        title: string,
        notes: string,
        code: string,
        tag: string,
        updateDate: string
    ): Promise<any> => {
        let data: any;

        if (title || notes || code || tag) {
            data = {
                updateDate
            };
        } else {
            throw new Error('No update has been made to this post');
        }

        if (title) {
            data.title = title;
        } 

        if (notes) {
            data.notes = notes;
        }

        if (code) {
            data.notes = code;
        }

        if (notes) {
            data.tag = tag;
        }

        return axios({
            method: 'post',
            url: `${esRequests.esHost}/post/_update/${postId}`,
            data: {
                'doc': data
            }
        });
    }
};
