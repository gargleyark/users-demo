const fs = require('fs')
const userComponent = fs.readFileSync('src/public/html/details.html')

module.exports = function () {
  this.render = user => {
    console.log(user)
    return userComponent.toString()
      .replace(/{{name}}/, user.name)
      .replace(/{{age}}/, user.age)
      .replace(/{{nationality}}/, user.nationality)
  }
}
