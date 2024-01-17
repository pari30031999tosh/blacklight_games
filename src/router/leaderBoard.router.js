
import {dummyToken, getLeaderBoard, getLeaderBoardByCountry, getUserRank} from '../controller/leaderBoard.controller.js'
import express from 'express'
import { authenticate } from '../middleware/authenticate.middleware.js';


const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/leader-board/curr-week',authenticate, getLeaderBoard)
leaderBoardRouter.get('/leader-board/:country_code',authenticate, getLeaderBoardByCountry);
leaderBoardRouter.get('/user-rank/:user_id',authenticate, getUserRank)
leaderBoardRouter.get('/generate-dummy-token', dummyToken)
//dummyToken
//getUserRank


export default leaderBoardRouter;