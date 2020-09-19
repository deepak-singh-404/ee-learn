import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import Navbar from '../components/Navbar'
import { updatePassword } from '../redux/actions/userAction'




const UpdatePassword = () => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [error, setError] = useState({})

    useEffect(() => {
        if (store.errorRoot.updatePasswordErrors) {
            setError(store.errorRoot.updatePasswordErrors)
        }
    }, [store.errorRoot.updatePasswordErrors])
    const formHandler = (e) => {
        e.preventDefault()
        dispatch(updatePassword({ email: store.userRoot.user.email, oldPassword, newPassword, confirmNewPassword },history))
    }
    return (
        <>
            <div className="container" style={{ marginTop: "100px" }}>
                    <div className="row m-5">
                        <div className="col-md-4 m-auto">
                            <form noValidate onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="emailId">Old Password</label>
                                    <input onChange={(e) => setOldPassword(e.target.value)} type="password" value={oldPassword} className={classnames("form-control",
                                        {
                                            'is-invalid': error.oldPassword

                                        })} id="emailId" />
                                    {error.oldPassword && (<div className="invalid-feedback">{error.oldPassword}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordId">New Password</label>
                                    <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className={classnames("form-control", {
                                        "is-invalid": error.newPassword
                                    })} value={newPassword} type="password" id="passwordId" />
                                    {error.newPassword && (<div className="invalid-feedback">{error.newPassword}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordCId">Confirm New Password</label>
                                    <input onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} className={classnames("form-control", {
                                        "is-invalid": error.confirmNewPassword
                                    })} value={confirmNewPassword} type="password" id="passwordCId" />
                                    {error.confirmNewPassword && (<div className="invalid-feedback">{error.confirmNewPassword}</div>)}
                                </div>
                                <button type="submit" class="btn btn-info btn-block ">Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default UpdatePassword
