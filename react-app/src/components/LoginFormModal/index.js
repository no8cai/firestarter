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

    const onLogin = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      }
    };

    const updateEmail = (e) => {
      setEmail(e.target.value);
    };
  
    const updatePassword = (e) => {
      setPassword(e.target.value);
    };  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = await dispatch(login(email, password)).then(closeModal).then(history.push('/'));
  //   if (data) {
  //       setErrors(data)
  //   }
  // };

  const demoLogin = async (e) => {
    e.preventDefault();

    // setEmail('brad@aa.io')
    // setPassword('passwordBrad')

    const demoEmail = 'brad@aa.io'
    const demoPassword = 'passwordBrad'

    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    }

    // e.preventDefault();
    // const demoEmail = 'brad@aa.io'
    // const demoPassword = 'passwordBrad'
    // const data = await dispatch(login(demoEmail, demoPassword)).then(closeModal).then(history.push('/'));
    // if (data) {
    //     setErrors(data)
    // }
  }

  if (user) {
    closeModal()
    // pushes to profile page like Kickstarter does on login; can remove to stay on whatever page logged in on originally
    // history.push('/profile')
    return <Redirect to='/profile' />;
  }


  return (
    <div className='login-holder'>
      <div className='login-line-holder'>

      {/* <h1 className='login-line'>Log in</h1> */}
      </div>

      <div className='welcome'> <h3 className='weclome-h3'>Log In</h3></div>

    <div className='form-holder'>

      <form className='login-form-css' onSubmit={onLogin}>
        <ul className='errorlist'>
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
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
            onChange={updateEmail}
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
            onChange={updatePassword}
            required
          />
        </label>
        </div>
        <button className="form-button" type="submit">Log In</button>
      </form>

            <div className='form-holder'>
               <form className='login-form-css' onSubmit={demoLogin}>
                <div className='login-break'>or</div>
      <button className="form-button" type="submit">Sign in as a Demo User</button>
    </form>
            </div>

    </div>
    </div>
  );
}

export default LoginFormModal;
