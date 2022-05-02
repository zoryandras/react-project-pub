import React, { useState } from 'react'
import AddNewCard from '../AddNewCard/AddNewCard';
import DogCard from '../DogCard/DogCard';
import DogDetails from '../DogDetails/DogDetails';
import './DogCards.css'

function DogCards({ dogs, setChosenDog, readMore, setReadMore, adminLoggedIn, setaddNewDog, setDogs }) {

  const [dogDetails, setDogDetails] = useState(false);
  

  return (
    <div className='dogCards'>
      {dogs.map(dog => <DogCard key={dog.id} id={dog.id} name={dog.name} breed={dog.breed} gender={dog.gender} training={dog.training} img={dog.img} reserved={dog.reserved} setChosenDog={setChosenDog} readMore={readMore} setReadMore={setReadMore} setDogDetails={setDogDetails} adminLoggedIn={adminLoggedIn} setDogs={setDogs} />)}
      {adminLoggedIn && <AddNewCard setaddNewDog={setaddNewDog}/>}
      {dogDetails && <DogDetails chosenDogDetails={dogs[readMore]} setDogDetails={setDogDetails} /> }
    </div>
  )
}

export default DogCards