// Copyright IBM Corp. 2013,2018. All Rights Reserved.
// Node module: loopback
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict'

let Promise = require('bluebird')
let assert = require('assert')
let expect = require('../../helpers/expect')

const helper = require('../../../modules/helper.js')

describe('helper.isDefined', function() {
  it('returns false for null', () => {
    const entry = null

    const expected = false

    const result = helper.isDefined(entry)

    expect(result).to.equal(expected)
  })

  it('returns false for undefined', () => {
    const entry = undefined

    const expected = false

    const result = helper.isDefined(entry)

    expect(result).to.equal(expected)
  })

  it('returns true for bool', () => {
    const entry = false

    const expected = true

    const result = helper.isDefined(entry)

    expect(result).to.equal(expected)
  })

  it('returns true for string', () => {
    const entry = 'false'

    const expected = true

    const result = helper.isDefined(entry)

    expect(result).to.equal(expected)
  })

  it('returns true for empty string', () => {
    const entry = ''

    const expected = true

    const result = helper.isDefined(entry)

    expect(result).to.equal(expected)
  })

  it('returns true for a number', () => {
    const entry = 10

    const expected = true

    const result = helper.isDefined(entry)

    expect(result).to.equal(expected)
  })
})
