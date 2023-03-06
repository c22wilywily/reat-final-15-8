import React, { useEffect, useState } from 'react'

function UserForm(props) {
    const { onSubmit, selectUser, dataUser } = props
    const [user, setUser] = useState({
        username: '',
        status: '',
        email: ''
    })
    const [feedback, setFeedback] = useState({})
    const [hide, setHide] = useState(true)
    const [sta, setSta] = useState(true)


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user, [name]: value
        })
    }
    console.log(user.status)

    const handleSubmit = (event) => {
        event.preventDefault()
        const fb = {}
        let check = true

        const checkExistsEmail = dataUser.find(it => it.email === user.email)
        console.log(checkExistsEmail)

        const regexpEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const regexText = /^[a-zA-Z ]{1,}$/
        if (!user.username || !user.username.trim() || !regexText.exec(user.username)) {
            fb.username = "Phai nhap User Name"
            check = false
        }
        if (!user.status || user.status === "--Choose Status--") {
            fb.status = "Phai chon status"
            check = false
        }
        if (!user.email || !user.email.trim()) {
            fb.email = "Phai nhap email"
            check = false
        } else if (!regexpEmail.exec(user.email)) {
            fb.email = "Email khong dung dinh dang"
            check = false
        } else if (!!checkExistsEmail) {
            fb.email = "Email da ton tai"
            check = false
        }

        setFeedback(fb)

        if (check) {
            console.log(user)
            onSubmit(user)
            handleReset()
        } else {
            return;
        }
    }

    const editSubmit = (even) => {
        even.preventDefault()
        const fb = {}
        let check = true

        const regexpEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const regexText = /^[a-zA-Z ]{1,}$/
        if (!user.username || !user.username.trim() || !regexText.exec(user.username)) {
            fb.username = "Phai nhap User Name"
            check = false
        }
        if (!user.status || user.status === "--Choose Status--") {
            fb.status = "Phai chon status"
            check = false
        }
        if (!user.email || !user.email.trim()) {
            fb.email = "Phai nhap email"
            check = false
        } else if (!regexpEmail.exec(user.email)) {
            fb.email = "Email khong dung dinh dang"
            check = false
        }

        setFeedback(fb)

        if (check) {
            console.log(user)
            onSubmit(user)
            handleReset()
        } else {
            return;
        }

    }

    const handleReset = () => {
        setUser({
            username: '',
            status: '',
            email: ''
        })
        setFeedback({})
        setHide(true)
        setSta(true)
    }


    useEffect(() => {
        if (selectUser.length > 0) {
            setUser(...selectUser)
            setHide(false)
            setSta(false)
        }
    }, [selectUser])
    console.log(selectUser)

    return (
        <div className='UserForm'>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-12 col-lg-6'>
                        <div className='form-container'>
                            <div>
                                <label className='col-form-label'>User name</label>
                            </div>
                            <input
                                type="text"
                                className={`form-control w-100 ${!!feedback.username ? 'is-invalid' : ''}`}
                                name='username'
                                value={user.username}
                                onChange={handleChange}
                            />
                            {!!feedback.username ? <div className='invalid-feedback'>{feedback.username}</div> : <></>}
                        </div>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <div className='form-container'>
                            <div>
                                <label className='col-form-label'>Status</label>
                            </div>
                            {sta ?
                                <>
                                    <select className={`form-select w-100 ${!!feedback.status ? 'is-invalid' : ''}`}
                                        name='status' value={user.status} onChange={handleChange}
                                    >
                                        <option><label>--Choose Status--</label></option>
                                        <option value="Active">Active</option>
                                        <option value="Not Active">Not Active</option>
                                    </select>
                                    {!!feedback.status ? <div className='invalid-feedback'>{feedback.status}</div> : <></>}
                                </>
                                :
                                <>
                                    <select className={`form-select w-100 ${!!feedback.status ? 'is-invalid' : ''}`}
                                        name='status' value={user.status} onChange={handleChange} disabled={(selectUser[0].status === "Active") ? true : false}
                                    >
                                        <option><label>--Choose Status--</label></option>
                                        <option value="Active">Active</option>
                                        <option value="Not Active">Not Active</option>
                                    </select>
                                    {!!feedback.status ? <div className='invalid-feedback'>{feedback.status}</div> : <></>}
                                </>
                            }
                        </div>
                    </div>
                    <div className='col-12 col-lg-12'>
                        <div className='form-container'>
                            <div>
                                <label className='col-form-label'>Email</label>
                            </div>
                            <input
                                type="text"
                                className={`form-control w-100 ${!!feedback.email ? 'is-invalid' : ''}`}
                                name='email'
                                value={user.email}
                                onChange={handleChange}
                            />
                            {!!feedback.email ? <div className='invalid-feedback'>{feedback.email}</div> : <></>}
                        </div>
                    </div>
                    {hide ?
                        <>
                            <div className='col-12 col-lg-12 mt-4'>
                                <button type='submit' className='btn btn-success'>Add user</button>
                            </div>
                        </>
                        :
                        <>
                            <div className='col-12 col-lg-12 mt-4'>
                                <button type='button' className='btn btn-success' onClick={editSubmit}>Update User</button>
                            </div>
                        </>
                    }
                </div>
            </form >
        </div >
    )
}

export default UserForm
