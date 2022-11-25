import { Router } from 'express';

import client from './clients/index'

const router = Router();

router.use('/clients', client)

export default router;