import leaderBoardRouter from './leaderBoard.router.js'
import express from 'express'
 
const ApiRouter = express.Router();

ApiRouter.use('/leader-board',leaderBoardRouter)

export default ApiRouter;