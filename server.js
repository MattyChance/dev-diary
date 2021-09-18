var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema, GraphQLSchema, GraphQLObjectType, type } = require('graphql');

// Construct a schema, using GraphQL schema language

var schema = buildSchema(`
    type Query {
        post (id: ID!): Post
        posts (ids: [ID!]!): [Post!]!
        user (id: ID!): User
        users (users: [ID!]!): [User!]!
        postByUser (userId: ID!): [Post!]!
    }
    type Post {
        id: ID!
        user: User!
        title: String!
        createDate: String!
        updateDate: String!
        note: String!
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

// The root provides a resolver function for each API endpoint
var root = {
  post: id => {
    return { title: 'test' }
  },
  posts: ids => {
      return []
  },
  user: id => {
      return { alias: 'test'}
  },
  users: ids => {
      return []
  },
  postByUser: userId => {
      return { id: 'test a post'}
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

// todo:
// gql language syntax on ! 

// put schema into its own file and import it in
// date type date: scala
// different type of queries: posts, user, users
// convert to typescript 
// install nodemon