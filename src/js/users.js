const fs = require('fs')
const users = fs.readFileSync('src/public/html/users.html')

module.exports = function () {
  this.render = element => {
    return users.toString()
      .replace(/{{users}}/, element)
  }
}
