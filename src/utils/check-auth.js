require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) return reject(err);

      resolve(payload);
    });
  });
};

module.exports = async (context) => {
  // first check if authorization header is present in the context and if not throw new Error
  if (!context?.req?.headers?.authorization)
    throw new UserInputError(" Authorization header is missing");

  // if not return an error message if header not present or not a bearer token
  const bearerToken = context?.req?.headers?.authorization;
  if (!bearerToken.startsWith("Bearer "))
    throw new UserInputError(" Authorization header is in the wrong format");

  // verify the token using jwt
  const payload = await verifyToken(bearerToken.split("Bearer ")[1]);

  // if token is bad then throw an error
  if (!payload) throw new UserInputError(" Authorization header is incorrect");

  // retrieve the user from the token and attach it to the req
  return await User.findById(payload.id).lean().exec();
};
