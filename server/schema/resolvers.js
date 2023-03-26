// ❄️ Define the query and mutation functionality to work with the Mongoose models.
const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // if user exists, return user data
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  // mutation: login; addUser; saveBook; removeBook
  Mutation: {
    login: async (parent, { email, password }) => {
      // check user email & password
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("User not found");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Login failed");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    // type mutation in typeDefs.js: `saveBook(bookData: BookInput!): User`
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        // ---- ⏰ TODO: Check `findOneAndUpdate` or `findByIdAndUpdate`? ⤵️ --------
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          // ---- ⏰ TODO: Check `$addToSet` or `$push`? ⤵️ --------
          // $addToSet: Adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array.
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        // ---- ⏰ TODO: Check `findOneAndUpdate` or `findByIdAndUpdate`? ⤵️ --------
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
