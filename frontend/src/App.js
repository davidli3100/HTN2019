import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider, IfFirebaseAuthed, IfFirebaseUnAuthed, FirebaseAuthConsumer} from "@react-firebase/auth"
import * as config from './config'
import LoggedIn from './screens/loggedin';

function App() {
  console.log(config)
  return (
    <div className="App">
      <FirebaseAuthProvider firebase={firebase} {...config.config}>
        <IfFirebaseAuthed>
          <FirebaseAuthConsumer>
            {({ user }) => {
              return <LoggedIn user={user}/>
            }}
            </FirebaseAuthConsumer>        
          </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          {/* replace with signin screen */}
          <button onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}>
            Sign in with Google
          </button>
        </IfFirebaseUnAuthed>
      </FirebaseAuthProvider>
    </div>
  );
}

export default App;
