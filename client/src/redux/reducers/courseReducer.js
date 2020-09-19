const initialState = {
    addCourseFlag: false,
    allCourse: [],
    singleCourse: {}
}


const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ADD_COURSE_FLAG":
            return {
                ...state,
                addCourseFlag: action.payload
            }
        case "SPINNER_HELPER":
            return {
                ...state,
                addCourseFlag: action.payload
            }
        case "SET_SINGLE_COURSE":
            return {
                ...state,
                singleCourse: action.payload
            }
        case "SET_ALL_COURSES":
            return {
                ...state,
                allCourse: action.payload
            }
        default:
            return state
    }
}


export default courseReducer