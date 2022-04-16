import dbConnect from '../../utils/mongoose';
import Projects from '../../models/Projects';
import { UserInputError } from 'apollo-server-micro';

dbConnect();

export const projectResolvers = {
  Query: {
    singleProject: async (_root, args) => {
      const { _id } = args;
      return await Projects.findById(_id).catch((error) => {
        throw new UserInputError(error.message)
      });
    },
    allProjects: async (_root, args) => {

      if (args.completed) return await Projects.find({completed: true});

      return await Projects.find();
    },
  },
  Mutation: {
    createProject: async (_root, args) => {
      try {
        const newProject = new Projects({...args, completed: false});
        await newProject.save();
        return newProject;
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },
    deleteProject: async (_root, args) => {
      const { id } = args;
      const { name } = await Projects.findOneAndDelete({id});
      return `${name} project deleted`;
    }
  }
}