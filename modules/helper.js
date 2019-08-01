'use strict'

const Promise = require('bluebird')
const cheerio = require('cheerio')
const rp = require('request-promise')

const isDefined = (variable) => {
  return !(variable === null || variable === undefined)
}

/**
 * Returns the formatted url of the next proxy server to loadbalance
 * TODO: Finish implementation with real scenario
 * @returns {Promise<string>}
 */
async function getNextProxyUrl () {
  // const proxyUrl = 'http://username:password@ip:port'
  const proxyUrl = ''

  return Promise.resolve(proxyUrl)
}

async function delay (min = 10, max = 60) {
  return Promise
    .delay(Math.random() * ((max - min) + min) * 1000)
}

async function requestData (address) {
  const proxyUrl = await getNextProxyUrl()
  const options = {
    uri: address,
    transform: (body) => {
      return cheerio.load(body)
    },
  }

  if (isDefined(proxyUrl) && proxyUrl !== '') {
    options.proxy = proxyUrl
  }

  await delay()

  const $ = await rp(options)

  return Promise.resolve($)
}

module.exports = {
  delay,
  isDefined,
  getNextProxyUrl,
  requestData,
}
