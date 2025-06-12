import express from 'express';
import cont from '../controllers/testController.js'

const testRouter = express.Router();

testRouter.get("/", cont.test);
testRouter.post("/generate", cont.generate);

export default testRouter;