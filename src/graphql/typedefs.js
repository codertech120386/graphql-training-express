const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    _id: ID!
    email: String!
    token: String
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
    author: User!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    addPost(title: String!, body: String!, author: String!): Post
  }
`;
