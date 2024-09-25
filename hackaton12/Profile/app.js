// Import the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


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

// Get the studentId from localStorage
const studentId = localStorage.getItem("studentId");
const back_btn =document.getElementById("back_btn");

back_btn.addEventListener("click", back);
function  back(){
    window.location.href="../student_portal/index.html"
}
// Profile elements
const profileContainer = document.getElementById("profileContainer");

// Fetch and display profile data
async function displayProfile() {
    if (!studentId) {
        profileContainer.innerHTML = "No student is logged in.";
        return;
    }

    try {
        // Retrieve the student's profile from Firestore
        const profileRef = doc(db, "profile", studentId);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
            const profileData = profileSnap.data();
            profileContainer.innerHTML = `
                <h2>Student Profile</h2>
                <p><strong>First Name:</strong> ${profileData.firstName}</p>
                <p><strong>Last Name:</strong> ${profileData.lastName}</p>
                <p><strong>Student ID:</strong> ${profileData.studentId}</p>
                <p><strong>CNIC:</strong> ${profileData.cnic}</p>
            `;
        } else {
            profileContainer.innerHTML = "Profile data not found.";
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
        profileContainer.innerHTML = "Error fetching profile data.";
    }
}

// Call the function to display profile data
displayProfile();
