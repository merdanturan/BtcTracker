import React from 'react'
import Logo from '../../images/acme.png'
import './style.css'

const Header = () => {
    return (
        <div className="navbar">
            <img src={Logo} alt="logo" width="88px" />
        </div>
    )
}

export default Header
