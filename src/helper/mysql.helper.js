import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
// import rabbitMQClient from './rabbitMQClient.js';

export const mySQLPoolDev = mysql.createPool({
  host: process.env.MYSQL_LOCAL_HOST,
  port: process.env.MYSQL_LOCAL_PORT,
  user: process.env.MYSQL_LOCAL_USER,
  password: process.env.MYSQL_LOCAL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 11,
  dateStrings: true,
  multipleStatements: false,
  charset: 'utf8mb4',
  socketPath: process.env.IS_SERVER == 'true'? '/var/run/mysqld/mysqld.sock' :'/tmp/mysql.sock'
});



export const mySQLPoolProd = mysql.createPool({
  host: process.env.MYSQL_PROD_HOST,
  user: process.env.MYSQL_PROD_USER,
  password: process.env.MYSQL_PROD_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


export const mySQLPool = process.env.NODE_ENV == "prod" ? mySQLPoolProd : mySQLPoolDev

export const executeQuery = async (query, data, connection=mySQLPool) => {
  
  try {
   // console.log(process.env.NODE_ENV,"env")
   // console.log(process.env,"ddddd")
    let testQuery = '';
    try {
      testQuery = query.trimLeft().substring(0, 6).toLowerCase();
    } catch (e) {
      throw e
    }
    if (testQuery === 'select') {
     query = query.replace(/select /i, "select /*+ MAX_EXECUTION_TIME(60000) */ ");
    }
   
    console.log("sql=======", query)
    const [result] = await connection.execute(query, data);
    return result;
  } catch (err) {
    console.log('error in sql:',err);
    throw err
  }
};


export const escape = (params) => {
  return mySQLPool.escape(params);
}



