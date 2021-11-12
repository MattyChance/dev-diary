import axios from 'axios';

export const esRequests = {
    esHost: 'http://localhost:9200/',
    getOnePost: async (id: number): Promise<any> => {
        return axios.get(esRequests.esHost + 'post/_doc/' + id);
    },
    getOneUser: async (id: number): Promise<any> => {
        return axios.get(esRequests.esHost + 'user/_doc/' + id);
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
            esRequests.esHost + 'post/_search/',
            {data: query, headers: {'Content-Type': 'application/json'}}
        );
    }
};
