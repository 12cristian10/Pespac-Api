import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { serverConstants as constants } from '../../config/constans';
import { DBconstants as db } from '../../config/constans';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: constants.jwt.secret,
};

interface JwtPayload {
    email: string;
    password: string;
    role: string;
  }
  
  const verifyCallback = async (jwtPayload: JwtPayload, done: any) => {
    try {
      const user = await userController.getUserByEmail(jwtPayload.email);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err);
    }
  };
  
  const jwtStrategy = new JwtStrategy(jwtOptions, verifyCallback);

  passport.use(jwtStrategy);

  export default passport;