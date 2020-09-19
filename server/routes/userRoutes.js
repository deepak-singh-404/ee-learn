const express = require('express')
const router = express.Router()
const passport = require('passport')
const videoUpload = require('../utils/multer')



const { userRegister, userLogin,
    forgotPassword, postOTP, updatePassword
} = require('../controllers/userController')

const {
    addCourse,allCourses,buyCourse, addToCart, userCourse,commentOnQna,courseDetailsById
} = require('../controllers/courseController')
router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

router.post('/updatePassword', passport.authenticate('jwt', { session: false }), updatePassword)

router.post('/addCourse', passport.authenticate('jwt', { session: false }), videoUpload.single("videoFile"), addCourse)

router.get('/getAllCourse', passport.authenticate('jwt', { session: false }), allCourses)

router.get('/buyCourse/:courseId', passport.authenticate('jwt', { session: false }), buyCourse)

router.get('/addToCart/:courseId', passport.authenticate('jwt', { session: false }), addToCart)

router.get('/userCourses', passport.authenticate('jwt', { session: false }), userCourse)

router.get('/getCourseById/:courseId', passport.authenticate('jwt', { session: false }), courseDetailsById)

router.post('/commentOnCourse/:courseId', passport.authenticate('jwt', { session: false }), commentOnQna)


module.exports = router