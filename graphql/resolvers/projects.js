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
      const currentUserProjects = await Projects.find({userId: args.userId}).sort({ updatedAt: -1 });

      if (args.completed) {
        const allCompletedrojects = currentUserProjects.filter((project) => project.completed)
        return allCompletedrojects;
      }

      return currentUserProjects;
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
      const deletedProject = await Projects.findOneAndDelete({ _id });
      return deletedProject;
    },
  },
};
