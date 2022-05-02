import React from 'react'
import './Header.css'

function Header() {
  return (
    <div>
        <img src="/images/logo.png" alt="Logo" id="logoinheader" />
        <nav>
          <a href='#dogSelectorSection'>Puppies</a>
          <a href='#formSection'>Book a puppy</a>
          <a href='#'>About us</a>
        </nav>      
    </div>
  )
}

export default Header