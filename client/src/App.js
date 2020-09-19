import React from 'react';
import {useSelector} from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {userLoginHelper, userLogout} from './redux/actions/userAction'
import setAuthToken from './redux/helper/setAuthToken'
import store from './redux/store'

//Components
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Cart from './pages/Admin/Cart'
import Navbar from './components/Navbar'
import Payment from './pages/Admin/Payment'
import MyCourses from './pages/Admin/MyCourses'
import CourseDetails from './pages/Admin/CourseDetails'
import Profile from './pages/Admin/Profile'

//Admin
import UploadVideos from './pages/Admin/UploadVideos'


if (window.localStorage.userJwtToken) {
  setAuthToken(localStorage.userJwtToken);
  const decoded = jwt_decode(localStorage.userJwtToken);
  store.dispatch(userLoginHelper(decoded.user))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(userLogout());
    window.location.href = '/';
  }
}




function App() {
  const store = useSelector(store => store.userRoot)
  
  return (
    <div className="App">
      <Router>
        {store.isAuthenticated ? <Navbar /> : null}
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/addCourse" component={UploadVideos} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/payment/:courseId" component={Payment} />
          <Route exact path="/myCourses" component={MyCourses} />
          <Route exact path="/courseDetails/:courseId" component={CourseDetails} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
