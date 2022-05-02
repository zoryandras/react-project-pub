import React from 'react'
import './AddNewCard.css'
import {FaUserPlus} from 'react-icons/fa';

function AddNewCard({setaddNewDog}) {
    function handleClick() {
        setaddNewDog(true);
    }

    return (
        <div className='addNewCard' onClick={handleClick}>
            <FaUserPlus className='dogIcon'/>
        </div>
    )
}

export default AddNewCard