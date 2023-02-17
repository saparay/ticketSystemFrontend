import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext';

function NavBar() {
    
    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated
    //console.log(authContext);
    const role_admin = authContext.role_admin();
    const role_lead = authContext.role_lead();
    function logout() {
        authContext.logout();
       
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <Link className='navbar-brand' to='/'>#mARS&#9889;</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">
                            <Link to='/' className="nav-link">Home </Link>
                        </li>
                        <li className="nav-item fs-5">
                            {isAuthenticated && <Link to='/tickets' className="nav-link">Tickets</Link>}
                        </li>
                        <li className="nav-item fs-5">
                            {(isAuthenticated && (role_admin || role_lead)) && <Link to='/read-user' className="nav-link">Users</Link>}
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav">
                <li className="nav-item fs-5 text-light">
                 {isAuthenticated &&  <h4>Welcome! {authContext.username}    &nbsp;</h4>}
                </li>
                    <li className="nav-item fs-5">
                        {!isAuthenticated && <Link to='/login' className="nav-link">login </Link>}
                    </li>
                    <li className="nav-item fs-5">
                        {isAuthenticated && <Link to='/' className="nav-link" onClick={logout}>logout</Link>}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
