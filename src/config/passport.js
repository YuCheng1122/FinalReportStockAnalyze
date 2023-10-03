let adminModule = require('../modules/index').adminModule
let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = (passport) => {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = process.env.JWT_SECRET_KEY
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        //await adminModule.selectEmail(jwt_payload.admin_id, jwt_payload.email, jwt_payload.platform_id)
        done(null, jwt_payload)
      } catch (error) {
        done(error, false)
      }
    })
  )
}
