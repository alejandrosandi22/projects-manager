import bcrypt from 'bcryptjs';
import { dbConnect } from '../../../../utils/mongoose';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

dbConnect();

export default async (req, res) => {
  const { method, body } = req;

  if (method === 'POST') {
    try {

      const user = await User.findOne({ email: body.email });

      if (!user) return res.status(404).json({ message: 'User does not exist' });

      const doMatch = await bcrypt.compare(body.password, user.password);

      if (!doMatch) return res.status(400).json({ message: 'Incorrect credentials' });

      const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '8d',
      });

      console.log(user)

      const { name, lastName, email, _id } = user;

      return res.status(201).json({ message: 'login success', token, user: { fullName: `${name} ${lastName}`,email, _id } });
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  } else return res.status(400).json({ message: 'This method is not supported' });
};
