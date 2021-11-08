// Storage variables
var storage = window.localStorage;

var loggedInUser;
var addressesFromLocalStorage = JSON.parse(storage.getItem("addresses"));
var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {});

// Onclick function ran when the next button is pressed in the order steps
function moveToStepTwo() {
  var name = document.getElementById("order-step1-name").value;
  var email = document.getElementById("order-step1-email").value;
  var phone = document.getElementById("order-step1-phone").value;
  var region = $("#order-step1-region :selected").text();
  var address = document.getElementById("order-step1-address").value;
  var zip = document.getElementById("order-step1-zip").value;

  var createAddress = true;
  if (name == "") {
    alert("Please provide a name.");
    createAddress = false;
  }
  if (email == "") {
    alert("Please provide an email address.");
    createAddress = false;
  }
  if (phone == "") {
    alert("Please provide a phone number.");
    createAddress = false;
  }
  if (region == "") {
    alert("Please provide a region.");
    createAddress = false;
  }
  if (address == "") {
    alert("Please provide an address.");
    createAddress = false;
  }
  if (zip == "") {
    alert("Please provide a zip code.");
    createAddress = false;
  }

  if (createAddress) {
    var data = {
      id: addressesFromLocalStorage.length + 1,
      account_id: loggedInUser.id,
      name: name,
      email: email,
      phone: phone,
      region: region,
      address: address,
      zip: zip,
    };

    addressesFromLocalStorage.push(data);
    // alert(JSON.stringify(addressesFromLocalStorage));
    storage.setItem("addresses", JSON.stringify(addressesFromLocalStorage));

    location.href = `order-step2.html?address_id=${data.id}`;
  }
}
