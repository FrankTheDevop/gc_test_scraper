// Copyright IBM Corp. 2013,2018. All Rights Reserved.
// Node module: loopback
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict'

let Promise = require('bluebird')

const assert = require('assert')
const cheerio = require('cheerio')
const expect = require('../../helpers/expect')
const fs = require('fs')
const sinon = require('sinon')

const hackerNews = require('../../../modules/hackerNews')

describe('hackerNews.extractData', function() {
  it('rejects null block1', () => {
    const block1 = null
    const block2 = null
    const $ = {}

    try {
      const result = hackerNews.extractData($, block1, block2)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`Block1 is not set`)
    }
  })

  it('rejects undefined block1', () => {
    const block1 = undefined
    const block2 = undefined

    const $ = {}

    try {
      const result = hackerNews.extractData($, block1, block2)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`Block1 is not set`)
    }
  })

  it('rejects null block2', () => {
    const block1 = {}
    const block2 = null
    const $ = {}

    try {
      const result = hackerNews.extractData($, block1, block2)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`Block2 is not set`)
    }
  })

  it('rejects undefined block2', () => {
    const block1 = {}
    const block2 = undefined

    const $ = {}

    try {
      const result = hackerNews.extractData($, block1, block2)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`Block2 is not set`)
    }
  })

  it('rejects null $', () => {
    const block1 = {}
    const block2 = undefined
    const $ = null

    try {
      const result = hackerNews.extractData($, block1, block2)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`$ is not set`)
    }
  })

  it('rejects undefined $', () => {
    const block1 = {}
    const block2 = undefined
    const $ = undefined

    try {
      const result = hackerNews.extractData($, block1, block2)
      expect(true).to.equal(false)
    } catch (e) {
      expect(e).not.to.equal(undefined)
      expect(e.message).to.equal(`$ is not set`)
    }
  })

  it('calls the correct functions (stub)', () => {
    const expected = {
      points: '1',
      comments: '2',
      title: 'title',
      link: 'link'
    }
    //const extractTitleSpy = sinon.spy(hackerNews, 'extractTitle')

    let extractTitleStubCalls = 0
    let extractPointsStubCalls = 0
    let extractCommentsStubCalls = 0
    let extractLinkStubCalls = 0


    const extractTitleStub = sinon.stub(hackerNews, 'extractTitle', function($, block) {
      extractTitleStubCalls++
      return {title: 'title'}
    })

    const extractPointsStub = sinon.stub(hackerNews, 'extractPoints', function($, block) {
      extractPointsStubCalls++
      return {points: '1'}
    })

    const extractCommentsStub = sinon.stub(hackerNews, 'extractComments', function($, block) {
      extractCommentsStubCalls++
      return {comments: '2'}
    })

    const extractLinkStub = sinon.stub(hackerNews, 'extractLink', function($, block) {
      extractLinkStubCalls++
      return {link: 'link'}
    })

    const text = fs.readFileSync(__dirname + '/../../fixtures/hackernewsPage1.html')
    const $ = cheerio.load(text)

    const entriesOnThisPage = $('tr > td > table.itemlist > tbody')
    const childs = entriesOnThisPage.children()

    try {
      const result = hackerNews.extractData($, childs[0], childs[1])
      expect(result.title).to.equal(expected.title)
      expect(result.points).to.equal(expected.points)
      expect(result.comments).to.equal(expected.comments)
      expect(result.link).to.equal(expected.link)

      expect(extractCommentsStubCalls).to.equal(1)
      expect(extractLinkStubCalls).to.equal(1)
      expect(extractPointsStubCalls).to.equal(1)
      expect(extractTitleStubCalls).to.equal(1)

      extractTitleStub.restore()
      extractCommentsStub.restore()
      extractLinkStub.restore()
      extractPointsStub.restore()

    // expect(hackerNews.extractTitle.called).to.equal(true)
    } catch (e) {
      console.error(e)
      expect(e).to.equal(undefined)
    }
  })

  it('calls the correct functions (spy)', () => {
    const expected = {
      points: '494',
      comments: '128',
      title: 'LightSail 2 Spacecraft Successfully Demonstrates Flight by Light',
      link: 'http://www.planetary.org/blogs/jason-davis/lightsail-2-successful-flight-by-light.html'
    }
    const extractTitleSpy = sinon.spy(hackerNews, 'extractTitle')
    const extractLinkSpy = sinon.spy(hackerNews, 'extractLink')
    const extractPointsSpy = sinon.spy(hackerNews, 'extractPoints')
    const extractCommentsSpy = sinon.spy(hackerNews, 'extractComments')


    const text = fs.readFileSync(__dirname + '/../../fixtures/hackernewsPage1.html')
    const $ = cheerio.load(text)

    const entriesOnThisPage = $('tr > td > table.itemlist > tbody')
    const childs = entriesOnThisPage.children()

    try {
      const result = hackerNews.extractData($, childs[0], childs[1])
      expect(result.title).to.equal(expected.title)
      expect(result.points).to.equal(expected.points)
      expect(result.comments).to.equal(expected.comments)
      expect(result.link).to.equal(expected.link)

      expect(hackerNews.extractTitle.calledOnce).to.equal(true)
      expect(hackerNews.extractLink.calledOnce).to.equal(true)
      expect(hackerNews.extractPoints.calledOnce).to.equal(true)
      expect(hackerNews.extractComments.calledOnce).to.equal(true)

      extractTitleSpy.restore()
      extractCommentsSpy.restore()
      extractLinkSpy.restore()
      extractPointsSpy.restore()
    } catch (e) {
      console.error(e)
      expect(e).to.equal(undefined)
    }
  })
})
