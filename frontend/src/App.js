import React, {useState, useEffect} from 'react';
import './App.css';
import DogSelector from './components/DogSelector/DogSelector';
import FormSection from './components/FormSection/FormSection';
import LandingSection from './components/LandingSection/LandingSection';
import AdminLogin from './components/AdminLogin/AdminLogin';
import { FaRegUser, FaCheckSquare } from 'react-icons/fa';

function App() {
  const [dogs, setDogs] = useState([]);
  const [chosenDog, setChosenDog] = useState(null)
  const [readMore, setReadMore] = useState(null)

  const [adminTryLogin, setAdminTryLogin] = useState(false);
  const [adminTryLogout, setAdminTryLogout] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(
    () => {
      fetch("http://127.0.0.1:9000/dogs")
      .then(res => res.json())
      .then(dogsData => {
        setDogs(dogsData);
      })
    },
    []
  )

  useEffect(
    () => {
      localStorage.getItem('adminLoggedIn') === "21232f297a57a5a743894a0e4a801fc3" && setAdminLoggedIn(true) 
    },
    []
  )

  return (
    <div className="App">
      <button className='adminBtn' onClick={() => {
          setAdminTryLogin(true)
          adminTryLogout ? setAdminTryLogout(false) : setAdminTryLogout(true)
        }}>
        <FaRegUser className='loginIcon'/>
        {adminLoggedIn && <FaCheckSquare className='loggedInIcon' />}
      </button>
      <LandingSection />
      <DogSelector dogs={dogs} setChosenDog={setChosenDog} readMore={readMore} setReadMore={setReadMore} setAdminTryLogin={setAdminTryLogin} adminLoggedIn={adminLoggedIn} setDogs={setDogs} />
      <FormSection chosenDog={dogs[chosenDog]} setDogs={setDogs} />
      {adminTryLogin && <AdminLogin setAdminLoggedIn={setAdminLoggedIn} setAdminTryLogin={setAdminTryLogin} adminLoggedIn={adminLoggedIn} adminTryLogout={adminTryLogout} />}
    </div>
  );
}

export default App;
