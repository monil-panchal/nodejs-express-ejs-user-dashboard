import mysqlConnection from '../connection/db-connection.js'

// Service class for handling user operation
class DashboardService {

    constructor() {
    }

    async validateUserRequest(user) {
        return new Promise(function (resolve, reject) {

            try {
                let userObj = {
                    userId: user.userId
                }

                console.log(`Fetching the details of the user: ${userObj.userId}`)

                // MySQL DB query
                let selectUserQuery = 'SELECT * FROM user as u INNER JOIN user_session as us ON u.user_id = us.user_id WHERE u.user_id = ?';

                // MySQL query execution
                mysqlConnection.query(selectUserQuery, [userObj.userId], async function (err, rows) {
                    if (err) {
                        console.error(err)
                        let err_response = {
                            error: `Cannot fetch user details with id : ${userObj.userId}. Please try again`,
                            messsage: err.sqlMessage
                        };

                        reject(err_response.error)
                    } else {

                        if (rows.length > 0) {
                            console.log(`User data with id : ${userObj.userId} is retrieved successfully.`)
                            console.log(rows[0])

                            var userFromDb = rows[0];

                            if (userFromDb
                                && userFromDb.status
                                && userFromDb.status === 'online') {

                                resolve(userFromDb)
                            }
                            else {
                                var errorObj = `User with id ${userObj.userId} not found in the system. Please try again.`
                                console.log(errorObj)
                                reject(errorObj)
                            }
                        }
                        else {
                            var errorObj = `User with id ${userObj.userId} not found in the system. Please register.`
                            console.log(errorObj)
                            reject(errorObj)
                        }
                    }
                })
            }
            catch (e) {
                console.error(`Error in fetching the user: ${user.userId}`)
                console.error(e)
                throw Error(e)
            }
        })
    }

    async fetchUserList() {

        return new Promise(function (resolve, reject) {

            try {

                // fetch all user 
                let selectUserQuery = 'SELECT u.first_name, u.email, us.status, us.login_time FROM user as u INNER JOIN user_session as us ON u.user_id = us.user_id WHERE us.status = ?';
                // MySQL DB query for fetching the user session
                mysqlConnection.query(selectUserQuery, 'online', async function (err, rows) {
                    console.log(rows)

                    if (err) {
                        console.error(err)
                        let err_response = {
                            error: `Cannot fetch user list`,
                            messsage: err
                        };

                        reject(err_response)
                    } else {
                        var userList = rows
                        resolve(userList)
                    }
                })

            } catch (e) {
                console.error(`Error in creating the user: ${userFromDb.email}`)
                console.error(e)
                throw Error(e)
            }
        })

    }
}
export default DashboardService