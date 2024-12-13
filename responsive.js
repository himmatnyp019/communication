
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref,onValue, set, get, child } 
from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

function retriveSupplied(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
    
}
let sDetails = retriveSupplied("hash")
console.log(sDetails)
let parsify = JSON.parse(sDetails)
const id = parsify.d;
console.log("imported-" + id)


// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyBndjXnSCIDEXaoErFPsoZmsiAxBUcUs14",
authDomain: "rent-zone.firebaseapp.com",
databaseURL: "https://rent-zone-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "rent-zone",
storageBucket: "rent-zone.appspot.com",
messagingSenderId: "40068147938",
appId: "1:40068147938:android:b38ed41a22ef426b450cbb",
measurementId: "G-N3FSTY2T1C"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get ref to database services
const db = getDatabase(app);

function update(e) {
    e.preventDefault();
    try {
        // Upload data to Firebase
        set(ref(db, 'errorSubmit/' + id), {
            check: sDetails,
        })
        .then(() => {
            // This will execute if the upload is successful
            
            

        })
        .catch((error) => {
            // This will execute if there's an error
            alert("Error uploading data: " + error.message);
        });
    } catch (error) {
        // Catch any synchronous errors
        alert("Unexpected error: " + error.message);
    }
};


// Add a listener to check if the child key exists
function checkChildKeyExists(db, path, keyToCheck) {
    const dbRef = ref(db, path); // Reference to the desired path in the database

    onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();

            // Check if the specific key exists in the data
            if (data.hasOwnProperty(keyToCheck)) {
             
            } else {
                // yeha nira chai hunuparxa code to upload in database
                update();
            }
        } else {
            
        }
    }, (error) => {
        console.error("Error checking key:", error);
        alert("Error checking key: " + error.message);
    });
}

// Example Usage
const path = "errorSubmit";
const keyToCheck = id; // Replace with your key
checkChildKeyExists(db, path, keyToCheck);
