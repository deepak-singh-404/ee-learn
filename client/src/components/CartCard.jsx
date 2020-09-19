import React from 'react'
import {Link} from 'react-router-dom'
const CartCard = (props) => {
    return (
        <div class="card ml-5 my-3" style={{ width: "18rem", display: "inline-block" }}>
            <div class="card-body">
                <h4 class="card-title"><strong>{props.course.title}</strong></h4>
                <h5 class="card-title"><strong>Price: </strong>{props.course.price}$</h5>
                <h6 class="card-title"><strong>Duration: </strong>{props.course.duration} minute</h6>
                <h6 class="card-title"><strong>Category: </strong>{props.course.category}</h6>
                <p class="card-text">{props.course.description}</p>
                <Link to={`/payment/${props.course._id}`} className="btn btn-info btn-block">Buy </Link>
            </div>
        </div>
    )
}

export default CartCard
