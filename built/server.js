"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_graphql_1 = require("express-graphql");
var graphql_1 = require("graphql");
var node_fetch_1 = require("node-fetch");
// Construct a schema, using GraphQL schema language
var schema = graphql_1.buildSchema("\n    type Query {\n        post (id: ID!): Post\n        posts (ids: [ID!]!): [Post!]!\n        user (id: ID!): User\n        users (userIds: [ID!]!): [User!]!\n        postsByUser (userId: ID!): [Post!]!\n    }\n    type Post {\n        id: ID!\n        user: User!\n        title: String!\n        createDate: String!\n        updateDate: String!\n        note: String!\n        code: String!\n        deleted: Boolean!\n        tag: [String]!\n    }\n    type User {\n        id: ID!\n        alias: String!\n        firstName: String!\n        lastName: String!\n    }\n");
var esHost = 'http://localhost:9200/';
var getOnePost = function (id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, node_fetch_1.default(esHost + 'post/_doc/' + id)];
}); }); };
var getOneUser = function (id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, node_fetch_1.default(esHost + 'user/_doc/' + id)];
}); }); };
var getPostsByUserId = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var query, req;
    return __generator(this, function (_a) {
        query = {
            "query": {
                "term": {
                    "user.id": userId
                }
            }
        };
        req = {
            method: 'post',
            body: JSON.stringify(query),
            headers: { 'Content-Type': 'application/json' }
        };
        console.log('called', JSON.stringify(query));
        return [2 /*return*/, node_fetch_1.default(esHost + 'post/_search/', req)];
    });
}); };
// The root provides a resolver function for each API endpoint
var root = {
    post: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var post, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getOnePost(id.id)];
                case 1:
                    post = _a.sent();
                    return [4 /*yield*/, post.json()];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result === null || result === void 0 ? void 0 : result._source];
            }
        });
    }); },
    posts: function (ids) { return __awaiter(void 0, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    posts = [];
                    return [4 /*yield*/, Promise.all(ids.ids.map(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                            var post, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getOnePost(id)];
                                    case 1:
                                        post = _a.sent();
                                        return [4 /*yield*/, post.json()];
                                    case 2:
                                        result = _a.sent();
                                        posts.push(result === null || result === void 0 ? void 0 : result._source);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, posts];
            }
        });
    }); },
    user: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getOneUser(id.id)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, user.json()];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result === null || result === void 0 ? void 0 : result._source];
            }
        });
    }); },
    users: function (userIds) { return __awaiter(void 0, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users = [];
                    return [4 /*yield*/, Promise.all(userIds.userIds.map(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                            var user, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getOneUser(id)];
                                    case 1:
                                        user = _a.sent();
                                        return [4 /*yield*/, user.json()];
                                    case 2:
                                        result = _a.sent();
                                        users.push(result === null || result === void 0 ? void 0 : result._source);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, users];
            }
        });
    }); },
    postsByUser: function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        var postsByUserId, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getPostsByUserId(userId.userId)];
                case 1:
                    postsByUserId = _b.sent();
                    return [4 /*yield*/, postsByUserId.json()];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, (_a = result === null || result === void 0 ? void 0 : result.hits) === null || _a === void 0 ? void 0 : _a.hits.map(function (hit) { return hit === null || hit === void 0 ? void 0 : hit._source; })];
            }
        });
    }); }
};
var app = express_1.default();
app.use('/graphql', express_graphql_1.graphqlHTTP({
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
- use camel case for es field name? or transfer es snake case to gql camel case. didn't seem to find a convention of naming ES fields
- check es connection when starting the app
- set minimal es development security
*/ 
