import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {useHistory, Link } from 'react-router-dom'
import {userLogin} from '../redux/actions/userAction'
import classnames from 'classnames'
const Login = () => {
    const store = useSelector(store => store.userRoot)
    const errorRoot = useSelector(store=>store.errorRoot)
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState("")

    useEffect(() => {
        if (store.isAuthenticated) {
            history.push('/home')
        }
    }, [store.isAuthenticated])

    useEffect(() => {
        if (errorRoot.loginErrors) {
            setErrors(errorRoot.loginErrors)
        }
    }, [errorRoot.loginErrors])

    const formSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin({ email, password }, history))
        setIsLoading(true)
    }

    useEffect(() => {
        if (errorRoot.loginErrors ||
            store.isAuthenticated) {
            setIsLoading(false)
        }
    }, [errorRoot.loginErrors, store.isAuthenticated])


    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-4 m-auto">
                    <h1 className="display-4 text-center">USER</h1>
                    <form noValidate onSubmit={formSubmitHandler} >
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email"  value={email} id="exampleInputEmail1" aria-describedby="emailHelp" className={classnames("form-control",
                                {
                                    'is-invalid': errors.email

                                })} />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)} 
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password"  value={password} id="exampleInputPassword1"
                                className={classnames("form-control",
                                    {
                                        'is-invalid': errors.password

                                    })} />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
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
                        {!isLoading && <button type="submit" className="btn btn-info btn-block">Login</button>}
                    </form>
                    <div className="mt-3">
                        <Link className="mt-4" to="/register">Dont have an Account?</Link>
                    </div>
                    <div className="mt-3">
                        <Link className="mt-4" to="/forgotPassword">Forgot Password?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
