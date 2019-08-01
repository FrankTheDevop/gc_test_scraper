// Copyright IBM Corp. 2013,2018. All Rights Reserved.
// Node module: loopback
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict'

let Promise = require('bluebird')

let assert = require('assert')
const cheerio = require('cheerio')
let expect = require('../../helpers/expect')
const fs = require('fs')

const hackerNews = require('../../../modules/hackerNews')

describe('hackerNews.extractPoints', function() {
  it('rejects null block', () => {
    const block = null
    const $ = {}

    try {
      const result = hackerNews.extractPoints($, block)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`Block is not set`)
    }
  })

  it('rejects undefined block', () => {
    const block = null
    const $ = {}

    try {
      const result = hackerNews.extractPoints($, block)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`Block is not set`)
    }
  })

  it('rejects null $', () => {
    const block = {}
    const $ = null

    try {
      const result = hackerNews.extractPoints($, block)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`$ is not set`)
    }
  })

  it('rejects undefined $', () => {
    const block = {}
    const $ = undefined

    try {
      const result = hackerNews.extractPoints($, block)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`$ is not set`)
    }
  })

  it('returns the correct points', () => {
    const expected = '494'

    const text = fs.readFileSync(__dirname + '/../../fixtures/hackernewsPage1.html')
    const $ = cheerio.load(text)

    const entriesOnThisPage = $('tr > td > table.itemlist > tbody')
    const childs = entriesOnThisPage.children()
    const block = childs[1]

    try {
      const result = hackerNews.extractPoints($, block)
      expect(result.points).to.equal(expected)
    } catch (e) {
      expect(e).to.equal(undefined)
    }
  })

  it('returns nothing if a points can´t be found', () => {
    const expected = undefined

    const text = fs.readFileSync(__dirname + '/../../fixtures/hackernewsPage1NoData.html')
    const $ = cheerio.load(text)

    const entriesOnThisPage = $('tr > td > table.itemlist > tbody')
    const childs = entriesOnThisPage.children()
    const block = childs[0]

    try {
      const result = hackerNews.extractPoints($, block)

      expect(result.points).to.equal(expected)
    } catch (e) {
      expect(e).to.equal(undefined)
    }
  })
})
