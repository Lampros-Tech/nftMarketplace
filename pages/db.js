//import mysql from 'serverless-mysql';
const { createPool } = require('mysql');

const pool = createPool({
    config:{
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    }
})

// export default async function excuteQuery({ query, values }) {
//     try {
//       const results = await db.query(query, values);
//       await db.end();
//       return results;
//     } 
//     catch (error) {
//       return { error };
//     }
// }

pool.getConnection((err)=>{
  if(err){
    console.log("DB not connected")
  } else {
    console.log("Connected to DB successfully.")
  }
})

module.exports = pool;