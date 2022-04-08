import { connect, connection } from 'mongoose';

const conn = {
  isConnected: false
}

export async function dbConnect() {
  if (conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URL);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log('mongodb is connected')
});
connection.on("error", (err) => console.log('Error',err));
