import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import SingleProject from './components/SingleProject/Index'
import { authenticate } from './store/session';
import Landing from './components/HomePage';
import Footer from "./components/Footer"
import Navigation from './components/Navigation';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Navigation />
      <Switch>
        <Route path='/' exact={true}>
          <Landing />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        {/* <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route> */}
        <Route path='/project/:id' exact={true}>
          <SingleProject/>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
