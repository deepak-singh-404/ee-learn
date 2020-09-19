const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

//Models
const User = require('../models/user')

//Email
const sendEmail = require('../utils/nodemailer')

//Config
const keys = require('../config/keys')

//Validation
const validateUserLoginInput = require('../validation/userLogin')
const validateUserRegisterInput = require('../validation/userRegister')
const validateOTP = require('../validation/otpValidation')
const validateForgotPassword = require('../validation/forgotPassword')
const validateUserUpdatePassword = require('../validation/updatePassword')




module.exports = {
    userRegister: async (req, res, next) => {
        try {
            const { errors, isValid } = validateUserRegisterInput(req.body)
            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { name, email, password } = req.body;
            const user = await User.findOne({ email })
            if (user) {
                errors.email = "Email already exist"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(password, 10)
            const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
            const newUser = await new User({
                name,
                email,
                password: hashedPassword,
                avatar
            })
            await newUser.save()
            res.status(200).json({ message: newUser })
        }
        catch (err) {
            console.log("Error in userRegister", err.message)
            return res.status(400).json({ message: `Error in userRegister ${err.message}` })
        }
    },
    userLogin: async (req, res, next) => {
        try {
            const { errors, isValid } = validateUserLoginInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email }).populate('coursesCreated').populate('coursesBought').populate('cart')
            if (!user) {
                errors.email = "Email doesnt not exist"
                return res.status(400).json(errors)
            }
            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const payload = { id: user.id, user: user }
            jwt.sign(
                payload,
                keys.secretKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );

        }
        catch (err) {
            console.log("Error in userLogin", err.message)
            return res.status(400).json({ message: `Error in userLogin ${err.message}` })
        }

    },
    forgotPassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateForgotPassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                errors.email = "Email Not found, Provide registered email"
                return res.status(400).json(errors)
            }
            function generateOTP() {
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            }
            const OTP = await generateOTP()
            user.otp = OTP
            await user.save()
            await sendEmail(user.email, OTP, "OTP")
            res.status(200).json({ message: "check your registered email for OTP" })
            const helper = async () => {
                user.otp = ""
                await user.save()
            }
            setTimeout(function () {
                helper()
            }, 300000);
        }
        catch (err) {
            console.log("Error in sending email", err.message)
            return res.status(400).json({ message: `Error in generateOTP${err.message}` })
        }
    },
    postOTP: async (req, res, next) => {
        try {
            const { errors, isValid } = validateOTP(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email, otp, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Password Mismatch'
                return res.status(400).json(errors);
            }
            const user = await User.findOne({ email });

            if (user.otp === "") {
                errors.otp = "OTP has expired"
                return res.status(400).json(errors)
            }
            if (user.otp !== otp) {

                errors.otp = "Invalid OTP, check your email again"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword;
            await user.save()
            return res.status(200).json({ message: "Password Changed" })
        }
        catch (err) {
            console.log("Error in submitting otp", err.message)
            return res.status(400).json({ message: `Error in postOTP${err.message}` })
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateUserUpdatePassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email, oldPassword, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Password Mismatch'
                return res.status(404).json(errors);
            }
            const user = await User.findOne({ email })
            const isCorrect = await bcrypt.compare(oldPassword, user.password)
            if (!isCorrect) {
                errors.oldPassword = 'Invalid old Password';
                return res.status(404).json(errors);
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword;
            await user.save()
            res.status(200).json({ message: "Password Updated" })
        }
        catch (err) {
            console.log("Error in updating password", err.message)
            return res.status(400).json({ message: `Error in updatePassword${err.message}` })
        }
    }
}


