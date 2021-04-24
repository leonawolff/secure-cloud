import firebase from 'firebase';
import 'firebase/firestore'; 
import 'firebase/auth';

  var firebaseConfig = {
    apiKey: "AIzaSyBeBmi12Jqr6W8e860GZNtvsYVWlZx3_9Y",
    authDomain: "cloud-21b8f.firebaseapp.com",
    projectId: "cloud-21b8f",
    storageBucket: "cloud-21b8f.appspot.com",
    messagingSenderId: "1038659760662",
    appId: "1:1038659760662:web:f820d46ccd89f63642fb37"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp;