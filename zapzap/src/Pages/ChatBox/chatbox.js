import React from 'react';
import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../Services/firebase';
import images from '../../ProjectImages/projectimages';
import moment from 'react-moment';
import './chatbox.css';
import LoginString from '../Login/loginstrings';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class ChatBox extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            isShowSticker: false,
            inputValue: ""
        }

        this.currentUserName = localStorage.getItem(LoginString.Name);
        this.currentUserId = localStorage.getItem(LoginString.ID);
        this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL);
        this.currentUserMessages = localStorage.getItem(LoginString.Messages);
        this.currentUserDocumentId = localStorage.getItem(LoginString.FirebaseDocumentId);
        
        this.stateChanged = localStorage.getItem(LoginString.UPLOAD_CHANGED);
        this.currentPeerUser = this.props.currentPeerUser;

    }

    componentWillReceiveProps(newProps){
        if(newProps.currentPeerUser){
            this.currentUserPhoto = newProps.currentPeerUser;
            // this.getListHistory();
        }
    }

    componentDidMount(){
        // this.getListHistory();
    }

    render(){
        return(
            <Card className="viewChatBoard">
                <div className="headerChatBoard">
                    <img 
                        className="viewAvatarItem"
                        src={this.currentPeerUser.URL}
                        alt=""
                    />
                    <span className="textHeaderChatBoard">
                        <p style={{ fontSize:'20px' }}>{this.currentPeerUser.name}</p>
                    </span>
                    <div className="aboutme">
                        <span>
                            <p>{this.currentPeerUser.description}</p>
                        </span>
                    </div>
                </div>

                <div className="viewListContentChat">
                    {/* {} */}
                    <div 
                        style={{ float: 'left', clear:'both' }}
                        ref={el => {
                            this.messagesEnd = el
                        }}
                    />
                </div>

                {this.state.isShowSticker ? this.renderSticker(): null}

                <div className="viewBottom">
                    <img 
                        className="isOpenGallery"
                        src={images.input_file}
                        alt="input_file"
                        onClick = {() => {this.refInput.click()}}
                    />

                    <img 
                        className="viewInputGallery"
                        accept="images/*"
                        type="file"
                        onChange={this.onChoosePhoto}
                    />

                    <img 
                        className="icOpenSticker"
                        src={images.sticker}
                        alt="icon open sticker"
                        onClick={this.openListSticker}
                    />

                    <input 
                        className="viewInput"
                        placeholder="Type a message"
                        value={this.state.inputValue}
                        onChange={event => {
                            this.setState({inputValue: event.target.value})
                        }}
                        onKeyPress={this.onKeyPress}
                    />

                    <img 
                        className="icSend"
                        src={images.send}
                        alt="icon send"
                        onClick={() => {this.onSendMessage(this.state.inputValue, 0)}}
                    />

                </div>
            </Card>
        )
    }

    renderSticker = () => {
        return(
            <div className="viewStickers">
                <img
                    className="imgSticker"
                    src={images.lego1}
                    alt="sticker topper"
                    onClick={() => {this.onSendMessage('lego1', 2)}}
                />
            </div>
        )
    }
}