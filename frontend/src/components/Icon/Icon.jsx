import React from 'react'
import './Icon.css'

function Icon( { imgSrc, text }) {
  return (
    <div className='icon'>
        <img src={imgSrc} />
        <h5>{text}</h5>
    </div>
  )
}

export default Icon