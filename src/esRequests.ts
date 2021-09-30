import fetch from 'node-fetch';

export const esRequests = {
    esHost: 'http://localhost:9200/',
    getOnePost: async (id: number): Promise<any> => {
        return fetch(esRequests.esHost + 'post/_doc/' + id);
    },
    getOneUser: async (id: number): Promise<any> => {
        return fetch(esRequests.esHost + 'user/_doc/' + id);
    },
    getPostsByUserId: async (userId: number): Promise<any> => {    
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
