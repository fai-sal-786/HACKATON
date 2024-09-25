import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your Firebase configuration and initialization
// const firebaseConfig = {
//      apiKey: "AIzaSyCl6RfAL7ZYJklKKEaXMhacF_2iBb7g19c",
//      authDomain: "hackathon-8896a.firebaseapp.com",
//      projectId: "hackathon-8896a",
//      storageBucket: "hackathon-8896a.appspot.com",
//      messagingSenderId: "7922859534",
//      appId: "1:7922859534:web:2326c367f836ef5e9c065f",
//      measurementId: "G-1ESVRC6VH1"
//  };

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const addMarksCollection = collection(db, "markslist");
const addlistCollection = collection(db, "addlist");

const resultDiv = document.getElementById("result");
btn.addEventListener("click", checkResult);
async function checkResult() {
    const studentIdValue = document.getElementById("studentId").value;
    const cnicValue = document.getElementById("cnic").value;

    // Check if student with provided CNIC exists in the addlistCollection
    const studentQuery = query(addlistCollection, where("cnic", "==", cnicValue), where("studentId", "==", studentIdValue));
    const studentSnapshot = await getDocs(studentQuery);

    // If no student with the provided CNIC and studentId exists, show an error message
    if (studentSnapshot.empty) {
        alert("Error: No student found with the provided CNIC and Student ID. Please enter valid details.");
        return;
    }

    // Proceed to fetch and display marks
    const marksQuery = query(addMarksCollection, where("cnic", "==", cnicValue), where("studentId", "==", studentIdValue));
    const marksSnapshot = await getDocs(marksQuery);

    if (marksSnapshot.empty) {
        resultDiv.innerHTML = "No marks found for the provided details.";
        return;
    }

    // Display student information and marks
    resultDiv.innerHTML = ""; // Clear previous results
    studentSnapshot.forEach((doc) => {
        const { firstName, lastName } = doc.data();
        resultDiv.innerHTML += `<h2>${firstName} ${lastName}</h2>`;
    });

    marksSnapshot.forEach((doc) => {
        const { course, obtained_marks, totalMarks, grade } = doc.data();
        let gradeStyle = "";
        if (grade.toLowerCase() === "pass") {
            gradeStyle = 'style="font-weight: bold; color: green; font-size: 1.2em;"'; // Pass styling
        } else {
            gradeStyle = 'style="font-weight: bold; color: red;  font-size: 1.2em;"'; // Fail styling
        }

        resultDiv.innerHTML += `<p>Course: ${course}<br>Obtained Marks: ${obtained_marks}<br>Total Marks: ${totalMarks}<br>Grade: <span ${gradeStyle}>${grade}</span></p>`;
    });
}




back_btn.addEventListener("click", res);

function res(){   
     window.location.href = "../student_portal/index.html";
}