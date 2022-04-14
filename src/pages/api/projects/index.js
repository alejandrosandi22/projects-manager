import dbConnect from '../../../../utils/mongoose';
import Projects from '../../../../models/Projects';

dbConnect();

export default async (req, res) => {
  const { body, method } = req;

  if (method === 'GET') {
    return res.status(200).send('Get', body);
  }
  if (method === 'POST') {
    await Projects(body).save();

    return res.status(200).send(body);
  }
};
