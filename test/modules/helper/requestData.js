// Copyright IBM Corp. 2013,2018. All Rights Reserved.
// Node module: loopback
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict'

const Promise = require('bluebird')

const cheerio = require('cheerio')
const fs = require('fs')
const rp = require('request-promise')
const path = require('path')
const sinon = require('sinon')

const expect = require('../../helpers/expect')

const helper = require('../../../modules/helper.js')

let delayStub
before(function (done) {
  delayStub = sinon.stub(helper, 'delay').returns(Promise.resolve())
  done()
})

after(function (done) {
  delayStub.restore()
  done()
})

describe('helper.requestData', function () {
  it('retrievs (mocked) data successfully', async () => {
    const rpGetStub = sinon.stub(rp, 'Request').returns(Promise.resolve(cheerio.load(fs.readFileSync(path.join(__dirname, '/../../fixtures/hackernewsPage1.html')))))

    const result = await helper.requestData('http://www.google.de')

    expect(result.html().length).not.to.equal(0)

    rpGetStub.restore()
  })

  it('retrievs data successfully', async () => {
    const result = await helper.requestData('http://www.google.de')

    expect(result.html().length).not.to.equal(0)
  })
})
