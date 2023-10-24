require('dotenv').config()
let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt
const { userModels } = require('../models/index2')

module.exports = (passport) => {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = process.env.JWT_SECRET_KEY
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        await userModels.selectUserwithJWT(jwt_payload.user_id, jwt_payload.email)
        done(null, jwt_payload)
      } catch (error) {
        done(error, false)
      }
    })
  )
}