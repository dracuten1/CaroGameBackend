var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoutes = require('./api/routers/authRouter');
authRoutes(app);

app.listen(port);

console.log('Carogame api server started on: ' + port);