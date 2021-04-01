import {expect, test} from '@oclif/test'

describe('Login', () => {
    test
    .nock('https://localhost:8765/energy/api', api => api
        .get('/Login')
        .reply(200)
    )
    .stdout
    .command(['Login', '--username', 'admin', '--passw', '321nimda'])
    .it('runs Login for admin', ctx => {
        expect(ctx.stdout).to.contain('200')
    })

    test
    .stdout()
    .command(['Login', '--username', 'admin', '--passw', '321nimda'])
    .it('runs Login for admin', ctx => {
        expect(ctx.stdout).to.contain('200')
    })

    test
    .stdout()
    .command(['Login', '--username', 'admin', '--passw', 'lalala'])
    .it('runs Login with false credentials', ctx => {
        expect(ctx.stdout).to.contain('401')
    })
})

/*
describe('Login', () => {
    test
    .command(['Login', '--username', 'admin', '--passw', '321nimda'])
    .it('runs Login for admin', response => {
        expect(response).to.have.property('status', 200)
    })

    test
    .command(['Login', '--username', 'admin', '--passw', '321nimda'])
    .it('runs Login with false credentials', response => {
        expect(response).to.have.property('status', 401)
    })
})
*/
