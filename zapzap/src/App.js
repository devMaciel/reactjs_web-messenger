import React, { Component } from 'react';
import { 
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import firebase from './Services/firebase';
import { toast, ToastContainer, toastContainer } from 'react-toastify';

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

  //constructor
  constructor(){
    super();
    this.state = {
      authenticated: false,
      loading: true
    }
  }

  //life cycle method (class componenet OLD)
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      
      if(user){
        this.setState({
          authenticated: true,
          loading: false
        });
      }else{
        this.setState({
          authenticated: false,
          loading: false
        })
      }

    });
  }

  render(){
    return this.state.loading === true ? (

      <div className="spinner-border text-success" role='status'>
        <span className="sr-only">Loading...</span>
      </div>
    
    ) : (
      <Router>

        <ToastContainer
          autoClose = {2000}
          hideProgressBar = {true}
          position = {toast.POSITION.TOP_CENTER}
        />

        <Switch>

          <Route
            exact
            path="/"
            render={props => <Home {...props} />}
          />

          <Route
            path="/login"
            render={props => <Login showToast={this.showToast} {...props} />}
          />

          <Route
            path="/profile"
            render={props => <Profile showToast={this.showToast} {...props} />}
          />

          <Route
            path="/signup"
            render={props => <Signup showToast={this.showToast} {...props} />}
          />

          <Route
            path="/chat"
            render={props => <Chat showToast={this.showToast} {...props} />}
          />

        </Switch>

      </Router>
    )
  }

}

export default App;
