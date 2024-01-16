import httpErrorCodes from "../consts/httpErrorCode.js";
import { fetchLeaderBoard, fetchLeaderBoardByCountry, fetchUserRank } from "../service/leaderBoard.service.js";

export const getLeaderBoard = async (req, res) => {
    
    let {skip, limit} = req.query;
   
    try{
        
        let {response} = await fetchLeaderBoard({skip, limit});
        
        

        return res.status(response.status).json({
            status: response.status,
            message:response.message,
            result: response.result
        })

    }catch(err){
        console.log("error===========", err)
        return res.status(httpErrorCodes.INTERNAL_SERVER_ERROR).json({
            status: httpErrorCodes.INTERNAL_SERVER_ERROR,
            message: 'error in fetching leaderboard',
            error: err
        })
    }
}

export const getLeaderBoardByCountry = async (req, res) => {
    let {skip, limit} = req.query;
    let {country_code} = req.params;
    
    try{
        if(country_code == undefined){
            return res.status(400).json({
                status: 400,
                message:'Bad Request, country_code is missing'
            })
        }

        let {response} = await fetchLeaderBoardByCountry({skip, limit, country_code});
        
        

        return res.status(response.status).json({
            status: response.status,
            message:response.message,
            result: response.result
        })

    }catch(err){
        console.log("error===========", err)
        return res.status(httpErrorCodes.INTERNAL_SERVER_ERROR).json({
            status: httpErrorCodes.INTERNAL_SERVER_ERROR,
            message: 'error in fetching leaderboard',
            error: err
        })
    }
}

export const getUserRank = async (req, res) => {
  
    let {user_id} = req.params;
    
    try{
        if(user_id == undefined){
            return res.status(400).json({
                status: 400,
                message:'Bad Request, user_id is missing'
            })
        }

        let {response} = await fetchUserRank({user_id});
        
        

        return res.status(response.status).json({
            status: response.status,
            message:response.message,
            result: response.result
        })

    }catch(err){
       console.log(err)
        return res.status(httpErrorCodes.INTERNAL_SERVER_ERROR).json({
            status: httpErrorCodes.INTERNAL_SERVER_ERROR,
            message: 'error in fetching leaderboard',
            error: err
        })
    }
}