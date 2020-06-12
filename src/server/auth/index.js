import passport from 'passport';
import devStrategy from './devStrategy';
import jwtStrategy from './jwtStrategy';
//import localStrategy from './localStrategy';
import samlStrategy from './samlStrategy';

export const setupAuthenticationStrategy = () => {
  passport.use('dev', devStrategy());
  passport.use('jwt', jwtStrategy());
  //passport.use('local', localStrategy()); // TODO: local account/password
  passport.use('saml', samlStrategy());
};
