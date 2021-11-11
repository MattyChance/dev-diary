"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
// Construct a schema, using GraphQL schema language
exports.schema = (0, graphql_1.buildSchema)(`
    type Query {
        post (id: ID!): Post
        posts (ids: [ID!]!): [Post!]!
        user (id: ID!): User
        users (userIds: [ID!]!): [User!]!
        postsByUser (userId: ID!): [Post!]!
    }
    type Post {
        id: ID!
        user: User!
        title: String!
        createDate: String!
        updateDate: String!
        notes: String!
        code: String!
        deleted: Boolean!
        tag: [String]!
    }
    type User {
        id: ID!
        alias: String!
        firstName: String!
        lastName: String!
    }
`);
//# sourceMappingURL=schema.js.map