const Post = require("../../models/post.model");

const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        return await Post.find().populate("author").exec();
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    addPost: async (_, { title, body, author }, context) => {
      // check it user is authenticated
      const user = await checkAuth(context);

      // create the post
      const post = await Post.create({ title, body, author });
      console.log("user", user);
      return {
        ...post._doc,
        author: { _id: user._id, email: user.email },
      };
    },
  },
};
