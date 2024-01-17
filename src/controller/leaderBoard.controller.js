import httpErrorCodes from "../consts/httpErrorCode.js";
import { generateToken } from "../service/auth.service.js";
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

export const dummyToken = async (req, res) => {
    try{
        let token = generateToken();
        res.cookie('x-blight-token', token, {
            path:"/",
            domain: 'localhost',
            httpOnly: true,
            secure: true,
            sameSite:'None',
            maxAge: 36000000000
        });
        return res.status(200).json({
            status: 200,
            message: 'token is set as cookie',
        })
    }catch(err){
        console.log("err======", err)
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: err
        })
    }
    
}