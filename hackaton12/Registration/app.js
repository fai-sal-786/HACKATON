// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


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


const studentCollection = collection(db, "student");
const addlistCollection = collection(db, "addlist");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const studentId = document.getElementById("studentId");
const cnic = document.getElementById("cnic");
const add_btn = document.getElementById("add_btn");
const user_list = document.getElementById("user_list");
const back_btn =document.getElementById("back_btn");

back_btn.addEventListener("click", back);
function  back(){
    window.location.href="../admin/index.html"
}



getStudent();
add_btn.addEventListener("click", addStudent);

async function addStudent() {
        try {
            // Check if a student with the same studentId or cnic already exists
            const querySnapshot = await getDocs(addlistCollection);
            let isDuplicate = false;

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.studentId === studentId.value || data.cnic === cnic.value) {
                    isDuplicate = true;
                }
            });

            if (isDuplicate) {
                alert("Student with this ID or CNIC is already registered!");
            } else {
                // If no duplicate, add the student
                const obj = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    studentId: studentId.value,
                    cnic: cnic.value
                };
                const docRef = await addDoc(addlistCollection, obj);
                console.log("Added", docRef.id);
                getStudent();
            }
        } catch (e) {
            console.error("Error adding document:", e.message);
        }
    }

async function getStudent() {
    try {
        const querySnapshot = await getDocs(addlistCollection);
        user_list.innerHTML = ''; // Clear existing list
        querySnapshot.forEach((doc) => {
            const { firstName, lastName, email, studentId, cnic } = doc.data();
            const ele = `<h2>Student Information</h2>
    
            <div class="info-item">
                <span class="label">First Name:</span>
                <span class="value" id="firstName">${firstName}</span>
            </div>
            
            <div class="info-item">
                <span class="label">Last Name:</span>
                <span class="value" id="lastName">${lastName}</span>
            </div>
            
            <div class="info-item">
                <span class="label">Email:</span>
                <span class="value" id="email">${email}</span>
            </div>
            
            <div class="info-item">
                <span class="label">Student ID:</span>
                <span class="value" id="studentId">${studentId}</span>
            </div>
            
            <div class="info-item">
                <span class="label">CNIC:</span>
                <span class="value" id="cnic">${cnic}</span>
            </div>`
            // const ele = `<li id=${doc.id}><strong>${firstName} ${lastName}</strong><br>Email: ${email}<br>Student ID: ${studentId}<br>CNIC: ${cnic}
            //              </li>`;
            user_list.innerHTML += ele;
            console.log(firstName, lastName, email, studentId, cnic )
        });
    } catch (e) {
        console.error("Error getting documents:", e.message);
    }
}