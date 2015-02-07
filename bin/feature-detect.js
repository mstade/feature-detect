#!/usr/bin/env node

var path   = require('path')
  , target = require(path.join(process.cwd(), process.argv[2]))

var result = require('../lib/execute')(target)

if (!result.success) {
  console.log(target.feature, 'is not supported in this environment')
  result.log.forEach(print)
  process.exit(1)
}

function print(entry, i, log) {
  var ok    = entry[0]
    , pre   = i === (log.length - 1)? '└' : '├'
    , tick  = ok? '✔' : '✘'
    , info  = entry[1]
    , error = entry[2] || ''

  if (ok) {
    console.log(pre, tick, info)
  } else {
    console.error(pre, tick, info, error)
  }
}