     
// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
//need to retrive uid along with other details but not done yet--------------------------------
  // Retrieve hardware and fingerprint values from the query parameters
const details = getQueryParam("details");
document.getElementById("supply").innerHTML = "This is supply " + details;
  // Create a new Date object
let currentDate = new Date();

// Get current date
let currentDateString = currentDate.toDateString();

// Get current time
let currentTimeString = currentDate.toLocaleTimeString();
let datenTime = currentDateString + " " + currentTimeString;


  // Function to auto-generate signature
function generateSignature() {
      var currentTime = new Date();
      var formattedTime = currentTime.toISOString().slice(2, 10).replace(/-/g, '') + '-' + currentTime.getHours() +
          currentTime.getMinutes() + currentTime.getSeconds();
      document.getElementById("transaction_uuid").value = formattedTime;

      var total_amount = document.getElementById("total_amount").value;
      var transaction_uuid = document.getElementById("transaction_uuid").value;
      var product_code = document.getElementById("product_code").value;
      var secret = "8gBm/:&EnhH.1/q";

      var hash = CryptoJS.HmacSHA256(
          `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
          `${secret}`);
      var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      document.getElementById("signature").value = hashInBase64;

      console.log("the data is " + getFormData())
  }

  // Event listeners to call generateSignature() when inputs are changed
  document.getElementById("total_amount").addEventListener("input", generateSignature);
  document.getElementById("transaction_uuid").addEventListener("input", generateSignature);
  document.getElementById("product_code").addEventListener("input", generateSignature);
  document.getElementById("secret").addEventListener("input", generateSignature);

function getFormData() {
    
    let amount = document.getElementById("amount").value;
    let taxAmount = document.getElementById("tax_amount").value;
    let totalAmount = document.getElementById("total_amount").value;
    let transectionUuid = document.getElementById("transaction_uuid").value;
    let productCode = document.getElementById("product_code").value;
    let signature = document.getElementById("signature").value;
    let secret = document.getElementById("secret").value;
    let method = "Esewa"
    let purpose = "study, education"
    let productName = "Online Course - GMEH"
    let currency = "Nepalese Rupeese"
    
    // all data collected upto here.
    // this functon should run after getting signature values
    // converting all strings into json format
    let data = {
        amount: amount,
        taxAmount : taxAmount,
        totalAmount:taxAmount,
        transectionUuid:transectionUuid,
        productCode:productCode,
        signature:signature,
        secret:secret,
        method:method,
        purpose:purpose,
        productName:productName,
        currency:currency,
        details:details,
        dateTime:datenTime

    }
    return JSON.stringify(data);
};

