import express from 'express';
import { setupAuthenticationStrategy } from '../auth';
import authRoutes from './authRoutes';
import apiRoutes from './apiRoutes';
import proxyRoutes from './proxyRoutes';
import staticRoutes from './staticRoutes';

setupAuthenticationStrategy();

const router = express.Router();

// Authentication routes
router.use(authRoutes);

// All routes exported from `apiRoutes` will get placed under the `/api` path.
router.use('/api', apiRoutes);

// Proxy requests to the API server endpoint
router.use('/proxy', proxyRoutes);

// Static routes
router.use(staticRoutes);

export default router;
