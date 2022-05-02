import React from 'react'
import './ActionButton.css'

function ActionButton({ color, text }) {
  return (
    <button className={`actionButton ${color}`}>{text}</button>
  )
}

export default ActionButton