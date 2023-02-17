import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext';


function LoginComponent() {

    const authContext = useAuth();
    const navigate = useNavigate();
    const [usernameOrEmail, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        if (await authContext.login(usernameOrEmail, password)) {
            navigate('/tickets')
        }
        console.log("Response " + JSON.parse(localStorage.getItem('response')));
        console.log("Status code: " + JSON.parse(localStorage.getItem('response')).status);
    }

    return (

        <div className="row">
            <div className="col-6">
                <div className='container p-5 m-5 border rounded-5 border-info border-5'>
                <h1>Login</h1>
                <hr />
                    <form className='form' onSubmit={handleSubmit}>
                        <div className="form-group mt-4">
                            <label>Email address</label>
                            <input type="text" className="form-control" value={usernameOrEmail} onChange={(e) => setUsername(e.target.value)} placeholder="Enter email" />
                        </div>
                        <div className="form-group mt-4">
                            <label >Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <div className='mt-4'>
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </div>
                    </form>
                </div>

            </div>
            <div className="col-6 mt-4 mb-4 p-4">
                <img src='Images/ts3.jpg' className='rounded-5' width='500px' height='400px'/>
            </div>

        </div>
    )
}

export default LoginComponent
