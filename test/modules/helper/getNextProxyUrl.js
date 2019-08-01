// Copyright IBM Corp. 2013,2018. All Rights Reserved.
// Node module: loopback
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict'

let Promise = require('bluebird')
let assert = require('assert')
let expect = require('../../helpers/expect')

const helper = require('../../../modules/helper.js')

describe('helper.getNextProxyUrl', function() {
  it('returns empty', async () => {
    const expected = ''

    const result = await helper.getNextProxyUrl()

    expect(result).to.equal(expected)
  })
})
