// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword ,
 } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDLnDPa_YL_H9XMDpJTvrg9qTut8SCHQro",
  authDomain: "realtime-database-12.firebaseapp.com",
  databaseURL: "https://realtime-database-12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtime-database-12",
  storageBucket: "realtime-database-12.appspot.com",
  messagingSenderId: "972762376521",
  appId: "1:972762376521:web:52d55c36f48e1b75439298",
  measurementId: "G-8P9VJZXVRN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
console.log("Auth=>", auth);



onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user is logged In")
      const uid = user.uid;
      // ...
    } else {
      console.log("user is not logged In")
    }
  });

const login_email = document.getElementById("login_email");
const login_pass = document.getElementById("login_pass");
const login_btn =document.getElementById("login_btn");

login_btn.addEventListener("click", createUserAccount);

function createUserAccount(){
    signInWithEmailAndPassword(auth, login_email.value, login_pass.value)
  .then((userCredential) => {
    const user = userCredential.user;

    console.log("user")
    window.location.href = "../admin/index.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });

}