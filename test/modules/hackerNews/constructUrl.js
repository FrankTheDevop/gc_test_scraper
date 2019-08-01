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

describe('hackerNews.constructUrl', function() {
  it('rejects null baseUrl', () => {
    const baseUrl = null
    const pageNumber = 0

    try {
      const result = hackerNews.constructUrl(baseUrl, pageNumber)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`BaseUrl is not set`)
    }
  })

  it('rejects undefined baseUrl', () => {
    const baseUrl = undefined
    const pageNumber = 0

    try {
      const result = hackerNews.constructUrl(baseUrl, pageNumber)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`BaseUrl is not set`)
    }
  })

  it('rejects empty string baseUrl', () => {
    const baseUrl = ''
    const pageNumber = 0

    try {
      const result = hackerNews.constructUrl(baseUrl, pageNumber)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`BaseUrl is not set`)
    }
  })

  it('rejects null pageNumber', () => {
    const baseUrl = 'https://news.ycombinator.com/'
    const pageNumber = null

    try {
      const result = hackerNews.constructUrl(baseUrl, pageNumber)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`PageNumber is not set`)
    }
  })

  it('rejects undefined pageNumber', () => {
    const baseUrl = 'https://news.ycombinator.com/'
    const pageNumber = undefined

    try {
      const result = hackerNews.constructUrl(baseUrl, pageNumber)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`PageNumber is not set`)
    }
  })

  it('rejects negative pageNumber', () => {
    const baseUrl = 'https://news.ycombinator.com/'
    const pageNumber = -1

    try {
      const result = hackerNews.constructUrl(baseUrl, pageNumber)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`PageNumber is not set`)
    }
  })

  it('creates the url as the baseUrl for pageNumber 0 correctly', () => {
    const baseUrl = 'https://news.ycombinator.com/'
    const pageNumber = 0

    try {
      const result = hackerNews.constructUrl(baseUrl, pageNumber)
      expect(result).to.equal(baseUrl)
    } catch (e) {
      expect(e).to.equal(undefined)
    }
  })

  it('creates the url correctly for pageNumber 1', () => {
    const baseUrl = 'https://news.ycombinator.com/'
    const pageNumber = 1
    const expected = `${baseUrl}news?p=${pageNumber}`

    try {
      const result = hackerNews.constructUrl(baseUrl, pageNumber)
      expect(result).to.equal(expected)
    } catch (e) {
      expect(e).to.equal(undefined)
    }
  })
})
