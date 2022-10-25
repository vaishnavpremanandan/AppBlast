import React, { Fragment, useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/layout/navbar/NavBar';
import Footer from './components/layout/footer/Footer';
import Notification from './components/UI/notification/Notification';
import Login from './components/user/Login';
import { loginActionHandler } from './store/auth-actions';
import Loading from './components/UI/loading/Loading';

const Projects = React.lazy(() => import('./pages/Projects'));
const NewProject = React.lazy(() => import('./pages/NewProject'));
const ShowProject = React.lazy(() => import('./pages/ShowProject'));
const EditProject = React.lazy(() => import('./pages/EditProject'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const showLogin = useSelector(state => state.login.show);

  useEffect(() => {
    dispatch(loginActionHandler());
  }, []);

  return (
    <Fragment>
      <Suspense fallback={ <Loading /> }>
        {showLogin && <Login />}
        <NavBar />
        <Notification />
        <Switch>
          <Route path='/' exact>
            <Redirect to='/projects' />
          </Route>
          <Route path='/projects' exact>
            <Projects />
          </Route>
          {isLoggedIn &&
            <Route path='/projects/new' exact>
              <NewProject />
            </Route>
          }
          <Route path='/projects/:id' exact>
            <ShowProject />
          </Route>
          {isLoggedIn &&
            <Route path='/projects/:id/edit' exact>
              <EditProject />
            </Route>
          }
          <Route path='*'>
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </Suspense>
    </Fragment>
  )
}

export default App;
