import express from 'express';
import ScoreController from '../controllers/score.controller';

const scoreRouter = express.Router();

scoreRouter.get('/', ScoreController.getScore);
scoreRouter.post('/', ScoreController.addScore);

export default scoreRouter;
