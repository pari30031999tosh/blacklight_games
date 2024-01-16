import { MySQLHelper } from "../helper/index.helper.js"

export const fetchLeaderBoard = async ({skip, limit}) =>{
    try{
        let response ={
            status: 0,
            message: '',
            result: {}
        }
        let leaderBoard = MySQLHelper.executeQuery(`
            SELECT 
                us.Name AS user,
                us.Country AS country,
                us.score AS curr_week_score 
            FROM blacklight.user_score us
            WHERE YEARWEEK(us.created_at, 1) = YEARWEEK(NOW(), 1)
            ORDER BY us.score DESC
            LIMIT ${limit || 10} OFFSET ${skip || 0};
        `)
        
        let count = await MySQLHelper.executeQuery(`
        SELECT 
            count(1) AS count
        FROM blacklight.user_score us
        WHERE YEARWEEK(us.created_at, 1) = YEARWEEK(NOW(), 1)
        ORDER BY us.score DESC;
        `)

        if(leaderBoard && leaderBoard.length == 0){
            response.message = 'No scores are present for this week'
        }else{
            response.message = 'successfully fetched leaderboard'
        }
        response.status = 200,
        
        response.result = {
            data: leaderBoard,
            count: count[0].count
        }
        return {response:response}
    }catch(err){
        throw(err)
    }
}

export const fetchLeaderBoardByCountry = async ({skip, limit,country_code}) =>{
    
    try{
        let response ={
            status: 0,
            message: '',
            result: {}
        }
        //check if user exists
        
        let leaderBoard = await MySQLHelper.executeQuery(`
        SELECT 
            us.Name AS user,
            us.Country AS country,
            us.score AS curr_week_score 
        FROM blacklight.user_score us
        WHERE YEARWEEK(created_at, 1) = YEARWEEK(DATE_SUB(NOW(), INTERVAL 1 WEEK), 1) AND country = ${country_code}
        ORDER BY us.score DESC
        LIMIT ${limit || 10} OFFSET ${skip || 0};
        `)

        let count = await MySQLHelper.executeQuery(`
        SELECT 
            count(1) AS count
        FROM blacklight.user_score us
        WHERE YEARWEEK(created_at, 1) = YEARWEEK(DATE_SUB(NOW(), INTERVAL 1 WEEK), 1) AND country = ${country_code}
        ORDER BY us.score DESC
        ;
        `)

        if(leaderBoard && leaderBoard.length == 0){
            response.message = 'No scores are present for this week'
        }else{
            response.message = 'successfully fetched leaderboard'
        }
        response.status = 200,
        response.result = {
            data: leaderBoard,
            count: count[0].count
        }
        return {response:response}
    }catch(err){
        throw(err)
    }
}

export const fetchUserRank = async ({user_id}) => {

    try{
        let response ={
            status: 0,
            message: '',
            result: {}
        }
        //check if user exists
        
        let rank = await MySQLHelper.executeQuery(`
        SELECT uid, Name, total_score,
            RANK() OVER (ORDER BY total_score DESC) AS user_rank
        FROM (
            SELECT uid, Name, SUM(score) AS total_score
            FROM blacklight.user_score
            GROUP BY uid, Name
        ) AS user_scores
        WHERE uid = '${user_id}';
        `)
        
        if(rank && rank.length == 0){
            response.message = 'No scores are present for this user'
        }else{
            response.message = 'successfully fetched user rank'
        }
        
        response.status = 200,
        response.result = {
            data: rank[0]?.user_rank,
            
        }
        return {response:response}
    }catch(err){
        throw(err)
    }
}