const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require('../configs/appConfigs');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const dbService = require('../services/dynamoDb_service');

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
},
    function (jwtPayload, cb) {
        const user = {
            name: jwtPayload
        }
        return cb(null, user);
    }
));

passport.use(new GoogleTokenStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        const user = {
            name: profile.displayName,
            id: profile.emails[0].value,
            email: profile.emails[0].value,
            type: 'google'
        }
        console.log(user);
        dbService.add(user).then(data => {
            return done(null, user);
        }).catch(err => {
            return done(null, user);
        });
    }));

passport.use(new FacebookTokenStrategy({
    clientID: config.FB_CLIENT_ID,
    clientSecret: config.FB_CLIENT_SECRET
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        const user = {
            name: profile.displayName,
            id: profile.emails[0].value,
            email: profile.emails[0].value,
            type: 'facebook'
        }
        console.log(user);
        dbService.add(user).then(data => {
            return done(null, user);
        }).catch(err => {
            return done(null, user);
        });
    }));