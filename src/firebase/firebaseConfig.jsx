import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { getAuth /* onAuthStateChanged  */ } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//require("dotenv").config()

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAp9XrnMQ2kd-L8I2kVOZJctYBAT-h66tM',
  authDomain: 'polanco-25ef9.firebaseapp.com',
  projectId: 'polanco-25ef9',
  storageBucket: 'polanco-25ef9.appspot.com',
  messagingSenderId: '804200542961',
  appId: '1:804200542961:web:010ee2a2d4e45ec098af50',
});

export const authApp = getAuth(app);
export const firestoreDB = getFirestore(app);
export const storageDocs = getStorage(app);
