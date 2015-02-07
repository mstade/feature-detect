#!/usr/bin/env node

var path   = require('path')

try {
  var target = require(path.join(process.cwd(), process.argv[2]))
    , result = require('../lib/execute')(target)

  if (!result.success) {
    console.error(target.feature, 'is not supported in this environment')
    result.log.forEach(print)
    process.exit(1)
  }
} catch (e) {
  console.error('Unable to load tests; feature detection failed!')
  process.exit(1)
}

function print(entry, i, log) {
  var ok    = entry[0]
    , pre   = i === (log.length - 1)? '└' : '├'
    , tick  = ok? '✔' : '✘'
    , info  = entry[1]
    , error = entry[2]? '(' + entry[2] + ')' : ''

  if (ok) {
    console.log(pre, tick, info)
  } else {
    console.error(pre, tick, info, error)
  }
}