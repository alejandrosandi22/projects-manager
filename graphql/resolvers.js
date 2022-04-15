import { UserInputError } from 'apollo-server-micro';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '../utils/mongoose';
import User from '../models/User';

dbConnect();

export const resolvers = {
  Query: {
    currentUser: async (_root, _args, context) => {
      try {
        return context.currentUser;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    createUser: async (_root, args) => {
      try {
        const user = await User.findOne({ email: args.email });
        if (user) throw new UserInputError('User already exist');
        const HashPassword = await bcrypt.hash(args.password, 12);
        const newUser = await new User({ ...args, password: HashPassword });

        const userForToken = {
          email: args.email,
          id: newUser._id,
        };

        const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '8d',
        });

        await newUser.save();

        return {
          value: token,
        };
      } catch (error) {
        throw new UserInputError(error);
      }
    },
    signIn: async (_root, args) => {
      try {
        const user = await User.findOne({ email: args.email });
        if (!user) throw new UserInputError('User does not exist');

        const doMatch = await bcrypt.compare(args.password, user.password);

        if (!doMatch) throw new UserInputError('Incorrect credentials');

        const userForToken = {
          email: args.email,
          id: user._id,
        };

        const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '8d',
        });

        return {
          value: token,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteUser: async (_root, args) => {
      const deletedUser = await User.findOneAndDelete({ email: args.email });
      if (!deletedUser) throw new UserInputError('User does not exist');

      return deletedUser;
    },
  },
};

export const test = {
  Mutation: {
    mutation1: (_root, args) => args.email,
  },
};
