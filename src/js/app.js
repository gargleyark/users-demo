const fs = require('fs')
const app = fs.readFileSync('src/public/html/app.html')
const User = require('./user.js')
const userComponent = new User()
const Users = require('./users.js')
const usersComponent = new Users()
const Details = require('./details.js')
const detailsComponent = new Details()
const usersData = require('../data/users.json')

const getUsers = () => {
  let element = ''
  for (const index in usersData.users) {
    element = element + getUser(usersData.users[index])
  }
  return usersComponent.render(element)
}

const getUser = (user) => {
  return userComponent.render(user)
}

const getUserDetails = (userId) => {
  let user
  for (const index in usersData.users) {
    console.log(usersData.users[index].id, userId, usersData.users[index].id === userId)
    if (usersData.users[index].id === userId) {
      user = usersData.users[index]
    }
  }
  if (user) {
    return detailsComponent.render(user)
  }
}

const config = {
  index: getUsers,
  profile: getUserDetails
}

module.exports = function () {
  this.render = (type, id) => {
    console.log(id)
    return app.toString()
      .replace(/{{app}}/, config[type](id))
  }
}
