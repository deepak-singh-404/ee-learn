import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory} from 'react-router-dom'
import classnames from 'classnames'
import {addCourse, spinnerHelper} from '../../redux/actions/userAction'
import Navbar from '../../components/Navbar'

const UploadVideos = () => {
    const history = useHistory()
    const store = useSelector(store=>store.courseRoot)
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState(0)
    const [videoFile, setVideoFile] = useState({})
    const [imageFile, setImageFile] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})

    const categories = [
        { value: "web-development", label: "Web Development" },
        { value: "andriod-development", label: "Android Development" },
        { value: "ui/ux-design", label: "Ui/UX Design" },
        { value: "cooking", label: "Cooking" },
        { value: "graphic-design", label: "Graphic Design" },
    ]


    const fileHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let video = e.target.files[0]
            setVideoFile(video)
        }
    }

    // const imageHandler = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         let image = e.target.files[0]
    //         setImageFile(image)
    //     }
    // }



    const formHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("videoFile", videoFile)
      //  formData.append("imageFile", imageFile)
        formData.append("title", title)
        formData.append("price", price)
        formData.append("category", category)
        formData.append("description", description)
        dispatch(addCourse(formData,history))
        setIsLoading(true)
    }

    useEffect(() => {
        if (store.addCourseFlag) {
            setIsLoading(false)
            dispatch(spinnerHelper(false))
        }
    }, [store.addCourseFlag])
    return (
        <>
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <form noValidate onSubmit={formHandler}>
                            <div className="form-group">
                                <label htmlFor="inputId">Video File</label>
                                <input required className="form-control" type="file" accept="video/*" id="inputId" onChange={fileHandler} multiple={false} />
                            </div>
                            {/* <div className="form-group">
                            <label htmlFor="thumbnailId">Thumbnail</label>
                            <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="thumbnailId" onChange={imageHandler}></input>
                        </div> */}
                            <div className="form-group">
                                <label htmlFor="titleId">Title</label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)} required type="text" className="form-control" id="titleId" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoryId">Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.year

                                    })} id="categoryId">
                                    <option>Select</option>
                                    {categories.map((data, index) =>
                                        <option key={index} value={data.value}>{data.label}</option>
                                    )}
                                </select>
                                {error.category && (<div classNameName="invalid-feedback">{error.category}</div>)}
                            </div>
                            <div className="form-group ">
                                <label htmlFor="descriptionId">Decription</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="priceId">Price</label>
                                <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" />
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-md-1">
                                    {
                                        isLoading && <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            {!isLoading && <button type="submit" className="btn btn-info">Upload</button>}
                        </form>
                    </div>
                </div>
            </div>
            </>
    )
}

export default UploadVideos
