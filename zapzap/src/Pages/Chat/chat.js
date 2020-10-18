import React from 'react';
import LoginString from '../Login/loginstrings';
import firebase from "../../Services/firebase";

export default class Chat extends React.Component{
    constructor(props){
        super(props);
        this.currentUserName = localStorage.getItem(LoginString.Name);
    }

    logout = () => {
        firebase.auth().signOut();
        this.props.history.push('/');
        localStorage.clear();
    }

    render(){
        return(
            <div>
                {this.currentUserName}
                <button onClick={this.logout}>Log out</button>
            </div>
        )
    }
}