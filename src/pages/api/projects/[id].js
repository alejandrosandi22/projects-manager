import dbConnect from '../../../../utils/mongoose';
import Projects from '../../../../models/Projects';

dbConnect();

export default async (req, res) => {
  const { body, method, query: id } = req;

  if (method === 'GET') {
    console.log(id);
    return res.status(200).send(body);
  }
};
