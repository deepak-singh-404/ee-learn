const express = require('express');
const mongoose = require('mongoose')
const passport = require('passport')
const dotenv = require('dotenv');
dotenv.config()

const cors = require('cors')
const cookieParser = require('cookie-parser');
const morgan = require('morgan')

//MIDDILWARES
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(morgan('dev'))

// Routes
const userRoutes = require('./routes/userRoutes')

// Passport Middleware
app.use(passport.initialize());

// Passport Config.
require('./config/passport')(passport)

//Razorpay
require('./config/payment')



//ROUTES
app.use('/api/user', userRoutes)


//Catching 404 Error
app.use((req, res, next) => {
    const error = new Error('INVALID ROUTE')
    error.status = 404
    next(error);
})

//Error handler function
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD)
    , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
        app.listen(PORT)
        console.log("server Started")
    }).catch((err) => {
        console.log("Error in connecting to DataBase", err.message)
    })

// process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD)
// "mongodb://127.0.0.1:27017/frontEndProject"

