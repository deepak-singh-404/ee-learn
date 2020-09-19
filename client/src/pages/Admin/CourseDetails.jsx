import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {courseDetailsById} from '../../redux/actions/userAction'
// import VideoPlayer from '../../components/VideoPlayer'
import { Link } from 'react-router-dom'

const CourseDetails = (props) => {
    const dispatch = useDispatch()
    const singleCourse = useSelector(store=>store.courseRoot.singleCourse)
    const [course, setCourse] = useState({})

    useEffect(() => {
        dispatch(courseDetailsById(props.match.params.courseId))
    }, [props.match.params.courseId])
    
    useEffect(() => {
        if (singleCourse) {
            setCourse(singleCourse)
        }
    },[singleCourse])
    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row">
                <div className="col-md-6">
                    {course.file && <><video width="100%" controls>
                        <source src={course.file} type="video/mp4" />
                    </video>
                        <h4 class="card-title"><strong>Title: </strong>{course.title}</h4>
                        <h5 class="card-title"><strong>Duration: </strong>{course.duration} minute</h5>
                        <h5 class="card-title"><strong>Category: </strong> {course.category}</h5>
                        
                    </>}
                </div>
                <div className="col-md-6">
                    <h1>QNA Section</h1>
                    {course.qna && course.qna.map(obj =>
                        <>
                            <h3>{obj.sender}: {obj.message}</h3>
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}

export default CourseDetails
