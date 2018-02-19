const fs = require('fs')
const userComponent = fs.readFileSync('src/public/html/user.html')

module.exports = function () {
  this.render = user => {
    return userComponent.toString()
      .replace(/{{name}}/, user.name)
      .replace(/{{title}}/, user.title)
      .replace(/{{userId}}/, user.id)
  }
}
