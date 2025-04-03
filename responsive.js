import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref,onValue, set, get, child } 
from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";






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

   
function retriveSupplied(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
    
}
let sDetails = retriveSupplied("hash")
function empty() {
     window.location="https://himmatnyp019.github.io/communication/failed.html";
 

}


let id;


try {
    let parsify = JSON.parse(sDetails);
    
    if (parsify.hasOwnProperty("d")) {

        id = parsify.d ? parsify.d : empty();
        const path = "errorSubmit";
        const keyToCheck = id;
        checkChildKeyExists(db, path, keyToCheck);

    } else {
        console.log("Error not a valid json")
    }

    
} catch (e) {
    console.log("e errror : ", e)
}


function update(e) {
    try {
        set(ref(db, 'errorSubmit/' + id), {
            check: sDetails,
        })
        .then(() => {
            console.log("added succesfully");
            

        })
        .catch((error) => {
            alert("Error uploading data: " + error.message);

        });
    } catch (error) {
        alert("Unexpected error: " + error.message);
    }
};


function checkChildKeyExists(db, path, keyToCheck) {
    const dbRef = ref(db, path); 

    onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();

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





