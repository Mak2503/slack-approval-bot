import { Router } from "express";
import { handleCommand, handleInteraction } from '../services/approval.js';

const router = Router();

router.post('/events/command', handleCommand);
router.post('/interactions', handleInteraction);

export default router;