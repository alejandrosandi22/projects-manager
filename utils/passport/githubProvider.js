import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

passport.use('auth-github', new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  passReqToCallback: true,
  callbackURL: 'https://projects-manager.alejandrosandi.com/api/auth/github/callback',
  scope: 'user:email',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      const newUser = await new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        provider: 'github',
      });

      const userForToken = {
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        _id: newUser._id,
      };

      const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '8d',
      });

      await newUser.save();

      return done(null, newUser, { message: 'Auth successful', token });
    }
    if (user.provider) {
      const userForToken = {
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        id: user._id,
      };
      const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '8d',
      });

      return done(null, user, { message: 'Auth successful', token });
    }
    done(error, false, 'User logged with email and password');
  } catch (error) {
    done(error, false, { message: error.message });
  }
}));
