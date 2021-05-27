import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// Firebase web config
const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

export const FirebaseContext = React.createContext<firebase.User>(null)

export default class Firebase {
  auth: firebase.auth.Auth;
  user: firebase.User

  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
  }
  
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
  
  doPasswordUpdate = (password: string) =>
    this.auth.currentUser.updatePassword(password);
}
  