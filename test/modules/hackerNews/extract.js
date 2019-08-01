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

describe('hackerNews.extract', function () {
  it('rejects unknown variant', () => {
    const variant = 'dude'
    const block = {}
    const $ = {}
    const query = 'test'

    const expected = false

    try {
      const result = hackerNews.extract($, block, query, variant)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`Unknown variant ${variant}`)
    }
  })

  it('rejects empty string query', () => {
    const variant = 'dude'
    const block = {}
    const $ = {}
    const query = ''

    try {
      const result = hackerNews.extract($, block, query, variant)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal('Query is not set')
    }
  })

  it('rejects null string query', () => {
    const variant = 'dude'
    const block = {}
    const $ = {}
    const query = null

    try {
      const result = hackerNews.extract($, block, query, variant)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal('Query is not set')
    }
  })

  it('rejects undefined string query', () => {
    const variant = 'dude'
    const block = {}
    const $ = {}
    const query = undefined

    try {
      const result = hackerNews.extract($, block, query, variant)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal('Query is not set')
    }
  })

  it('rejects null block', () => {
    const variant = 'text'
    const block = null
    const $ = {}
    const query = 'test'

    try {
      const result = hackerNews.extract($, block, query, variant)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`Block is not set`)
    }
  })

  it('rejects undefined block', () => {
    const variant = 'text'
    const block = null
    const $ = {}
    const query = 'test'

    try {
      const result = hackerNews.extract($, block, query, variant)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`Block is not set`)
    }
  })

  it('rejects null $', () => {
    const variant = 'text'
    const block = {}
    const $ = null
    const query = 'test'

    try {
      const result = hackerNews.extract($, block, query, variant)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`$ is not set`)
    }
  })

  it('rejects undefined $', () => {
    const variant = 'text'
    const block = {}
    const $ = undefined
    const query = 'test'

    try {
      const result = hackerNews.extract($, block, query, variant)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`$ is not set`)
    }
  })

  it('returns the correct text when called like title', () => {
    const expected = 'LightSail 2 Spacecraft Successfully Demonstrates Flight by Light'

    const text = fs.readFileSync(__dirname + '/../../fixtures/hackernewsPage1.html')
    const $ = cheerio.load(text)
    const query = 'tr.athing > td.title > a'
    const entriesOnThisPage = $('tr > td > table.itemlist > tbody')
    const childs = entriesOnThisPage.children()
    const block = childs[0]

    try {
      const result = hackerNews.extract($, block, query, 'text')
      expect(result).to.equal(expected)
    } catch (e) {
      expect(e).to.equal(undefined)
    }
  })

  it('returns the correct text when called like title but without specifying variant', () => {
    const expected = 'LightSail 2 Spacecraft Successfully Demonstrates Flight by Light'

    const text = fs.readFileSync(__dirname + '/../../fixtures/hackernewsPage1.html')
    const $ = cheerio.load(text)
    const query = 'tr.athing > td.title > a'
    const entriesOnThisPage = $('tr > td > table.itemlist > tbody')
    const childs = entriesOnThisPage.children()
    const block = childs[0]

    try {
      const result = hackerNews.extract($, block, query)
      expect(result).to.equal(expected)
    } catch (e) {
      expect(e).to.equal(undefined)
    }
  })

  it('returns the correct text when called like link', () => {
    const expected = 'http://www.planetary.org/blogs/jason-davis/lightsail-2-successful-flight-by-light.html'

    const text = fs.readFileSync(__dirname + '/../../fixtures/hackernewsPage1.html')
    const $ = cheerio.load(text)
    const query = 'tr.athing > td.title > a'
    const entriesOnThisPage = $('tr > td > table.itemlist > tbody')
    const childs = entriesOnThisPage.children()
    const block = childs[0]

    try {
      const result = hackerNews.extract($, block, query, 'href')
      expect(result).to.equal(expected)
    } catch (e) {
      expect(e).to.equal(undefined)
    }
  })

  it('returns nothing if a title can´t be found', () => {
    const expected = ''

    const text = fs.readFileSync(__dirname + '/../../fixtures/hackernewsPage1NoData.html')
    const $ = cheerio.load(text)
    const query = 'tr.athing > td.title > a'
    const entriesOnThisPage = $('tr > td > table.itemlist > tbody')
    const childs = entriesOnThisPage.children()
    const block = childs[0]

    try {
      const result = hackerNews.extract($, block, query, 'href')

      expect(result).to.equal(expected)
    } catch (e) {
      expect(e).to.equal(undefined)
    }
  })
})
