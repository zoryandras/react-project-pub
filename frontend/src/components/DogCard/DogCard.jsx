import React, { useEffect, useState } from 'react';
import './DogCard.css';
import { FaTrash } from 'react-icons/fa';
import DeleteDogPopup from '../DeleteDogPopup/DeleteDogPopup';

function DogCard({ id, name, breed, gender, training, img, reserved, setChosenDog, setReadMore, setDogDetails, adminLoggedIn, setDogs }) {
    
    function chooseDog(e) {
        setChosenDog(e.target.dataset.id)
    }
    
    function readMoreFunc(e) {
        setReadMore(e.target.dataset.id)
        setDogDetails(true)
    }
    
    const [submitDeleteDog, setSubmitDeleteDog] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    useEffect(
       () => {
            if (submitDeleteDog) {
                fetch("http://127.0.0.1:9000/delete_dog", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: id})
                })
                .then(res => res.json())
                .then(dogs => {
                    setDogs(dogs)
                })
            }
            return () => setSubmitDeleteDog(false);
       },
       [submitDeleteDog]
    )

    return (
        <>  
            {deletePopup && <DeleteDogPopup setDeletePopup={setDeletePopup} setSubmitDeleteDog={setSubmitDeleteDog} name={name} />}
            <div className={`dogCard ${reserved ? "reserved" : "available"}`}>
                <div className='img-div'>
                    {reserved && <img src='/images/reserved.png' alt="" className='reserved-img'/>}
                    <img src={img} alt="" />   
                </div>
                <div className='textDiv'>
                    <div className='dogNameDiv' >
                        <h4>{name}</h4>
                    </div>
                    <div>
                        <h4>Breed:</h4>
                        <h4>{breed}</h4>
                    </div>
                    <div>
                        <h4>Gender:</h4>
                        <h4>{gender}</h4>
                    </div>
                    <div>
                        <h4>Training:</h4>
                        <h4>{training}</h4>
                    </div>
                </div>
                <div className='dogCardButtons'>
                    <button data-id={id} className='adopt' onClick={chooseDog}>Adopt</button>
                    <button data-id={id} className='seeMore' onClick={readMoreFunc} >See More</button>
                    {adminLoggedIn && <button data-id={id} className='deleteBtn' onClick={(e) => {
                        setDeletePopup(true);
                        /* setSubmitDeleteDog(true); */
                    }} ><FaTrash className='deleteIcon' /></button>}
                </div>
            </div>
        </>
    )
}

export default DogCard