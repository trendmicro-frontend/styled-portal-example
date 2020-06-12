import express from 'express';
import envcheck from './envcheck';
import healthcheck from './healthcheck';

const router = express.Router();

router.get('/envcheck', envcheck);
router.get('/healthcheck', healthcheck);

export default router;
