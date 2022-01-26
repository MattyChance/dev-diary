import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`
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
        posts: [Post!]!
    }
    type Mutation {
        createNewUser(
            alias: String!,
            firstName: String!,
            lastName: String!,
        ): User
        createNewPost(
            userId: ID!
            title: String!
            notes: String!
            code: String!
            tag: String
        ): Post
        modifyPost(
            postId: ID!,
            title: String,
            notes: String,
            code: String,
            tag: String,
        ): Post
    }
`);
