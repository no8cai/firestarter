import React, { useState } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  const history = useHistory()
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password)).then(closeModal).then(history.push('/'));
      if (data) {
        setErrors(data)
        // closeModal()
      }
      // setErrors([]);
      // return console.log("test signup", {email, name, password})
      // return dispatch(signUp({ email, username, password }))
      //   .then(closeModal)
      //   .then(history.push('/'))
      //   .catch(async (res) => {
      //     const data = await res.json();
      //     if (data && data.errors) setErrors(data.errors);
      //   });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  // if (user) {
  //   return <Redirect to='/' />;
  // }

  return (
    <div className='signup-holder'>
      <div className='signup-line-holder'>

      {/* <h1 className='signup-line'>Sign Up</h1> */}
      </div>

      <div className='welcome'> <h3 className='weclome-h3'>Sign Up</h3></div>

    <div className='form-holder'>

<form className='signup-form-css' onSubmit={handleSubmit}>
        <ul className='errorlist'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

        <div className='input-holder'>

 <label>
          
          <input
          className='input-line'
          placeholder='Email'
            type="text"
            value={email}
            title='Email Address'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
         
          <input
            type="text"
            placeholder="Name"
            className='input-line'
            value={username}
            title='Name'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          
          <input
          className='input-line'
            type="password"
            placeholder='Password'
            value={password}
            title='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          
          <input
          className='input-line2'
            type="password"
            placeholder='Confirm Password'
            value={repeatPassword}
            title='Confirm Password'
            onChange={(e) => setRepeatPassword(e.target.value)}
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