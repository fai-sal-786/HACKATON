// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs,query, where,} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



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

const addMarksCollection = collection(db, "markslist");
const addlistCollection = collection(db, "addlist");

const course = document.getElementById("course");
const studentId = document.getElementById("studentId");
const cnic = document.getElementById("cnic");
const obtained_marks = document.getElementById("obtained_marks");
const totalMarks = document.getElementById("totalMarks");
const grade = document.getElementById("grade");
const btn = document.getElementById("btn");
const back_btn =document.getElementById("back_btn");

back_btn.addEventListener("click", back);
function  back(){
    window.location.href="../admin/index.html"
}

btn.addEventListener("click", addMarks);
getmarks();
async function addMarks() {
    try {
        const cnicValue = cnic.value;
        const studentIdValue = studentId.value;

        // Check if student with provided CNIC exists in the addlistCollection
        const studentQuery = query(addlistCollection, where("cnic", "==", cnicValue), where("studentId", "==", studentIdValue));
        const studentSnapshot = await getDocs(studentQuery);

        // If no student with the provided CNIC and studentId exists, show an error message
        if (studentSnapshot.empty) {
            console.log("No student found with the provided CNIC and Student ID.");
            alert("Error: No student found with the provided CNIC and Student ID. Please enter valid details.");
            return;
        }

        // Check if marks are already uploaded for the same studentId and CNIC in the markslist collection
        const marksQuery = query(addMarksCollection, where("cnic", "==", cnicValue), where("studentId", "==", studentIdValue));
        const marksSnapshot = await getDocs(marksQuery);

        // If marks for this studentId and CNIC are already present, show an error message
        if (!marksSnapshot.empty) {
            console.log("Marks already uploaded for this student.");
            alert("Error: Marks have already been uploaded for this student. You cannot upload marks twice.");
            return;
        }

        // Proceed with adding marks if not already uploaded
        const obj = {
            course: course.value,
            studentId: studentIdValue,
            cnic: cnicValue,
            obtained_marks: obtained_marks.value,
            totalMarks: totalMarks.value,
            grade: grade.value
        };

        // Add marks to Firestore collection
        const docRef = await addDoc(addMarksCollection, obj);
        console.log("Marks added successfully", docRef.id);
        alert("Marks added successfully.");

        getmarks(); // Fetch and display updated list of student marks

    } catch (e) {
        console.error("Error adding document:", e.message);
        alert("Error: Could not add marks. Please try again.");

    }
}





async function getmarks() {
    try {
        const querySnapshot = await getDocs(addMarksCollection);
        user_list.innerHTML = ''; // Clear existing list
        querySnapshot.forEach((doc) => {
            const { course,  studentId, cnic, obtained_marks ,totalMarks, grade } = doc.data();
            const ele = ` <h2>Student Marks Sheet</h2>
    
    <div class="info-item">
        <span class="label">Course:</span>
        <span class="value" id="course">${course}</span>
    </div>
    
    <div class="info-item">
        <span class="label">Student ID:</span>
        <span class="value" id="studentId">${studentId}</span>
    </div>
    
    <div class="info-item">
        <span class="label">CNIC:</span>
        <span class="value" id="cnic">${cnic}</span>
    </div>
    
    <div class="info-item">
        <span class="label">Obtained Marks:</span>
        <span class="value" id="obtainedMarks">${obtained_marks}</span>
    </div>
    
    <div class="info-item">
        <span class="label">Total Marks:</span>
        <span class="value" id="totalMarks">${totalMarks}</span>
    </div>
    
    <div class="info-item">
        <span class="label">Grade:</span>
        <span class="value" id="grade">${grade}</span>
    </div>`

            user_list.innerHTML += ele;
            console.log( course,  studentId, obtained_marks,cnic,  totalMarks, grade )
        });
    } catch (e) {
        console.error("Error getting documents:", e.message);
    }
}


