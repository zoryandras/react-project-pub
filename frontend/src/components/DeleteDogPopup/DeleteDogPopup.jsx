import React from 'react';
import './DeleteDogPopup.css';

function DeleteDogPopup({ setDeletePopup, setSubmitDeleteDog, name }) {
  
  function handleConfirm() {
    setSubmitDeleteDog(true);
    setDeletePopup(false);
  }
  
  function handleCancel() {
    setDeletePopup(false);
  }

    return (
    <div className='deleteDogPopup'>
        <h3>Are you sure you want to delete <span className='doggoName'>{name}</span>?</h3>
        <div>
            <button className='confirmDelete' onClick={handleConfirm}>Delete</button>
            <button className='cancelDelete' onClick={handleCancel}>Cancel</button>
        </div>
    </div>
  )
}

export default DeleteDogPopup