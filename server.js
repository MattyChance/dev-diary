import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, parse } from 'graphql';
import fetch from 'node-fetch';

// Construct a schema, using GraphQL schema language

var schema = buildSchema(`
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

const esHost = 'http://localhost:9200/';

const getOnePost = async id => fetch(esHost + 'post/_doc/' + id);
const getOneUser = async id => fetch(esHost + 'user/_doc/' + id);
const getPostsByUserId = async userId => {
    const query = {
        "query": {
            "term": {
              "user.id": userId
            }
        }
    };

    const req = {
        method: 'post',
        body: JSON.stringify(query),
        headers: {'Content-Type': 'application/json'}
    }
    console.log('called', JSON.stringify(query));

    return fetch(esHost + 'post/_search/', req);

}
// The root provides a resolver function for each API endpoint
var root = {
    post: async id => {
        const post = await getOnePost(id.id); // todo: id.id? gql params returns an object.
        const result = await post.json(); // transfer es snake case to gql camel case

        return result?._source;
    },
    posts: async ids => {
        const posts = [];

        await Promise.all(ids.ids.map(async id  => {
            const post = await getOnePost(id);
            const result = await post.json();
    
            posts.push(result?._source);
        }));

        return posts;
    },
    user: async id => {
        const user = await getOneUser(id.id);
        const result = await user.json();

        return result?._source;
    },
    users: async userIds => {
        const users = [];

        await Promise.all(userIds.userIds.map(async id  => {
            const user = await getOneUser(id);
            const result = await user.json();
    
            users.push(result?._source);
        }));

        return users;
    },
    postsByUser: async userId => {
        const postsByUserId = await getPostsByUserId(userId.userId);
        const result = await postsByUserId.json();

        return result?.hits?.hits.map(hit => hit?._source);
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

/* TODO:

- write all resolvers
- convert to typescript 

- gql language syntax on ! 
- put schema into its own file and import it in
- date type date: scala
- different type of queries: posts, user, users
- use camel case for es field name?
- check es connection when starting the app
- set minimal es development security
*/