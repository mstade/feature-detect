var expect = require('must')
  , exec   = require('../lib/execute')

describe('execute', function() {
  describe('when given a module', function() {
    describe('and the module is the wrong format', function() {
      it('should fail', function() {
        var result = exec({})

        expect(result.success).to.equal(false)
        expect(result.log).to.have.length(1)
      })
    })
    describe('and all tests are ok', function() {
      it('should report as much', function() {
        var result = exec(
          { feature: 'X'
          , tests:
            [ [ 'hello'
              , function() { }
              ]
            ]
          }
        )

        expect(result.success).to.equal(true)
        expect(result.log).to.have.length(1)
        expect(result.log[0][0]).to.equal(true)
        expect(result.log[0][1]).to.equal('hello')
      })
    })

    describe('and some tests fail', function() {
      it('should report them in order', function() {
        var result = exec(
          { feature: 'X'
          , tests:
            [ [ 'fail'
              , function() { throw new Error('booboo') }
              ]
            , [ 'ok'
              , function() { }
              ]
            ]
          }
        )

        expect(result.success).to.equal(false)
        expect(result.log).to.have.length(2)
        expect(result.log[0][0]).to.equal(false)
        expect(result.log[0][1]).to.equal('fail')
        expect(result.log[0][2]).to.equal('booboo')

        expect(result.log[1][0]).to.equal(true)
        expect(result.log[1][1]).to.equal('ok')
      })
    })
  })
})