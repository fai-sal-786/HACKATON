// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const logout_btn = document.getElementById("logout_btn");
logout_btn.addEventListener("click", logout);

studentFrom.addEventListener("click", register);
function register(){
    window.location.href = "../registration/index.html"
}

studentPortal_btn.addEventListener("click", portal);
function portal(){
    window.location.href="../portal/index.html"
} 

studentMarks_btn.addEventListener("click", marks);
function  marks() {
    window.location.href="../marks/index.html"
}

async function logout() {
    try {
        await signOut(auth);
        window.location.href = "../login/index.html";
    } catch (error) {
        console.error("Sign out error:", error.message);
    }
}
