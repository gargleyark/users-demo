const fs = require('fs')
const app = fs.readFileSync('src/public/html/app.html')
const data = require('../data/users.json')

module.exports = function () {
  this.render = config => {
    return app.toString()
      .replace(/{{app}}/, 'data')
  }
}
