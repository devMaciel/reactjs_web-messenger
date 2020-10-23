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
        this.groupChatId = null;
        this.listMessage = [];
        this.currentPeerUserMessages = [];
        this.removeListener = null;
        this.currentPhotoFile = null;

        firebase.firestore()
        .collection('users')
        .doc(this.currentPeerUser.documentKey)
        .get()
        .then((docRef) => {
            this.currentPeerUserMessages = docRef.data().messages
        })
        

    }

    componentDidUpdate(){
        this.scrollToBottom()
    }

    componentWillReceiveProps(newProps){
        if(newProps.currentPeerUser){
            this.currentPeerUser = newProps.currentPeerUser;
            // this.getListHistory();
        }
    }

    componentDidMount(){
        this.getListHistory();
    }

    getListHistory = () => {
        this.listMessage.length = 0
        this.setState({
            isLoading: true
        })

        if(
            this.hashString(this.currentUserId) <=
            this.hashString(this.currentPeerUser.id)
        ){
            this.groupChatId = `${this.currentUserId}-${this.currentPeerUser.id}`
        }else{
            this.groupChatId = `${this.currentPeerUser.id}-${this.currentUserId}`
        }

        //Get history and listen new data added
        this.removeListener = firebase.firestore()
        .collection('Messages')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .onSnapshot(Snapshot => {
            Snapshot.docChanges().forEach(change => {
                if(change.type === LoginString.DOC){ //addeed
                    this.listMessage.push(change.doc.data())
                }
            })
            this.setState({
                isLoading: false
            })
        }), //watch here
        err => {
            this.props.showToast(0, err.toString())
        }
    }

    onSendMessage = (content, type) => {
        let notificationMessages = [];

        if(this.state.isShowSticker && type === 2){
            this.setState({isShowSticker: false})
        }

        if(content.trim() === ''){
            return
        }

        //content,type from args
        const timestamp = moment().valueOf().toString()
        const itemMessage = {
            idFrom: this.currentUserId,
            idTo: this.currentPeerUser,
            timestamp: timestamp,
            content: content.trim(),
            type: type
        }

        firebase.firestore()
        .collection('Messages')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .doc(timestamp)
        .set(itemMessage)
        .then(() =>{
            this.setState({
                inputValue: ''
            })
        })

        this.currentPeerUserMessages.map((item) => {
            if(item.notificationId != this.currentUserId){
                notificationMessages.push({
                    notificationId: item.notificationId,
                    number: item.number //number of messages received
                })
            }
        })

        firebase.firestore()
        .collection('users')
        .doc(this.currentPeerUser.documentKey)
        .update({
            messages: notificationMessages
        })
        .then((data) => {})
        .catch(err => {
            this.props.showToast(0, err.toString());
        })
    }


    scrollToBottom = () => {
        if(this.messagesEnd){
            this.messagesEnd.scrollIntoView({})
        }
    }

    onKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.onSendMessage(this.state.inputValue, 0);
        }
    }

    openListSticker = () => {
        this.setState({isShowSticker: !this.state.isShowSticker})
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
                    {/* { this.renderListMessage() } */}
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

                {
                    this.state.isLoading ? (
                        <div className="viewLoading">
                            <ReactLoading 
                                type={'spin'}
                                color={'#203152'}
                                height={'3%'}
                                width={'3%'}
                            />
                        </div>
                    ) : null
                }

            </Card>
        )
    }


    // renderListMessage = () => {
    //     if(this.listMessage.length > 0){
    //         let viewListMessage = []
    //         this.listMessage.forEach((item, index) => {
    //             if(item.idFrom === this.currentUserId){
    //                 if(item.type === 0){ // 0 is text message
    //                     viewListMessage.push(
    //                         <div className="viewItemRight" key={item.timestamp}>
    //                             <span className="textContentItem">{item.content}</span>
    //                         </div>
    //                     )
    //                 }
    //             }
    //         })
    //     }
    // }

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

    //for groupchatId, firebase doc setup
    hashString = (str) => {
        let hash = 0
        for(let i = 0; i < str.length; i++){
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
            hash = hash & hash // Convert to 32bit integer
        }

        return hash
    }
}