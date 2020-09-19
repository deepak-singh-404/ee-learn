import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {askQuestion} from '../redux/actions/userAction'

const VideoPlayer = (props) => {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const clickHandler = () => {
        dispatch(askQuestion(props.course._id, message))
        setMessage("")
    }
    return (
        <div class="card ml-5 my-3" style={{ width: "25rem", display: "inline-block" }}>
            <video width="400" controls>
                <source src={props.course.file} type="video/mp4" />
            </video>
            <h4 class="card-title"><strong>Title: </strong>{props.course.title}</h4>
            <h5 class="card-title"><strong>Duration: </strong>{props.course.duration} minute</h5>
            <h5 class="card-title"><strong>Category: </strong> {props.course.category}</h5> 
            <Link to={`/courseDetails/${props.course._id}`}>QNA </Link>
            <textarea onChange={(e) => setMessage(e.target.value)} type="text" value={message} id="exampleInputPassword1"
                className="form-control"
                     />
            <button onClick={clickHandler} type="button" className="btn btn-info">Ask Question</button>
        </div>
    )
}

export default VideoPlayer
