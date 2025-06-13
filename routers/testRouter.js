import express from 'express';
import cont from '../controllers/testController.js'

const testRouter = express.Router();

testRouter.get("/", cont.test);
testRouter.get("/home", cont.home);
testRouter.post("/generate", cont.generate);

export default testRouter;