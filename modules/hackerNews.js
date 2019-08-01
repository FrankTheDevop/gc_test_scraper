'use strict'

const Promise = require('bluebird')
const stringSaw = require('string-saw')

const helper = require('./helper')

const extract = ($, block, query, variant = 'text') => {
  if (!helper.isDefined($)) {
    throw new Error('$ is not set')
  }

  if (!helper.isDefined(block)) {
    throw new Error('Block is not set')
  }

  if (!helper.isDefined(query) || query === '') {
    throw new Error('Query is not set')
  }

  if (variant !== 'text' && variant !== 'href') {
    throw new Error(`Unknown variant ${variant}`)
  }

  let returnValue = ''

  let result
  if (variant === 'text') {
    result = $(query, block).text()
  } else if (variant === 'href') {
    result = $(query, block).attr('href')
  }

  if (helper.isDefined(result) && result.length > 0) {
    returnValue = result
  }

  return returnValue
}

const extractLink = ($, block) => {
  const query = 'tr.athing > td.title > a'
  const variant = 'href'

  return stringSaw(extract($, block, query, variant)).toObject('link')
}

const extractTitle = ($, block) => {
  const query = 'tr.athing > td.title > a'
  const variant = 'text'

  return stringSaw(extract($, block, query, variant)).toObject('title')
}

const extractUsername = ($, block) => {
  const query = 'tr > td.subtext > a.hnuser'
  const variant = 'text'

  return stringSaw(extract($, block, query, variant)).toObject('username')
}

const preProcess = (data) => {
  return stringSaw(data).replace(/\u00a0/g, ' ').toString()
}

const postProcess = (data, seperator) => {
  let returnValue = ''
  const splitted = data.split(seperator)

  if (splitted.length === 2) {
    returnValue = splitted[0]
  }

  return returnValue
}

const postProcessComments = (data) => {
  const temp = preProcess(data)
  return postProcess(temp, ' ')
}

const postProcessPoints = (data) => {
  return postProcess(data, ' ')
}

const extractPoints = ($, block) => {
  const query = 'tr > td.subtext > span.score'
  const variant = 'text'

  const result = extract($, block, query, variant)

  return stringSaw(postProcessPoints(result)).toObject('points')
}

const extractComments = ($, block) => {
  const query = 'tr > td.subtext > a[href*="item?id="]'
  const variant = 'text'

  const result = extract($, block, query, variant)

  return stringSaw(postProcessComments(result)).toObject('comments')
}

const extractData = ($, block1, block2) => {
  if (!helper.isDefined($)) {
    throw new Error('$ is not set')
  }

  if (!helper.isDefined(block1)) {
    throw new Error('Block1 is not set')
  }

  if (!helper.isDefined(block2)) {
    throw new Error('Block2 is not set')
  }

  let obj = {}

  obj = Object.assign({},
    module.exports.extractTitle($, block1),
    module.exports.extractPoints($, block2),
    module.exports.extractComments($, block2),
    module.exports.extractLink($, block1))
  return obj
}

const constructUrl = (baseUrl, pageNumber) => {
  if (!helper.isDefined(baseUrl) || baseUrl === '') {
    throw new Error('BaseUrl is not set')
  }

  if (!helper.isDefined(pageNumber) || pageNumber < 0) {
    throw new Error('PageNumber is not set')
  }

  let paginationLink = ''
  if (pageNumber > 0) {
    paginationLink = `news?p=${pageNumber}`
  }

  return `${baseUrl}${paginationLink}`
}

async function start (numberOfPages = 1) {
  const baseUrl = 'https://news.ycombinator.com/'

  const results = []
  let $ = null

  for (let i = 0; i < numberOfPages; i++) {
    $ = await helper.requestData(constructUrl(baseUrl, i))

    let entriesOnThisPage = $('tr > td > table.itemlist > tbody')

    const childs = entriesOnThisPage.children()

    for (let i = 0; i < childs.length; i += 3) {
      // Normally I would send a RabbitMQ (or similar Message via a MessageQueue) out here with the content of:
      // cheerio.load(childs[i]).html()
      // The receiver would then handle:
      // const result = extractData($, childs[i], childs[i + 1])
      // After that is finished I would send out the next message with the content of result
      // The receiver handles further processing / saving
      const result = extractData($, childs[i], childs[i + 1])
      if (Object.keys(result).length > 0) {
        results.push(result)
      }
    }
  }
  console.log(results)
}

module.exports = {
  constructUrl,
  extract,
  extractData,
  extractComments,
  extractLink,
  extractPoints,
  extractTitle,
  extractUsername,
  start,
}
