import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'
import jwt_decode from 'jwt-decode'

export const spinnerHelper = (data) => {
    return {
        type: "SPINNER_HELPER",
        payload: data
    }
}

export const userLoginHelper = (data) => {
    return {
        type: "SET_USERS_DATA",
        payload: data
    }
}

const userLogoutHelper = (data) => {
    return {
        type: "DELETE_USERS_DATA",
        payload: data
    }
}


const registerLoaderFlagHelper = (data) => {
    return {
        type: "SET_REGISTER_LOADER",
        payload: data
    }
}

export const userRegister = (userRegisterCredentials,history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Post",
                url: "https://ee-learn.herokuapp.com/api/user/register",
                data: userRegisterCredentials
            })
            dispatch(registerLoaderFlagHelper(true))
            history.push('/')
        }
        catch (err) {
            dispatch({
                type:"SET_REGISTER_ERRORS",
                payload: err.response.data
            })
            console.log("Error in userRegister Action", err.message)
        }
       
    }
}

export const userLogin = (userLoginCredentials,history) => {
    return async (dispatch) => {
        try {
        
            const { data } = await axios({
                method: "Post",
                url: "https://ee-learn.herokuapp.com/api/user/login",
                data: userLoginCredentials
            })
            
            const { token } = data
            localStorage.setItem('userJwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(userLoginHelper(decoded.user))
            history.push('/home')
        }
        catch (err) {
            dispatch({
                type: "SET_LOGIN_ERRORS",
                payload: err.response.data
            })
            console.log("Error in userLogin Action", err.message)
        }

    }
}


export const getOTP = (userEmail) => {
    return async (dispatch) => {
        try {
            await axios({
                method: 'Post',
                url: 'https://ee-learn.herokuapp.com/api/user/forgotPassword',
                data: userEmail
            })
            alert("Otp has been sent to your email")
            dispatch({
                type: "SET_FORGOT_PASSWORD_HELPER_FLAG",
                payload: true
            })
        }
        catch (err) {
            dispatch({
                type: "SET_FORGOT_PASSWORD_ERRORS",
                payload: err.response.data
            })
            console.log("Error in getOTPUser", err.message)
        }
    }
}

export const submitOTP = (newPasswordWithOtp, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: "https://ee-learn.herokuapp.com/api/user/postOTP",
                data: newPasswordWithOtp
            })
            alert("Password Update, kindly login with updated password")
            history.push('/')
        }
        catch (err) {
            dispatch({
                type: "SET_FORGOT_PASSWORD_ERRORS",
                payload: err.response.data
            })
            console.log("Error in submitOTP", err.message)
        }
    }
}

export const updatePassword = (passwordData,history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: "https://ee-learn.herokuapp.com/api/user/updatePassword",
                data: passwordData
            })
            alert("Password Updated Successfully")
            history.push('/profile')
        }
        catch (err) {
            dispatch({
                type: "SET_UPDATE_PASSWORD_ERROR",
                payload: err.response.data
            })
        }
    }
}


export const addCourse = (courseCredentials,history) => {
    return async (dispatch) => {
        try {
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            const { data } = await axios({
                method: "Post",
                url: "https://ee-learn.herokuapp.com/api/user/addCourse",
                data: courseCredentials,
                config
            })
            dispatch({
                type: "SET_ADD_COURSE_FLAG",
                payload: true
            })
            alert("Course Added successfully")
            history.push('/home')
            
        }
        catch (err) {
            console.log("Error in addCourse Action", err.message)
        }

    }
}

export const allCourses = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: "https://ee-learn.herokuapp.com/api/user/getAllCourse",
            })
            dispatch({
                type: "SET_ALL_COURSES",
                payload: data.message
            })
            dispatch(userLoginHelper(data.user))
        }
        catch (err) {
            console.log("Error in all Course Action", err.message)
        }

    }
}

export const addToCart = (courseId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: `https://ee-learn.herokuapp.com/api/user/addToCart/${courseId}`,
            })
           
            dispatch(userLoginHelper(data.message))
        }
        catch (err) {
            console.log("Error in addCourse Action", err.message)
        }

    }
}

export const buyCourse = (courseId,history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: `https://ee-learn.herokuapp.com/api/user/buyCourse/${courseId}`,
            })
            dispatch(userLoginHelper(data.message))
            alert("payment successfull")
            history.push('/myCourses')
        }
        catch (err) {
            console.log("Error in addCourse Action", err.message)
        }

    }
}


export const myCourses = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: `https://ee-learn.herokuapp.com/api/user/userCourses`,
            })
            const { message } = data
            dispatch(userLoginHelper(message))
        }
        catch (err) {
            console.log("Error in addCourse Action", err.message)
        }

    }
}

export const courseDetailsById = (courseId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: `https://ee-learn.herokuapp.com/api/user/getCourseById/${courseId}`,
            })
            const { message } = data
            dispatch({
                type: "SET_SINGLE_COURSE",
                payload: message
            })
        }
        catch (err) {
            console.log("Error in addCourse Action", err.message)
        }

    }
}

export const askQuestion = (courseId,question) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Post",
                url: `https://ee-learn.herokuapp.com/api/user/commentOnCourse/${courseId}`,
                data:{question}
            })
            const { message } = data
            dispatch({
                type: "SET_SINGLE_COURSE",
                payload: message
            })
            alert("submitted,go to qna section for discussions")
        }
        catch (err) {
            console.log("Error in addCourse Action", err.message)
        }

    }
}

export const userLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('userJwtToken');
        setAuthToken(false);
        dispatch(userLogoutHelper({}));
    }
}