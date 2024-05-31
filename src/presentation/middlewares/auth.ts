import { Request, Response, NextFunction } from 'express';
import { LoginDTO as login} from '../../domain/dtos/loginDto';
import passport from '../../infraestructure/authentication/strategy/jwtStrategy';

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false })(req, res, next);
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const userRole = (req.user as any).role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};