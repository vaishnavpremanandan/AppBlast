import { Fragment, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/layout/navbar/NavBar';
import Footer from './components/layout/footer/Footer';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import ShowProject from './pages/ShowProject';
import EditProject from './pages/EditProject';
import Notification from './components/UI/notification/Notification';
import ErrorPage from './pages/ErrorPage';
import Login from './components/user/Login';
import { loginActionHandler } from './store/auth-actions';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const showLogin = useSelector(state => state.login.show);

  useEffect(() => {
    dispatch(loginActionHandler());
  }, []);

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default App;
