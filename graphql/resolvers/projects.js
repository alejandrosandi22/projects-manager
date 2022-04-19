import { UserInputError } from 'apollo-server-micro';
import dbConnect from '../../utils/mongoose';
import Projects from '../../models/Projects';

dbConnect();

export const projectResolvers = {
  Query: {
    singleProject: async (_root, args) => {
      const { _id } = args;
      const project = await Projects.findById(_id).catch((error) => {
        throw new UserInputError(error.message);
      });
      return project;
    },
    getAllProjects: async (_root, args) => {
      if (args.completed) {
        const allCompletedrojects = await Projects.find({ completed: true });
        return allCompletedrojects;
      }

      const allProjects = await Projects.find().sort({ updatedAt: -1 });
      return allProjects;
    },
  },
  Mutation: {
    createProject: async (_root, args) => {
      try {
        const newProject = new Projects({ ...args, completed: false });
        await newProject.save();
        return newProject;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteProject: async (_root, args) => {
      const { _id } = args;
      const { name } = await Projects.findOneAndDelete({ _id });
      return `${name} project deleted`;
    },
  },
};
