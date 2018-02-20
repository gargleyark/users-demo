const fs = require('fs')
const app = fs.readFileSync('src/public/html/app.html')
const User = require('./user.js')
const userComponent = new User()
const Users = require('./users.js')
const usersComponent = new Users()
const Details = require('./details.js')
const detailsComponent = new Details()
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

const promise = new Promise(function(resolve, reject) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    const dbo = db.db('users')
    console.log('Database created!')
    dbo.collection('users').find({}).toArray(function (err, result) {
      if (err) throw err
      console.log('resolving', result)
      db.close()
      resolve(result)
    })
  })
})

const config = {
  index: getUsers,
  profile: getUserDetails
}

module.exports = function () {
  this.render = (type, id) => {
    promise.then(function (result) {
      usersData = result
      console.log('after the then, the data is', usersData)
      return app.toString()
        .replace(/{{app}}/, config[type](id))
    }, function (err) {
      console.log(err)
    })
  }
}
