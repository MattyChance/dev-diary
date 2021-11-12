import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { root } from './resolvers';
import { schema } from './schema';

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000);
// eslint-disable-next-line no-console
console.log('Running a GraphQL API server at http://localhost:4000/graphql');