import React, { useState } from 'react';
import './AdminLogin.css';
import { FaTimes } from 'react-icons/fa';
import md5 from 'blueimp-md5';

function AdminLogin({setAdminLoggedIn, setAdminTryLogin, adminLoggedIn, adminTryLogout}) {
    const [invalidUserPass, setInvalidUserPass] = useState(false);
    const [userNameAdmin, setUserNameAdmin] = useState('');
    const [userPassword, setUserPassword] = useState('');

    function validateLogin(e) {
        e.preventDefault()
        if (md5(e.target.username.value) === "21232f297a57a5a743894a0e4a801fc3" && md5(e.target.password.value) === "21232f297a57a5a743894a0e4a801fc3") {
            setInvalidUserPass(false);
            setAdminLoggedIn(true);
            setAdminTryLogin(false);
            localStorage.setItem('adminLoggedIn', md5(e.target.password.value));
        } else {
            setInvalidUserPass(true);
        }
    }

    function cancelLogin() {
        setAdminTryLogin(false);
    }

    function handleLogout() {
        setAdminLoggedIn(false);
        setAdminTryLogin(false);
        localStorage.clear();
    }

  return (
    <>
        {!adminLoggedIn ? (
            <form className='adminLogin' onSubmit={validateLogin}>
                <div>
                    <h3>Username:</h3>
                    <input type="text" name="username" value={userNameAdmin} id="username" onChange={(e) => setUserNameAdmin(e.target.value)} />
                    {invalidUserPass && <FaTimes className="invalid" />}
                </div>
                <div>
                    <h3>Password:</h3>
                    <input type="password" name="password" value={userPassword} id="password" onChange={(e) => setUserPassword(e.target.value)} />
                    {invalidUserPass && <FaTimes className="invalid" />}
                </div>
                <div>
                    <button className='login'>Login</button>
                    <button type='button' className='cancel' onClick={cancelLogin}>Cancel</button>
                </div>
            </form>
        ) : (
            <button className='adminLogout' onClick={handleLogout}>Logout</button>
        )}
    </>
  )
}

export default AdminLogin