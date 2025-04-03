     
// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }


  function irrupted() {
    window.location="communication/failed.html"

  }
  // Retrieve hardware and fingerprint values from the query parameters
let details = getQueryParam("details") ? getQueryParam("details")  :irrupted();
document.getElementById('checkID').textContent = details;
  // Create a new Date object
let currentDate = new Date();

// Get current date
let currentDateString = currentDate.toDateString();

// Get current time
let currentTimeString = currentDate.toLocaleTimeString();
let datenTime = currentDateString + " " + currentTimeString;
let sURL = "https://himmatnyp019.github.io/communication/success.html?hash="
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
      let supplyData = getFormData()
      return supplyData;
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
      // a: amount,
        a: amount + "_" + taxAmount +"_"+ transectionUuid +"_"+ secret+"_"+method  +"_"+datenTime +"_" + productName,
        d: details

    }
    
    return JSON.stringify(data);
};

let teraID = generateSignature();
let encoded = encodeURIComponent(teraID)
let finalUrl = `${sURL}${encoded}`;
document.getElementById("success_url").value= finalUrl;
