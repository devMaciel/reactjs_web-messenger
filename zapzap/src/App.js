import React, { Component } from 'react';
import { 
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import firebase from './Services/firebase';
import { toast, toastContainer } from 'react-toastify';

//Components PAGES
import Home from './Pages/Home/home';
import Chat from './Pages/Chat/chat';
import Profile from './Pages/Profile/profile';
import Signup from './Pages/Signup/signup';
import Login from './Pages/Login/login';

class App extends Component {

  //TOASTIFY notifications, database array 0
  showToast = (type, message) => {
    switch(type){
      case 0:
        toast.warning(message);
        break;

      case 1:
        toast.success(message);
        break;

      default:
        break;
    }
  }

}

export default App;
