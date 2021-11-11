"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const resolvers_1 = require("./resolvers");
const schema_1 = require("./schema");
const app = (0, express_1.default)();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.schema,
    rootValue: resolvers_1.root,
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
- set minimal es development security
*/ 
//# sourceMappingURL=server.js.map