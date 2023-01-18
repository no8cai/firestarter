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
import * as sessionActions from "./store/session";
import Testing from './components/Testing';
import SearchResultPage from './components/Search';
import ManageCenter from './components/Profile';
import ProjectEntry from './components/Projects';

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
      <Navigation isLoaded={loaded} />
      {loaded && (
      <Switch>
        <Route path='/' exact={true}>
          <Landing />
        </Route>
        <Route path={['/profile']} >
          <ManageCenter />
        </Route>
          <Route path={['/createproject','/editproject/:projectId']} >
          <ProjectEntry />
        </Route>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        {/* <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route> */}
        <Route path='/projects/:id'exact={true} >
          <SingleProject/>
        </Route>
        <Route path='/testing' exact={true}>
          <Testing/>
        </Route>
        <Route path='/discover/:category' exact={true}>
          <SearchResultPage />
        </Route>
      </Switch>
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
