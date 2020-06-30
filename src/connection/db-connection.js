import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

var mysqlConnection = mysql.createConnection({
    host: process.env.host || 'localhost',
    user: process.env.user || 'root',
    password: process.env.password || 'Password',
    database: process.env.database || 'csci5410A2',
    multipleStatements: true
});

mysqlConnection.connect(function (err) {
    if (err) {
        console.log('Application cannot connect to MySQL database');
        throw err;
    }
    else {
        console.log(`Application is successfully connected to the database`);
    }
});
export default mysqlConnection