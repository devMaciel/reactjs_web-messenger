import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./signup.css";
import firebase from '../../Services/firebase';

import { Card } from 'react-bootstrap';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            name:"",
            error:null
        }
    }

    render(){

        const Signinsee = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'White',
            backgroundColor: '#1ebea5',
            width: '100%',
            boxShadow: '0 5px 5px #808888',
            height: '10rem',
            paddingTop:'48px',
            opacity:'0.5',
            borderBottom:'5px solid green'
        }

        return(
            <div>
                <CssBaseline />

                <Card style={Signinsee}>
                    <div>
                    <Typography component="h1" variant="h5">
                        Sign Up
                        To
                    </Typography>
                    </div>

                    <div>
                        <Link to="/">
                            <button className="btn"><i className="fa fa-home"></i> WebChat</button>
                        </Link>
                    </div>
                </Card>

                <Card className="formacontrooutside">
                    <form className="customform" noValidate onSubmit={this.handleSubmit}>
                       
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address-example:abc@gmail.com"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.handlechange}
                            value={this.state.email}
                        />

                        <div>
                            <p style={{ color:'grey', fontSize:'15px', marginLeft:'0' }}>
                                Password: length greater than 6 (alphanumeric)
                            </p>
                        </div>

                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            autoFocus
                            onChange={this.handlechange}
                            value={this.state.password}
                        />

                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Your Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={this.handlechange}
                            value={this.state.name}
                        />

                        <div>
                            <p style={{ color:'grey', fontSize:'15px' }}>
                                Please fill all fields and password should be greater than 6
                            </p>
                        </div>

                        <div className="CenterAliningItems">
                            <button className="button1" type="submit">
                                <span>Sign Up</span>
                            </button>
                        </div>

                        <div>
                            <p style={{ color:'grey' }}>
                                Already have an account?
                            </p>
                            <Link to="/login">
                                Log In
                            </Link>
                        </div>

                        <div className="error">
                            <p id="1" style={{ color:'red' }}></p>
                        </div>

                    </form>
                </Card>

            </div>
        )
    }
}