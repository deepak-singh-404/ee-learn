const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')


const User = require('../models/user')
const Course = require('../models/course')


module.exports = {
    addCourse: async (req, res, next) => {
        try {
            const { _id } = req.user
            const { title, category, description, price } = req.body
            const convertedBuffer = await bufferConversion(req.file.originalname, req.file.buffer)
            const uploadedVideo = await cloudinary.uploader.upload(convertedBuffer, { resource_type: "video" })
            const course = new Course({
                title,
                category,
                description,
                file: uploadedVideo.secure_url,
                price,
                createdBy: _id,
                duration: (uploadedVideo.duration/60).toFixed(2)
            })
            await course.save()
            const user = await User.findById(_id)
            user.coursesCreated.push(course._id)
            await user.save()
            res.status(200).json({message:course})
        }
        catch (err) {
            console.log("error in addCourse", err.message)
            res.status(400).json({'Error in addCourse': err.message})
        }
    },
    allCourses: async (req, res, next) => {
        try {
            const { _id } = req.user
            const user = await User.findById(_id).populate('coursesCreated').populate('coursesBought').populate('cart')
            const allCourses = await Course.find({}).populate('createdBy')
            if (allCourses.length == 0) {
                return res.status(400).json({message:"No course Found"})
            }
            return res.status(200).json({message:allCourses,user:user})
        }
        catch (err) {
            console.log("error in getAllCourse", err.message)
            res.status(400).json({ 'Error in getAllCourse': err.message })
        }
    },
    buyCourse: async (req, res, next) => {
        try {
            const {_id} = req.user
            const { courseId } = req.params
            const course = await Course.findById(courseId)
            course.userWhoHasBought.push(_id)
            await course.save()
            const buyerUser = await User.findById(_id)
            buyerUser.coursesBought.push(courseId)
            buyerUser.totalExpenditure +=  parseInt(course.price)
            await buyerUser.save()
            const index = buyerUser.cart.findIndex((courseid) => {
                return courseId.toString() == courseid.toString()
            })
            buyerUser.cart.splice(index, 1)  
            await buyerUser.save()
            const buyerUserResponse = await User.findById(_id).populate('coursesCreated').populate('coursesBought').populate('cart')
            const seller = await User.findById(course.createdBy)
            seller.totalIncome += parseInt(course.price)
            await seller.save()
            return res.status(200).json({message:course,user:buyerUserResponse})
        }
        catch (err) {
            console.log("error in buyCourse", err.message)
            res.status(400).json({ 'Error in buyCourse': err.message })
        }
    },
    addToCart: async (req, res, next) => {
        try {
            const { _id } = req.user
            const { courseId } = req.params
            const user = await User.findById(_id)
            user.cart.push(courseId)
            await user.save()
            const userRes = await User.findById(_id).populate('coursesCreated').populate('coursesBought').populate('cart')
            res.status(200).json({message:userRes})
        }
        catch (err) {
            console.log("error in addToCart", err.message)
            res.status(400).json({ 'Error in addToCart': err.message })
            
        }
    },
    userCourse: async (req, res, next) => {
        try {
            const { _id } = req.user
            const user = await User.findOne({ _id }).populate('coursesCreated').populate('coursesBought').populate('cart')
            return res.status(200).json({message:user})
        }
        catch (err) {
            console.log("error in userCourses", err.message)
            res.status(400).json({ 'Error in userCourse': err.message })
            
        }
    },
    courseDetailsById: async (req, res, next) => {
        try {
            const { courseId } = req.params
            const course = await Course.findOne({ _id: courseId }).populate('createdBy')
            return res.status(200).json({message:course})
        }
        catch (err) {
            console.log("error in courseDetailsById", err.message)
            res.status(400).json({ 'Error in courseDetailsById': err.message })
        }
    },
    commentOnQna: async (req, res, next) => {
        try {
            const { name } = req.user
            const { courseId } = req.params
            const {question} = req.body
            const course = await Course.findOne({ _id: courseId })
            course.qna.push({ sender: name ,message:question})
            await course.save()
            res.status(200).json({message:course})
        }
        catch (err) {
            console.log("error in comentOnQna", err.message)
            res.status(400).json({ 'Error in commentOnQna': err.message })
        }
    }
   
}