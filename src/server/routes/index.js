import express from 'express';
import { setupAuthenticationStrategy } from '../auth';
import apiRoutes from './api';
//import authRoutes from './authRoutes';
//import proxyRoutes from './proxyRoutes';
import staticRoutes from './staticRoutes';

setupAuthenticationStrategy();

const router = express.Router();

// Authentication routes
//router.use(authRoutes);

// Proxy requests to the backend API server endpoint
//router.use('/proxy', proxyRoutes);

// All routes exported from `apiRoutes` will get placed under the `/api` path.
router.use('/api', apiRoutes);

// Static routes
router.use(staticRoutes);

export default router;
