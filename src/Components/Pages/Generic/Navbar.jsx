import React from 'react'
import { NavLink, } from "react-router-dom";

function Navbar() {
   
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand"  to='/'>SocialBook</NavLink>            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <NavLink className="nav-item nav-link"  to='/SignUp'>Sign Up</NavLink>
                <NavLink className="nav-item nav-link"  to='/Login'>Log In</NavLink>
                <NavLink className="nav-item nav-link"  to='/'>Posts</NavLink>  
                <NavLink className="nav-item nav-link"   to='/logout'>Logout</NavLink>            
                </div>
            </div>
        </nav>
    )
}

export default Navbar
