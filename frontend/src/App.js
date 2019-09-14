import React, { Component } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider, IfFirebaseAuthed, IfFirebaseUnAuthed, FirebaseAuthConsumer} from "@react-firebase/auth"
import * as config from './config'
import LoggedIn from './screens/loggedin';
import './index.css'
import { Spinner, Heading } from 'evergreen-ui';
import * as Space from 'react-spaces'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(() => { 
      this.setState({loading: false})
    }, 1000);
  }

  render() {
    console.log(config)
    return (
      <div className="App">
        <FirebaseAuthProvider firebase={firebase} {...config.config}>
          <FirebaseAuthConsumer>
            {({ user, isSignedIn }) => {
              if(isSignedIn) {
                return <LoggedIn user={user}/>
              }
              else {
                return this.state.loading ? <div className="spinner"><Spinner size={45}/><Heading paddingTop={12} size={400} className="loading-text">Loading...</Heading></div>
                : 
                <button
                onClick={() => {
                  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(googleAuthProvider);
                }}
              >
                Sign in with Google
              </button>
              }
            }}
            </FirebaseAuthConsumer>        
        </FirebaseAuthProvider>
      </div>
    );
  }
}

export default App;
