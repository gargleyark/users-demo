const express = require('express')
const app = express()
const fs = require('fs')
const App = require('./js/app.js')

app.get('/', (req, res) => {
  app.use(express.static(__dirname + '/public'))
  const app = new App()
  res.send(app.render({
    data: jeffs
  }))
})

app.listen(9001)
