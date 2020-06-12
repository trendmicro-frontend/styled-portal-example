import express from 'express';
import passport from 'passport';
import serveStatic from 'serve-static';
import store from '../store';

const router = express.Router();

// Static resources
const staticRoot = store.get('server.staticRoot');

router.use(
  passport.authenticate('jwt', { session: false }),
  serveStatic(staticRoot),
);

/* TODO: Send every request to the app
router.get('*', (req, res) => {
  res.sendFile(path.resolve(staticRoot, 'index.html'));
});
*/

export default router;
