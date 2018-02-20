const expect = require('chai').expect
const App = require('../src/js/app.js')
const app = new App()
const Details = require('../src/js/details.js')
const details = new Details()
const User = require('../src/js/user.js')
const user = new User()



describe('users project', () => {
  describe('app.js', () => {
    it('app renders index page without errors ', () => {
      const testApp = app.render('index')
      expect(testApp).to.be.a('string')
    })
  })

  describe('detail page', () => {
    it('The details page renders without errors ', () => {
      const detailsApp = details.render({})
      expect(detailsApp).to.be.a('string')
    })
  })

  // describe('detail page', () => {
  //   it('The details page renders without errors ', () => {
  //     const detailsApp = user.render({})
  //     expect(detailsApp).to.be.a('string')
  //   })
  // })
})
