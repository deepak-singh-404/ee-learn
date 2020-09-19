import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allCourses } from '../redux/actions/userAction'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
const Home = () => {
    const dispatch = useDispatch()
    const store = useSelector(store => store.courseRoot)
    const [courses, setAllCourses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        dispatch(allCourses())
        setIsLoading(true)
    }, [])
    useEffect(() => {
        if (store.allCourse.length !== 0) {
            setAllCourses(store.allCourse)
            setIsLoading(false)
        }
        
    }, [store.allCourse])
    return (
        <>
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="row">


                </div>
                <div className="row">
                    <div class="row justify-content-center">
                        <div class="col-md-1">
                            {
                                isLoading && <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            }
                        </div>
                    </div>
                    {courses.map((data,index) =>
                        <Card key={index} course={data} />
                        )}
                   
                </div>
            </div>
        </>
    )
}

export default Home
