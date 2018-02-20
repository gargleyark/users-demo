const express = require('express')
const server = express()
const App = require('./js/app.js')
var path = require('path')
const app = new App()
server.use(express.static(path.join(__dirname, '/public')))

// server.get('/profile/', (req, res) => {
//   res.send(app.render('profile', req.query.id))
// })

server.get('/', (req, res) => {
  if (req.query.id) {
    app.init('profile', req.query.id).then((data) => {
      res.send(data)
    })
    console.log('ran init')
  } else {
    app.init('index').then((data) => {
      res.send(data)
    })
    console.log('ran init 2')
  }
})

server.listen(9001)
