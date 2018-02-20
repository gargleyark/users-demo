const fs = require('fs')
const app = fs.readFileSync('src/public/html/app.html')
const User = require('./user.js')
const userComponent = new User()
const Users = require('./users.js')
const usersComponent = new Users()
const Details = require('./details.js')
const detailsComponent = new Details()
const DataModule = require('./data.js')
const dataModule = new DataModule()
let usersData
// const usersData = require('../data/users.json')

const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/mydb"

const getUsers = () => {
  let element = ''
  for (const index in usersData) {
    element = element + getUser(usersData[index])
  }
  return usersComponent.render(element)
}

const getUser = (user) => {
  return userComponent.render(user)
}

const getUserDetails = (userId) => {
  let user
  for (const index in usersData) {
    console.log(usersData[index].id, userId, usersData[index].id === userId)
    if (usersData[index].id === userId) {
      user = usersData[index]
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
  this.init = (type = 'index', id) => {
    return new Promise(function (resolve, reject) {
      dataModule.promise.then(function (result) {
        usersData = result
        console.log('after the then, the data is', usersData)
        console.log(type, id)
        const temp = app.toString()
          .replace(/{{app}}/, config[type](id))
        resolve(temp)
      }, function (err) {
        console.log(err)
      })
    })
  }
}
