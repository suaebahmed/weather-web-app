import React from 'react'
import '../styles/navbar.css';
import logo from '../assets/logo.svg';
import Refreshbtn from '../assets/refresh-btn.svg';

function Navbar() {

  return (
    <div className='navbar'>
        <a style={{"color":"white","textDecoration":"none"}} href='/'>
          <div className='navbar-content'>
              <img src={logo} alt='aa'></img>
              <p className='logo-text'>Weather 99</p>
          </div>
        </a>
        <div>
          <div className='navbar-line'></div>
          <a style={{"color":"white","textDecoration":"none"}} className='navbar-content navbar-right' href='/'>
            <button>
                <img src={Refreshbtn} alt='abb'></img>
            </button>
            <p className='refresh-btn'>Refresh</p>
          </a>
        </div>
    </div>
  )
}

export default Navbar;