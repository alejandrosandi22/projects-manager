import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import jwt from 'jsonwebtoken';
import { typeDefs } from '../../../graphql/schema';
import { resolvers } from '../../../graphql/resolvers';
import User from '../../../models/User';

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
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
