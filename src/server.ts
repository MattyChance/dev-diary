import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { root } from './resolvers';
import { schema } from './schema';
import 'dotenv/config';

const app = express();

try {
    app
        .use(cors())
        .use('/graphql', graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true
        }));

    // eslint-disable-next-line no-console
    console.log('process env port:', process.env.PORT);
    // eslint-disable-next-line no-console
    console.log('process env NODE:', process.env.NODE_ENV);

    // eslint-disable-next-line max-len
    const esHost = process.env.NODE_ENV === 'local' ? 'http://localhost:9200' : process.env.ES_CLUSTER;
    // eslint-disable-next-line no-console
    console.log('esCluster URL', esHost);

    app.listen(process.env.PORT || 4000);

    // eslint-disable-next-line no-console
    console.log('Running a GraphQL API server');
} catch (e) {
    // eslint-disable-next-line no-console
    console.log('Starting server has failed ', e);
}
