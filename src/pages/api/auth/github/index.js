import passport from 'passport';
import dbConnect from '../../../../../utils/mongoose';
import '../../../../../utils/passport';

dbConnect();

export default async function (req, res, next) {
  passport.authenticate('auth-github', {
    scope: ['user:email'],
  })(req, res, next);
}
