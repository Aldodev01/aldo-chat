const { default: firebase } = require("firebase");


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCmeZUOZzQIkiyyFPCy6F2dgGr89nTJow",
  authDomain: "aldochat-ba798.firebaseapp.com",
  databaseURL: "https://aldochat-ba798-default-rtdb.firebaseio.com",
  projectId: "aldochat-ba798",
  storageBucket: "aldochat-ba798.appspot.com",
  messagingSenderId: "766827420038",
  appId: "1:766827420038:web:582af5b9b3ea3eec8bb407",
  measurementId: "G-H18C0JL1ML"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export { auth, provider }
  export default db