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

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else setErrors(["The password entries do not match."])
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    closeModal()
    return <Redirect to='/' />;
  }

  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   if (password === repeatPassword) {
  //     const data = await dispatch(signUp(username, email, password)).then(closeModal).then(history.push('/'));
  //     if (data) {
  //       setErrors(data)
  //     }
  //   }
  //   return setErrors(['Confirm Password field must be the same as the Password field']);
  // };

  return (
    <div className='signup-holder'>
      <div className='signup-line-holder'>

      {/* <h1 className='signup-line'>Sign Up</h1> */}
      </div>

      <div className='welcome'> <h3 className='weclome-h3'>Sign Up</h3></div>

    <div className='form-holder'>

<form className='signup-form-css' onSubmit={onSignUp}>
        <ul className='errorlist'>
          {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
          ))}
        </ul>

        <div className='input-holder'>

 <label>
        <label>
         
          <input
            type="text"
            placeholder="Name"
            className='input-line'
            value={username}
            title='Name'
            onChange={updateUsername}
            required
          />
        </label>
          
          <input
          className='input-line'
          placeholder='Email'
            type="text"
            value={email}
            title='Email Address'
            onChange={updateEmail}
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
            onChange={updatePassword}
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
            onChange={updateRepeatPassword}
            required
          />
        </label>

        </div>
       
        <button className="form-button" id="override-hover" type="submit">Create account</button>
      </form>

    </div>

      
    </div>
  );
}

export default SignupFormModal;