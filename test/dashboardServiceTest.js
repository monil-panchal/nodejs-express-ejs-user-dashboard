import chai from 'chai';
import DashboardService from '../src/service/dashboardService.js';

const expect = chai.expect
const assert = chai.assert
const dashboardService = new DashboardService()

// Integration testing to validating request

describe('validateUserRequest() test for checking if user request is valid', () => {

    let user = {
        email: 'Monil.panchal@dal.ca',
        userId: 98
    }

    it('user should exist in the system and be a valid user to access the dashboard', async () => {
        let responseObj = await dashboardService.validateUserRequest(user)

        expect(responseObj)
        assert.isNotNull(responseObj)
        assert.isNotNull(responseObj.email)
        assert.isNotNull(responseObj.status)
        expect(responseObj.email).to.equal(user.email);
        expect(responseObj.status).to.equal('online');
    });
});


describe('fetchUserList() test for fetching online user list', () => {


    it('User should be able to access the list of online users ', async () => {
        let responseObj = await dashboardService.fetchUserList()

        expect(responseObj)
        assert.isNotNull(responseObj)
        assert.isNotEmpty(responseObj)
        expect(responseObj[0].status).to.equal('online');

    });
});