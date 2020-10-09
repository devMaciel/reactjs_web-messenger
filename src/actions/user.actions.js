import { userConstants } from "./constants"
import { firestore } from 'firebase'
 
export const getRealtimeUsers = (uid) => {


    return async (dispatch) => {
        dispatch({
            type: `${userConstants.GET_REALTIME_USERS}_REQUEST`
        });

        const db = firestore();
        const users = [];
        db.collection("users")
        // .where("uid", "!=", uid)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                if(doc.data().uid != uid){
                    users.push(doc.data());
                }
            })
        });

        // console.log(users);

        dispatch({
            type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
            payload: { users }
        })
    }
}