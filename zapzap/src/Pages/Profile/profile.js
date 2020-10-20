import React from 'react';
import './profile.css';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../Services/firebase';
import images from '../../ProjectImages/projectimages';
import LoginString from '../Login/loginstrings';

export default class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            documentKey: localStorage.getItem(LoginString.FirebaseDocumentId),
            id: localStorage.getItem(LoginString.ID),
            name: localStorage.getItem(LoginString.Name),
            aboutMe: localStorage.getItem(LoginString.Description),
            photoUrl: localStorage.getItem(LoginString.PhotoURL)
        }

        this.newPhoto = null;
        this.newPhotoUrl = "";
    }

    componentDidMount(){
        //user not auth
        if(!localStorage.getItem(LoginString.ID)){
            this.props.history.push("/")
        }
    }

    onChangeNickname = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onChangeAboutMe = (event) => {
        this.setState({
            aboutMe: event.target.value
        })
    }

    onChangeAvatar = (event) => {
        if(event.target.files && event.target.files[0]){
            const prefixFiletype = event.target.files[0].type.toString();
            
            //validation
            if(prefixFiletype.indexOf(LoginString.PREFIX_IMAGE) !== 0){
                this.props.showToast(0, "This file is not and image")
                return;
            }

            this.newPhoto = event.target.files[0];
            this.setState({
                photoUrl: URL.createObjectURL(event.target.files[0])
            })
        }else{
            this.props.showToast(0, "Something wrong with input file");
        }
    }

    uploadAvatar = () => {
        this.setState({
            isLoading: true
        })

        if(this.newPhoto){
            const uploadTask = firebase.storage()
            .ref()
            .child(this.state.id)
            .put(this.newPhoto)
            uploadTask.on(
                LoginString.UPLOAD_CHANGED,
                null,
                err => {
                    this.props.showToast(0, err.message)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        this.updadeUserInfo(true, downloadURL)
                    })
                }
            )
        }else{
            //nothing inside
            this.updadeUserInfo(false, null)
        }
    }

    updadeUserInfo = (isUpdatedPhotoURL, downloadURL) => {
        let newinfo;
        //update with photo else without
        if(isUpdatedPhotoURL){
            newinfo = {
                name: this.state.name,
                Description: this.state.aboutMe,
                URL: downloadURL
            }
        }else{
            newinfo = {
                name: this.state.name,
                Description: this.state.aboutMe
            }
        }

        firebase.firestore().collection('users')
        .doc(this.state.documentKey)
        .update(newinfo)
        .then(data => {
            localStorage.setItem(LoginString.Name, this.state.name)
            localStorage.setItem(LoginString.Description, this.state.aboutMe)
            if(isUpdatedPhotoURL){
                localStorage.setItem(LoginString.PhotoURL, downloadURL)
            }
            this.setState({
                isLoading: false
            })
            this.props.showToast(1, 'Updated info successfuly')
        })
    }

    render(){
        return(
            <div className="profileroot">

                <div className="headerprofile">
                    <span>PROFILE</span>
                </div>

                <img className="avatar" src={this.state.photoUrl} alt=""/>
               
                <div className="viewWrapInputFile">
                    <img 
                        className="imgInputFile"
                        alt="icon gallery"
                        src={images.choosefile}
                        onClick={() => {this.refInput.click()}}
                    />
                    <input 
                        ref={el => {this.refInput = el}} 
                        accept="image/*"
                        className="viewInputFile"
                        type="file"
                        onChange={this.onChangeAvatar}
                    />
                </div>

                <span className="textLabel">Name</span>
                <input 
                    className="textInput"
                    value={this.state.name ? this.state.name : ""}
                    placeholder="Your nickname..."
                    onChange={this.onChangeNickname}
                />

                <span className="textLabel">About Me</span>
                <input 
                     className="textInput"
                     value={this.state.aboutMe ? this.state.aboutMe : ""}
                     placeholder="Tell about yourself..." 
                     onChange={this.onChangeAboutMe}              
                />

                <div>
                    <button className="btnUpdate" onClick={this.uploadAvatar}>Save</button>
                    <button className="btnback" onClick={() => {this.props.history.push('/chat')}}>Back</button>
                </div>

                {this.state.isLoading ? (
                    <div>
                        <ReactLoading 
                            type={'spin'}
                            color={'#203152'}
                            height={'3%'}
                            width={'3%'}
                        />
                    </div>
                ): null}

            </div>
        )
    }
}