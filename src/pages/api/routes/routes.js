import { dbConnect } from '../../../../utils/mongoose';

dbConnect();

export default function(req, res) {
  res.status(200).json({name: "test"});
}