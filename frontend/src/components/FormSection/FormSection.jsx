import React, {useEffect, useState} from 'react'
import './FormSection.css'
import FormSectionSubmit from './FormSectionSubmit';

function FormSection({chosenDog, setDogs}) {

  const [newOwnerName, setNewOwnerName] = useState("");
  const [zipInput, setZipInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [streetInput, setStreetInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [motivation, setMotivation] = useState("");

  const [newOwnerSubmit, setNewOwnerSubmit] = useState(false);

  const [ordered, setOrdered] = useState(false);

  useEffect(
    () => {
        if (newOwnerSubmit && chosenDog) {
            const newOwnerDetails = {
                name: newOwnerName,
                zip: zipInput,
                city: cityInput,
                street: streetInput,
                phone: phoneInput,
                email: emailInput,
                motivation: motivation,
                chosenDogId: chosenDog.id,
                chosenDogName: chosenDog.name,
            }
    
            fetch("http://127.0.0.1:9000/new_owner_info", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOwnerDetails)
            })
            .then(res => res.json())
            .then(dogs => {
              setDogs(dogs);
            })
            setOrdered(true);
        }
        return () => {
          setNewOwnerSubmit(false);
        }
    },
    [newOwnerSubmit]
)
 

  return (
    <section id='formSection'>
      {!ordered && (
      <fieldset className="fieldset">
        <h2>Please add your contact information, so we can send you the doggo of your dreams and fantasies!</h2>
        <legend><img className="happydoggo" src="/images/doggo.png" alt=""/></legend>
        <form className="form" onSubmit={(e) => {
            e.preventDefault();
            setNewOwnerSubmit(true);
        }}>        
          <label>Please add your name:</label>
          <input type="text" name="text" placeholder="your name" value={newOwnerName} onChange={(e) => setNewOwnerName(e.target.value)} />

          <label>Please add your address:</label>
          <span>
            <input type="text" name="zip" placeholder="zip" value={zipInput} onChange={(e) => setZipInput(e.target.value)} />
            <input type="text" name="city" placeholder="city" value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
          </span>
          <input type="text" name="street" placeholder="streetname and number" value={streetInput} onChange={(e) => setStreetInput(e.target.value)} />
          <span>
            <input type="text" name="phone" placeholder="(06)XX-XXX-XXXX" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
            <input type="email" name="email" placeholder="e-mail" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
          </span>
          <label>Please tell us, why do you want the chosen doggo in your household and tell us more about yourself! (inspiration, dreams, do you cry under the shower, etc.) Maximum 1000 character!</label>
          <textarea rows="2" cols="60" maxLength="1000" value={motivation} onChange={(e) => setMotivation(e.target.value)} />
          <button className="submitBtn">Order your pal!</button>
        </form>
      </fieldset>)}
      {chosenDog && !ordered && (
        <fieldset className="fieldSetChosenDog">
          <legend align="left" className="dogNameLegend">{chosenDog.name}</legend>
          <img src={chosenDog.img} alt=""/>

          <div className="chosenDogInfos">
            <h5>Breed: </h5>
            <p>{chosenDog.breed}</p>
          </div>

          <div className="chosenDogInfos">
            <h5>Gender:</h5>
            <p>{chosenDog.gender}</p>
          </div>

          <div className="chosenDogInfos">
            <h5>Training:</h5>
            <p>{chosenDog.training}</p>
          </div>

          <div className="chosenDogInfos">
            <h5>Introduction:</h5>
            <p>{chosenDog.introduction}</p>
          </div>
        </fieldset>
      )}
      {ordered && <FormSectionSubmit />}
    </section>
  )
}

export default FormSection;