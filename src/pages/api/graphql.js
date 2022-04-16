import { ApolloServer } from 'apollo-server-micro';
import User from '../../../models/User';
import Cors from 'micro-cors';
import jwt from 'jsonwebtoken';

import { getResolvers } from '../../../graphql/resolvers/merge'; 

//resolvers
import { projectResolvers } from '../../../graphql/resolvers/projects';
import { userResolvers } from '../../../graphql/resolvers/user';

//type definitions
import { typeDefs as projects } from '../../../graphql/schemas/projects';
import { typeDefs as users } from '../../../graphql/schemas/user';

const cors = Cors();

const allResolvers = [userResolvers, projectResolvers];

const apolloServer = new ApolloServer({
  typeDefs: [projects, users],
  resolvers: getResolvers(allResolvers),
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7);
      const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const currentUser = await User.findById(id);

      return { currentUser };
    }
  },
});

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});

export const config = { api: { bodyParser: false } };
