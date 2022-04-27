import { setCookies } from 'cookies-next';
import passport from 'passport';
import '../../../../../utils/mongoose';
import '../../../../../utils/passport';

export default async function (req, res, next) {
  passport.authenticate('auth-google', (error, user, info) => {
    if (error || !user) res.redirect('http://localhost:3000/?a=auth_fail');

    setCookies('manager-app-projects-user-token', info.token, { req, res });
    res.redirect('http://localhost:3000/dashboard');
  })(req, res, next);
}