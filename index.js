var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
const passport = require('passport');
require('./passport_jwt/passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const authRouters = require('./api/routers/authRouter');
const userRouters = require('./api/routers/userRouter');
app.use('/auth', authRouters);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouters);

app.listen(port);

console.log('Carogame api server started on: ' + port);