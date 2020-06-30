import joi from 'joi'
import DashboardService from '../service/dashboardService.js'
import jwt from 'jsonwebtoken'

// Schema for fetching user service
const userLoginSchema = joi.object().keys({

    // JobID is required
    userId: joi.string().required(),

    token: joi.string().optional()

});

// Controller class for handling user operation
class DashboardController {
    userLoginSchema

    constructor() {
    }

    async authenticateUser(request, response) {
        try {
            // validating the user login body against the schema
            joi.validate(request.query, userLoginSchema, async (err, value) => {

                //If schema validation fails, send error response
                if (err) {
                    console.log(err)
                    var message = err;
                    response.render('error', { error: message });
                }
            });

            //If schema validation passes, proceed with the service call.

            // check if JWT token is present in the request
            const authHeader = request.headers.cookie;

            let userObj = {
                userId: request.query.userId,
                token: request.query.token
            }
            const token = userObj.token

            if (token) {
    
                console.log(`Requesting service method for fetching of the user: ${userObj.userId}`)

                let dashBoardService = new DashboardService()

                // Step -1 
                // Fetch user with email id
                let userFromDB = await dashBoardService.validateUserRequest(userObj)

                if (!userFromDB) {
                    throw Error(`Error in fetching the user: ${request.query.userId}`)
                }

                // Step -2 
                // Compare token authenticity

                var secret_key = userFromDB.secret_key;

                // decode the access token using the secret key and 
                // check the user authenticity as well as active session 
                jwt.verify(token, secret_key, async (err, user) => {
                    if (err) {
                        let errRes = {
                            'message': 'Uh no! Cannot sign you in. Please login or register.'
                        }
                        response.render('error', { error: errRes });
                    }
                })

                let userList = await dashBoardService.fetchUserList()
                let userRes = {
                    'firstName': userFromDB.first_name,
                    'email': userFromDB.email,
                    'userList': userList
                }


                response.render('success', { success: userRes })
            }
            else {
                let res = {
                    'message': 'You are not authorized to view this page. Please login to proceed.'
                }
                response.render('error', { error: res })
            }


        } catch (e) {
            console.error(`Error in fetching the user dashboard: ${request.query.userId}`)
            console.error(e)
            response.render('error', { error: e });
        }
    }

}
export default DashboardController