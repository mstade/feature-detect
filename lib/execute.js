module.exports = execute

function execute(target) {
  var success = true
    , log     = []

  try {
    target.tests.forEach(function(test, i) {
      try {
        test[1]()
        log.push([true, test[0]])
      } catch (e) {
        log.push([false, test[0], e.message])
        success = false
      }
    })
  } catch (e) {
    log.push([false, e.stack])
    success = false
  }

  return { success: success, log: log }
}