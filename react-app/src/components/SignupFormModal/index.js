import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
//   const history = useHistory()
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {

    e.preventDefault();
    // if (password === confirmPassword) {
    //   setErrors([]);
    //   return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
    //     .then(closeModal)
    //     .then(history.push('/'))
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     });
    // }
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='signup-holder'>
      <div className='signup-line-holder'>

      <h1 className='signup-line'>Sign Up</h1>
      </div>

      {/* <div className='welcome'> <h3 className='weclome-h3'>Welcome to Sparebnb</h3></div> */}

    <div className='form-holder'>

<form className='signup-form-css' onSubmit={handleSubmit}>
        {/* <ul className='errorlist'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}

        <div className='input-holder'>

 <label>
          
          <input
          className='input-line'
          placeholder='Email'
            type="text"
            // value={email}
            title='Email Address'
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
         
          <input
            type="text"
            placeholder="Name"
            className='input-line'
            // value={name}
            title='Name'
            // onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {/* <label>
          
          <input
          className='input-line'
          placeholder='First Name'
            type="text"
            value={firstName}
            title='First Name'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          
          <input
          className='input-line'
            type="text"
            placeholder='Last Name'
            value={lastName}
            title='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label> */}
        <label>
          
          <input
          className='input-line'
            type="password"
            placeholder='Password'
            // value={password}
            title='Password'
            // onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          
          <input
          className='input-line2'
            type="password"
            placeholder='Confirm Password'
            // value={confirmPassword}
            title='Confirm Password'
            // onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        </div>
       
        <button type="submit">Sign Up</button>
      </form>

    </div>

      
    </div>
  );
}

export default SignupFormModal;