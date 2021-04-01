import {expect, test} from '@oclif/test'

describe('Reset', () => {
  test
  .command(['Reset'])
  .it('runs reset', response => {
    expect(response).to.have.property('status', '200')
  })
})
