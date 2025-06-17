import express from 'express';
import cont from '../controllers/controller.js'

const router = express.Router();

router.get("/", cont.home);
router.post("/generate", cont.generate);
router.post("/question", cont.question);

export default router;