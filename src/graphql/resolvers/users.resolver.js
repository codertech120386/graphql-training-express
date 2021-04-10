require("dotenv").config();
const { UserInputError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");

const User = require("../../models/user.model");

const newToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
};

module.exports = {
  Mutation: {
    register: async (_, { email, password }) => {
      // try to find if the user already exists
      let user = await User.find({ email }).exec();
      // if user already exists then throw an error
      if (user?.length) throw new UserInputError("User already exists");

      // if not exists then we create a user
      // then we ensure that user's password is encrypted before saving in the database
      user = await User.create({ email, password });

      // then we create a token for the user
      const token = newToken(user);

      return {
        ...user,
        email,
        token,
      };
    },

    login: async (_, { email, password }) => {
      // try to find the user with email
      let user = await User.findOne({ email }).exec();

      // if user not found then throw an error
      if (!user) throw new UserInputError("Email or password is incorrect");

      // if user is found then match the password provided with the password in the database

      const match = await user.checkPassword(password);

      // if passwords don't match then throw an error
      if (!match) throw new UserInputError("Email or password is incorrect");

      // if passwords match then create a new token for the user
      const token = newToken(user);

      // return the user with email and token
      console.log("user", user);
      return {
        ...user,
        _id: user._id,
        email,
        token,
      };
    },
  },
};
