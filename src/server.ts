import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { root } from './resolvers';
import { schema } from './schema';

const app = express();

try {
    app
        .use(cors())
        .use('/graphql', graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true
        }));


    app.listen(process.env.PORT || 4000);

    // eslint-disable-next-line no-console
    console.log('Running a GraphQL API server');
} catch (e) {
    // eslint-disable-next-line no-console
    console.log('Starting server has failed ', e);
}
