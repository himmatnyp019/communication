
function retriveSupplied(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
    
}
let sDetails = retriveSupplied("suppplydetails")
console.log(sDetails)
