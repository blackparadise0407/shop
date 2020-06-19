import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCI1j9ADlFkn7hO6OOM2uW6Y74n5Ql8WtM",
    authDomain: "reactshop-be18d.firebaseapp.com",
    databaseURL: "https://reactshop-be18d.firebaseio.com",
    projectId: "reactshop-be18d",
    storageBucket: "reactshop-be18d.appspot.com",
    messagingSenderId: "434840428672",
    appId: "1:434840428672:web:a8e354bccb345ce8d70665"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}