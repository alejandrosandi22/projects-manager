import dbConnect from '../../../../utils/mongoose';
import User from '../../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method, body, query: { id } } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case 'PUT':
      try {
        const updateUser = await User.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!updateUser) return res.status(404).json({ msg: 'User not found' });
        return res.status(200).json(updateUser);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case 'DELETE':
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ msg: 'User not found' });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }

    default:
      return res.status(400).json({ msg: 'The method is not supported' });
  }
};
