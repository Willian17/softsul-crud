
const database = require('../database/connection')
const {authSecret} = require('../../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const {Strategy , ExtractJwt} = passportJwt

module.exports  = () => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    const strategy = new Strategy(params , (payload , done) =>{
           database('users')
           .where({id: payload.id})
           .first()
           .then(user => done(null , user ? {...payload} : false))
           .catch(error => done(error , false))
       
    })

    passport.use(strategy)
    const authenticate = () => passport.authenticate('jwt' , {session:false})

    return {authenticate}
}