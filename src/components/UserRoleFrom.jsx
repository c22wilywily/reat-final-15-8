import React, { useEffect, useState } from 'react'

export default function UserRoleFrom(props) {
    const { dataUser, submitRole, selectRole } = props

    const [userRole, setUserRole] = useState({
        username: '',
        role: '',
    })
    const [hide, setHide] = useState(true)
    const [feedback, setFeedback] = useState({})

    const handleChange = event => {
        const { name, value } = event.target;
        setUserRole({
            ...userRole, [name]: value
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        const fb = {}
        let check = true

        if (!userRole.username || userRole.username === "Select User name") {
            fb.username = "Phai chon User Name"
            check = false
        }
        if (!userRole.role || userRole.role === "Select Role") {
            fb.role = "Phai chon Role"
            check = false
        }

        setFeedback(fb)

        if (check) {
            submitRole(userRole)
            handleReset()
        } else {
            return
        }
    }

    const handleReset = () => {
        setUserRole({
            username: '',
            role: '',
        })
        setFeedback({})
        setHide(true)
    }


    useEffect(() => {
        if (selectRole.length > 0) {
            setUserRole(...selectRole)
            setHide(false)
        }
    }, [selectRole])



    return (
        <div className='UserRoleForm'>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col-12 col-lg-6'>
                        <div className='form-container'>
                            <div>
                                <label className='col-form-label'>Select User name</label>
                            </div>
                            <select className={`form-select ${!!feedback.username ? 'is-invalid' : ''}`}
                                name='username' value={userRole.username} onChange={handleChange}>
                                <option><label>Select User name</label></option>
                                {dataUser.map(item => item.status === "Active" ?
                                    <option>{item.username}</option> : <></>
                                )}
                            </select>
                            {!!feedback.username ? <div className='invalid-feedback'>{feedback.username}</div> : <></>}
                        </div>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <div className='form-container'>
                            <div>
                                <label className='col-form-label'>Select Role</label>
                            </div>
                            <select className={`form-select ${!!feedback.role ? 'is-invalid' : ''}`}
                                name='role' value={userRole.role} onChange={handleChange}>
                                <option selected>Select Role</option>
                                <option value="Developer">Developer</option>
                                <option value="Support">Support</option>
                                <option value="Manager">Manager</option>
                            </select>
                            {!!feedback.role ? <div className='invalid-feedback'>{feedback.role}</div> : <></>}
                        </div>
                    </div>
                    {hide ?
                        <>
                            <div className='col-12 col-lg-12 mt-4'>
                                <button type='submit' className='btn btn-success'>Add role for user</button>
                            </div>
                        </>
                        :
                        <>
                            <div className='col-12 col-lg-12 mt-4'>
                                <button type='submit' className='btn btn-success'>Update role for user</button>
                            </div>
                        </>}
                </div>
            </form >
        </div >
    )
}
