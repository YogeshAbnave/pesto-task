// const { initializeApp } = require("firebase/app");
// const { getFirestore } = require("firebase/firestore");
// https://node-express-api-bd790.firebaseapp.com/__/auth/action?mode=action&oobCode=code
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { credential } = require('firebase-admin');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require('./secret-key/node-express-api-bd790-firebase-adminsdk-zssl1-bc6a5b5956.json');


// Initialize Firebase Admin
const app = initializeApp({
    credential: credential.cert(serviceAccount),
    databaseURL: 'https://node-express-api-bd790.firebaseio.com', // Replace with your Firestore database URL
    apiKey: "AIzaSyDSQcUtfi81825a2o3PpOwFG6ijGwwaihg",
    authDomain: "node-express-api-bd790.firebaseapp.com",
    projectId: "node-express-api-bd790",
    storageBucket: "node-express-api-bd790.appspot.com",
    messagingSenderId: "309287485527",
    appId: "1:309287485527:web:9eb1008e245ce23755a312",
    measurementId: "G-G4JCE1P4XR"
});


// Access Firestore database
const db = getFirestore(app);
console.log("credential", credential.cert);
  const tasksCollection = db.collection('task-management')
  
  module.exports = tasksCollection;
