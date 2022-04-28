import { setCookies } from 'cookies-next';
import passport from 'passport';
import '../../../../../utils/mongoose';
import '../../../../../utils/passport';

export default async function (req, res, next) {
  passport.authenticate('auth-facebook', (error, user, info) => {
    if (error || !user) res.redirect('https://projects-manager.alejandrosandi.com/?a=auth_fail');

    setCookies('manager-app-projects-user-token', info.token, { req, res });
    res.redirect('https://projects-manager.alejandrosandi.com/dashboard');
  })(req, res, next);
}
