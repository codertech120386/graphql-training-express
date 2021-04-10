const postResolvers = require("./posts.resolver");
const userResolvers = require("./users.resolver");

module.exports = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};
