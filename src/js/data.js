const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/mydb'

module.exports = function () {
  this.promise = new Promise(function (resolve, reject) {
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
}
