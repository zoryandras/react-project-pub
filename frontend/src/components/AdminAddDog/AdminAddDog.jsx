import React, { useEffect, useState } from 'react';
import './AdminAddDog.css';
import { FaCheckCircle } from 'react-icons/fa';

function AdminAddDog({ setaddNewDog, setDogs }) {
    const [nameInput, setNameInput] = useState("");
    const [breedInput, setBreedInput] = useState("");
    const [genderInput, setGenderInput] = useState("");
    const [trainingInput, setTrainingInput] = useState("");
    const [introductionInput, setIntroductionInput] = useState("");

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const [submit, setSubmit] = useState(false);

    useEffect(
        () => {
            if (submit && isFilePicked) {

                const newDogDetails = new FormData();
                newDogDetails.append("name", nameInput);
                newDogDetails.append("breed", breedInput);
                newDogDetails.append("gender", genderInput);
                newDogDetails.append("training", trainingInput);
                newDogDetails.append("introduction", introductionInput);
                newDogDetails.append("img", `/images/${selectedFile.name}`);
                newDogDetails.append('file', selectedFile);

                fetch("http://127.0.0.1:9000/add_new_dog", {
                    method: "POST",
                    body: newDogDetails
                })
                .then(res => res.json())
                .then(dogs => {
                    setDogs(dogs);
                })
                setaddNewDog(false);
            }
            return () => {
                setSubmit(false)
                setIsFilePicked(false)
            }
        },
        [submit]
    )

    function cancelAddDog() {
        setaddNewDog(false)
    }

    return (
        
        <form className='adminAddDog' onSubmit={(e) => {
                e.preventDefault();
                setSubmit(true);
            }}>
         
            <h1>Add new doggo!</h1>
            <div>
                <label htmlFor="dogImage" className='custom-file-upload'>
                    Upload photo
                    {isFilePicked && <FaCheckCircle className='check'/>}
                </label>
                <input type="file" name="dogImage" id="dogImage" onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                    setIsFilePicked(true);
                }} required />
            </div>
            <div>
                <input type="text" placeholder='Name' name="name" id="name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} required />
            </div>
            <div>
                <input type="text" name="breed" placeholder='Breed' id="breed" value={breedInput} onChange={(e) => setBreedInput(e.target.value)} required />
            </div>
            <div>
                <input type="text" name="gender" placeholder='Gender' id="gender" value={genderInput} onChange={(e) => setGenderInput(e.target.value)} required />
            </div>
            <div>
                <textarea name="training" id="training" placeholder='Training' cols="30" rows="5" value={trainingInput} onChange={(e) => setTrainingInput(e.target.value)} required ></textarea>
            </div>
            <div>
                <textarea name="introduction" id="introduction" placeholder='Introduction' cols="50" rows="5" value={introductionInput} onChange={(e) => setIntroductionInput(e.target.value)} required ></textarea>
            </div>
            <div>
                <button className='submitNewDog'>Submit</button>
                <button className='cancelNewDog' type='button' onClick={cancelAddDog}>Cancel</button>
            </div>
        </form>
        
    )
}

export default AdminAddDog