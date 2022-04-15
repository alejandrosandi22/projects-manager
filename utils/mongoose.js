import { connect, connection } from 'mongoose';

const conn = {
  isConnected: false,
};

export default async function dbConnect() {
  if (conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URI);
  conn.isConnected = db.connections[0].readyState;
}

connection.on('error', (error) => {
  throw new Error(error);
});
