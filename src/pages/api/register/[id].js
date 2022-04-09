import { dbConnect } from "../../../../utils/mongoose";
import User from "../../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method, body, query: {id} } = req;

  switch (method) {
    case 'GET':
      const user = await User.findById(id);
      if (!user) return res.status(404).json({"msg": "User not found"});
      return res.status(200).json(user);

    case 'PUT':
    case 'DELETE':
    default:
      return res.status(400).json({"msg": "The method is not supported"})
  }
}