import sql from 'mssql/msnodesqlv8.js';

var config = {
      server : "SHINBEAN\\SQL2024", 
      database: "TSHDB",
      driver:"msnodesqlv8",
      connectionString: "DSN=mssql",
      options :{
       trustedConnection:true,
     },
 };

 // connection pool
 const pool = new sql.ConnectionPool(config);

 export async function connectToDatabase() {
   try {
     await pool.connect();
     console.log('Connected to SQL Server');
   } catch (err) {
     console.error('Database connection failed: ', err);
     throw err;
   }
 }

 // disconnect from the database
 export async function cleanup() {
   try {
     await pool.close();
     console.log('Connection pool closed');
   } catch (err) {
     console.error('Error closing connection pool: ', err);
     throw err;
   }
 }
 

 export { pool, sql };

