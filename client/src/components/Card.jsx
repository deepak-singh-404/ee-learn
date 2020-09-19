import React,{useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {addToCart} from '../redux/actions/userAction'

const Card = (props) => {
    const store = useSelector(store => store.userRoot)
    const [isDisabled, setIsDisabled] = useState(false)
    
    const dispatch = useDispatch()
    const addToCartClickHandler = () => {
        dispatch(addToCart(props.course._id))
    }


    useEffect(() => {
        const alreadyAdded = store.user.cart.find(obj => {
            return obj._id === props.course._id
        })
        if (alreadyAdded) {
            setIsDisabled(true)
        }
    }, [store.user.cart])
    
    return (
        <div class="card ml-5 my-3" style={{ width: "18rem", display: "inline-block" }}>
            <div class="card-body">
                <h4 class="card-title text-center">Author: <Link to={`/profile`}>{props.course.createdBy.name}</Link></h4>
                <h4 class="card-title"><strong>{props.course.title}</strong></h4>
                <h5 class="card-title"><strong>Sales: </strong>{props.course.userWhoHasBought.length}</h5>
                <h5 class="card-title"><strong>Price: </strong>{props.course.price}$</h5>
                <h6 class="card-title"><strong>Duration: </strong>{props.course.duration} minute</h6>
                <h6 class="card-title"><strong>Category: </strong>{props.course.category}</h6>
                <p class="card-text"><strong>Descriptipon: </strong>{props.course.description}</p>
                {store.user._id !== props.course.createdBy._id ? <button disabled={isDisabled} onClick={addToCartClickHandler} className="btn btn-info btn-block">{isDisabled ? "Already Added" : "Add To Cart"} </button>
                    : <Link to={`/courseDetails/${props.course._id}`} className="btn btn-info btn-block">View </Link>
            }
                
            </div>
        </div>
    )
}

export default Card
