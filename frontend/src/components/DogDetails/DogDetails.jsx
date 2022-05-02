import React from 'react'
import './DogDetails.css'
import { FaTimes } from 'react-icons/fa';

function DogDetails({ chosenDogDetails, setDogDetails }) {
    function removeDetails() {
        setDogDetails(false)
    }
  
    return (
    <div className='dogDetails'>
        <button className='iconBtn' onClick={removeDetails}><FaTimes className='icon' /></button>
        <div className='imgDiv'>

        <img src={chosenDogDetails.img} alt="" />
        </div>
        <div>
            <h4>Name:</h4>
            <h3>{chosenDogDetails.name}</h3>
        </div>
        <div>
            <h4>Breed:</h4>
            <h3>{chosenDogDetails.breed}</h3>
        </div>
        <div>
            <h4>Gender:</h4>
            <h3>{chosenDogDetails.gender}</h3>
        </div>
        <div>
            <h4>Training:</h4>
            <h3>{chosenDogDetails.training}</h3>
        </div>
        <div>
            <h4>Introduction:</h4>
            <h3>{chosenDogDetails.introduction}</h3>
        </div>
        
    </div>
  )
}

export default DogDetails