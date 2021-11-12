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

/* TODO:
- different type of queries: posts, user, users
- write all resolvers
- convert to typescript 

- gql language syntax on ! 
- put schema into its own file and import it in
- date type date: scala
- use camel case for es field name? or transfer es snake case to gql camel case.
didn't seem to find a convention of naming ES fields
- check es connection when starting the app
- get rid of any: add es return types
*/