import React, { useState } from "react";
import { login } from '../../store/session'
import {  useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory, Redirect } from "react-router-dom";


function LoginFormModal() {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password)).then(closeModal).then(history.push('/'));
    if (data) {
        setErrors(data)
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = 'kirin@aa.io'
    const demoPassword = 'passwordKirin'
    const data = await dispatch(login(demoEmail, demoPassword)).then(closeModal).then(history.push('/'));
    if (data) {
        setErrors(data)
    }
  }


  return (
    <div className='login-holder'>
      <div className='login-line-holder'>

      {/* <h1 className='login-line'>Log in</h1> */}
      </div>

      <div className='welcome'> <h3 className='weclome-h3'>Log In</h3></div>

    <div className='form-holder'>

      <form className='login-form-css' onSubmit={handleSubmit}>
        <ul className='errorlist'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <div className='input-holder'>
        <label>

          <input
          className='input-line'
            type="text"
            value={email}
            placeholder='Email'
            title='Email Address'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>

          <input
            type="password"
            className='input-line2'
            value={password}
            placeholder='Password'
            title='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </div>
        <button type="submit">Log In</button>
      </form>

            <div className='form-holder'>
               <form className='login-form-css' onSubmit={demoLogin}>
                <div className='login-break'>or</div>
      <button type="submit">Demo User Login</button>
    </form>
            </div>

    </div>
    </div>
  );
}

export default LoginFormModal;
