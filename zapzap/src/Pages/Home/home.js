import React, { Component } from 'react';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import './home.css';
import images from '../../ProjectImages/projectimages';
import { Link } from 'react-router-dom';

export default class HomePage extends Component{
    render(){
        return(
            <>
            <Header />
                <div className="splash-container">
                    <div className="splash">
                        <h1 class="splash-head">WEB CHAT APP</h1>
                        <p className="splash-subhead">
                            Let's talk with our loved ones
                        </p>
                        
                        <div id="custom-button-wrapper">
                            <Link to="/login">
                                <a className="my-super-cool-btn">
                                    <div className="dots-container">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                    <span className="buttoncooltext">Get Started</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="content-wrapper">
                    <div className="content">
                        <h2 className="content-head is-center"> Features of Web Chat Application</h2>
                       
                        <div className="Appfeatures">
                           
                            <div className="contenthead">
                                <h3 className="content-subhead">
                                    <i className="fa fa-rocket"></i>
                                    Get Started Quickly
                                </h3>
                                <p>Just register yourself with this app and start chating with your loved ones.</p>
                            </div>
                           
                            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                                <h3 className="content-subhead">
                                    <i className="fa fa-sign-in"></i>
                                    Firebase Authentication
                                </h3>
                                <p>Firebase Authentication has been implemented in this app</p>
                            </div>
                           
                            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                                <h3 className="content-subhead">
                                    <i className="fa fa-th-large"></i>
                                    Media
                                </h3>
                                <p>You can share images with your friends for better experience</p>
                            </div>
                           
                            <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                                <h3 className="content-subhead">
                                    <i className="fa fa-refresh"></i>
                                    Updates
                                </h3>
                                <p>We will working with new features for this app for better experience in</p>
                            </div>


                            <div className="AppfeaturesFounder">
                                <div className="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
                                    <img src="" alt="" width="300" className="pure-img-responsive" src={images.ariel} />
                                </div>
                                <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">
                                    <h2 className="content-head content-head-ribbon">Ariel Son</h2>
                                
                                    <p style={{ color:'white' }}>Currently working at coding cafe and busy to explore new ideas with new technologies being developed.</p>
                                </div>
                            </div>

                            <div className="Appfeatures">
                                <div>Some frontend stuff here that i dont wanna do more</div>
                            </div>
                       
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        )
    }
}