import {expect, test} from '@oclif/test'

describe('Logout', () => {
  test
  .stdout()
  .command(['Logout'])
  .it('runs logout', ctx => {
    expect(ctx.stdout).to.contain('ogged')
  })
})
