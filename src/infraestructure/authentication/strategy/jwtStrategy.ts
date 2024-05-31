import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { serverConstants as constants } from '../../../config/constans';
import userRepository from '../../repository/UserRepository';
import { LoginDTO } from '../../../domain/dtos/loginDto';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: constants.jwt.secret,
};

  const verifyCallback = async (jwtPayload: LoginDTO, done: any) => {
    try {
      const user = await userRepository.findByEmail(jwtPayload.email);
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