import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../../utils/mongoose';
import User from '../../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method, body } = req;

  if (method === 'POST') {
    try {
      const user = await User.findOne({ email: body.email });

      if (user) return res.status(422).json({ message: 'User already exist' });

      const HashPassword = await bcrypt.hash(body.password, 12);
      const newUser = await new User({ ...body, password: HashPassword }).save();

      const token = jwt.sign({ userId: newUser.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '8d',
      });

      const { email, _id } = newUser;

      return res.status(201).json({ message: 'User created successfully', token, user: { email, _id } });
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  } else return res.redirect('/');
};
