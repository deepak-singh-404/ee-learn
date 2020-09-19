import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import VideoPlayer from '../../components/VideoPlayer'
import { allCourses, myCourses } from '../../redux/actions/userAction'


const MyCourses = () => {
    const user = useSelector(store => store.userRoot.user)
    const [arr, setArr] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(myCourses())
    }, [])

    useEffect(() => {
        if (user.coursesBought) {
            setArr(user.coursesBought)
        }  
    },[user])

    
    
    return (
        <div className="container" style={{marginTop:"100px"}}>
            <div className="row">
                <div className="col">
                    
                    {arr.length !== 0 && arr.map((course, index)=>
                       <VideoPlayer key={index} course={course}  />
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default MyCourses
