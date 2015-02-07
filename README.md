Feature detection
=================

This library is meant to provide feature detection support for Node.js or
Io.js compatible environments. It is not intended to provide feature
detection support in browser environments, for which there already are
numerous alternatives.

Usage
-----

```bash
npm install --save feature-detect
```

### Install time detection (recommended)

To detect features at install time, put a `preinstall` script similar to
the following in `package.json`:

```javascript
{ scripts:
  { "preinstall": "feature-detect generators" }
}
```

In the example above, the `feature-detect` executable will load the module
`generators`. The module is expected to export a list of tests, like so:

```javascript
exports.feature = 'Generators'

exports.tests =
[ 'generator syntax'
  , function() {
      return function *() { yield true }
    }
  ]
]
```

When running `npm install` in an environment that supports generators,
nothing will happen, but if generators aren't supported, the installation
will fail and you should see output like the following:

```bash
WeakMap is not supported in this environment
├ ✘ basic functionality WeakMap is not defined
├ ✘ constructor arguments WeakMap is not defined
├ ✘ WeakMap.prototype.set returns this WeakMap is not defined
├ ✘ WeakMap.prototype.delete WeakMap is not defined
└ ✘ Support frozen objects as keys WeakMap is not defined
```

### Runtime detection

While installation time detection is recommended, it is possible to do runtime detection:

```javascript
var detect = require('feature-detect')

var result = detect(
  { feature: 'WeakMap'
  , tests:
    [ [ 'basic functionality', function() {
        var key = {};
        var weakmap = new WeakMap();
        weakmap.set(key, 123);
        return weakmap.has(key) && weakmap.get(key) === 123;
      } ]
    ]
  }
)

result.success? console.log('WeakMap supported!) : console.error('No WeakMap!')
```

---

License: [MIT](http://mstade.mit-license.org/)