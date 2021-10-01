import fetch, { Response } from 'node-fetch';

export const esRequests = {
    esHost: 'http://localhost:9200/',
    getOnePost: async (id: number): Promise<Response> => {
        return fetch(esRequests.esHost + 'post/_doc/' + id);
    },
    getOneUser: async (id: number): Promise<Response> => {
        return fetch(esRequests.esHost + 'user/_doc/' + id);
    },
    // eslint-disable-next-line max-len
    getPostsByUserId: async (userId: number): Promise<Response> => {    
        const req = {
            method: 'post',
            body: JSON.stringify({
                'query': {
                    'term': {
                        'user.id': userId
                    }
                }
            }),
            headers: {'Content-Type': 'application/json'}
        };
    
        return fetch(esRequests.esHost + 'post/_search/', req);
    }
};
