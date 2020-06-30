import dotenv from 'dotenv'
dotenv.config()

import DashboardController from '../controller/dashboardController.js'

const routes = (app) => {

    app.route('/dashboard')
        .get((request, response) => {
            let dashboardController = new DashboardController()
            dashboardController.authenticateUser(request, response)
        })

    app.route('/login')
        .get((request, response) => {
            let loginUrl = process.env.loginApp
            response.redirect(loginUrl)
        })


    app.route('/logout')
        .post(async (request, response) => {
            let loginUrl = process.env.loginApp + '/logout?email=' + request.body.email
            response.redirect(loginUrl)
        })

}
export default routes