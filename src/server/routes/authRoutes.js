import chalk from 'chalk';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import logger from '../lib/logger';
import store from '../store';

const log = logger('routes:auth');

const router = express.Router();

// Entry point
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login',
  }),
);

router.get(
  '/login',
  passport.authenticate('saml', { session: false }),
);

router.post(
  '/adfs',
  passport.authenticate('saml', { session: false }),
  (req, res) => {
    const { id: displayname } = { ...req.user };
    res.cookie('displayname', displayname);

    { // Generate a signed JWT and set the token to cookie
      const payload = req.user;
      const secretKey = store.get('env.jwtSecretKey');
      const token = jwt.sign(payload, secretKey, {
        expiresIn: '1d',
      });
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
      });
    }

    res.redirect('/');
  },
);

router.get(
  '/logout',
  (req, res) => {
    const user = { ...req.user };
    if (user && user.id) {
      log.info(`${chalk.yellow(user.id)} has been signed out of the portal`);
    }

    // Web browsers and other compliant clients will only clear the cookie if the given options is identical to those given to res.cookie(), excluding expires and maxAge.
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
    });

    const logoutUrl = store.get('env.samlLogoutUrl');
    res.redirect(logoutUrl);
  },
);

export default router;
