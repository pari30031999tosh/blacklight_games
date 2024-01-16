
import {getLeaderBoard, getLeaderBoardByCountry, getUserRank} from '../controller/leaderBoard.controller.js'
import express from 'express'

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/leader-board/curr-week',getLeaderBoard)
leaderBoardRouter.get('/leader-board/:country_code',getLeaderBoardByCountry);
leaderBoardRouter.get('/user-rank/:user_id',getUserRank)

//getUserRank


export default leaderBoardRouter;