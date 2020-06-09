const express = require('express')
const routes = express.Router()
const controllerUsers = require('./controllers/users')
const controllerBranches = require('./controllers/branches')
const passport = require('./config/passport')()

routes.post('/signup' , controllerUsers.create)
routes.post('/signin' , controllerUsers.auth)
routes.post('/validateToken' , controllerUsers.validateToken)

routes.all('/branches' , passport.authenticate())
routes.post('/branches' , controllerBranches.create )
routes.get('/branches' ,controllerBranches.index )

routes.all('/search-branches' , passport.authenticate())
routes.get('/search-branches' , controllerBranches.search)

routes.all('/branches/:id' , passport.authenticate())
routes.get('/branche/:id' , controllerBranches.indexById)
routes.put('/branche/:id' , controllerBranches.update)
routes.delete('/branche/:id' , controllerBranches.remove)

module.exports = routes