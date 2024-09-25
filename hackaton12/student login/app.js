// Import the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCl6RfAL7ZYJklKKEaXMhacF_2iBb7g19c",
//     authDomain: "hackathon-8896a.firebaseapp.com",
//     projectId: "hackathon-8896a",
//     storageBucket: "hackathon-8896a.appspot.com",
//     messagingSenderId: "7922859534",
//     appId: "1:7922859534:web:2326c367f836ef5e9c065f",
//     measurementId: "G-1ESVRC6VH1"
// };

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
const db = getFirestore(app);

// Collection reference
const addlistCollection = collection(db, "addlist");

// Form elements
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const studentId = document.getElementById("studentId").value;
    const cnic = document.getElementById("cnic").value;

    try {
        // Retrieve student records
        const querySnapshot = await getDocs(addlistCollection);
        let isMatch = false;
        let matchedStudent = null;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.firstName === firstName && data.lastName === lastName && data.studentId === studentId && data.cnic === cnic) {
                isMatch = true;
                matchedStudent = data; // Store matched student data
            }
        });

        if (isMatch) {
            // Save the student's data to the "profile" collection
            const profileRef = doc(db, "profile", studentId); // Use studentId as document ID
            await setDoc(profileRef, {
                firstName: matchedStudent.firstName,
                lastName: matchedStudent.lastName,
                studentId: matchedStudent.studentId,
                cnic: matchedStudent.cnic,
            });
            localStorage.setItem("studentId", matchedStudent.studentId); 
            // Redirect to student dashboard or another page
            alert("Login successful! Profile data saved.");
            window.location.href = "../student_portal/index.html";
        } else {
            // If no match is found, show error message
            loginError.innerText = "Login failed! Please check your details.";
        }

    } catch (e) {
        console.error("Error logging in:", e.message);
        loginError.innerText = "An error occurred during login. Please try again.";
    }
});