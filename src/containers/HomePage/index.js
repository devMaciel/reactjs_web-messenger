import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers } from '../../actions';
import Layout from '../../components/Layout'
import './style.css';

/**
* @author
* @function HomePage
**/

const User = (props) => {

    const {user, onClick} = props;

    return (
        <div onClick={() => onClick(user)} className="displayName">
            <div className="displayPic">
                <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
            </div>
            <div style={{ display:'flex', flex:'1', justifyContent:'space-between', margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
                <span>{user.isOnline ? 'online' : 'offline'}</span>
            </div>
        </div>
    );
}

const HomePage = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');


  let unsubscribe;

  useEffect(() => {

    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
    .then(unsubscribe => {
        return unsubscribe;
    })
    .catch(error => {
        console.log(error);
    });

  }, []);  



  useEffect(() => {
    return () => {
        //cleanup
        unsubscribe.then(f => f()).catch(error => console.log(error));
    }
  }, []);


  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    //console.log(user);
  }



  return (
    <Layout>
    <section className="container">
      <div className="listOfUsers">
          {
              user.users.length > 0 ?
              user.users.map(user => {
                  return(
                    <User 
                      onClick={initChat}
                      key={user.uid} 
                      user={user} 
                    />
                  );
              }) : null
          }   
      </div>

      <div className="chatArea">

          <div className="chatHeader">  
            {
                chatStarted ? chatUser : ''    
            }
          </div>

          <div className="messageSections">
              {
                  chatStarted ?
                  <div style={{ textAlign: 'left' }}>
                    <p className="messageStyle" >Hello User</p>
                  </div> : null
              }
          </div>
          
          {
              chatStarted ?
              <div className="chatControls">
                <textarea />
                <button>Send</button>
              </div> : null
          }

      </div>
  </section>
  </Layout>
  );
}

export default HomePage;