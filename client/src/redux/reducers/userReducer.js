const initialState = {
    user: {},
    isAuthenticated: false,
    registerLoaderFlag: false,
}



const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERS_DATA":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case "DELETE_USERS_DATA":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: false
            }
        case "SET_REGISTER_LOADER":
            return {
                ...state,
                registerLoaderFlag: action.payload
            }
        default:
          return state
    }
}

export default userReducer