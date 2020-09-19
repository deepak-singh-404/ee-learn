const initialState = {
    registerErrors: {},
    loginErrors: {},
    forgotPasswordErrors: {},
    forgotPasswordHelperFlag: false,
    updatePasswordErrors: {}
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_REGISTER_ERRORS":
            return {
                ...state,
                registerErrors: action.payload
            }
        case "SET_LOGIN_ERRORS":
            return {
                ...state,
                loginErrors: action.payload
            }
        case "SET_FORGOT_PASSWORD_ERRORS":
            return {
                ...state,
                forgotPasswordErrors: action.payload
            }
        case "SET_FORGOT_PASSWORD_HELPER_FLAG":
            return {
                ...state,
                forgotPasswordHelperFlag: action.payload
            }
        case "SET_UPDATE_PASSWORD_ERROR":
            return {
                ...state,
                updatePasswordErrors: action.payload
            }
        default:
            return state;
    }
}


export default errorReducer