// Storage variables
var storage = window.localStorage;

var loggedInUser;
var addressesFromLocalStorage = JSON.parse(storage.getItem("addresses"));
var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {});

// Onclick function ran when the next button is pressed in the order steps
function moveToStepTwo() {
  // Form values
  var name = document.getElementById("order-step1-name").value;
  var email = document.getElementById("order-step1-email").value;
  var phone = document.getElementById("order-step1-phone").value;
  var region = $("#order-step1-region :selected").text();
  var address = document.getElementById("order-step1-address").value;
  var zip = document.getElementById("order-step1-zip").value;

  // Boolean variable to decide whether the user be able to create a new address on the database
  var createAddress = true;

  // Checks if name field is blank
  if (name == "") {
    alert("Please provide a name.");
    createAddress = false;
  }
  // Checks if email field is not blank.
  if (email == "") {
    alert("Please provide an email address.");
    createAddress = false;
  }

  // Checks if phone field is blank
  if (phone == "") {
    alert("Please provide a phone number.");
    createAddress = false;
  }

  // Checks if region field is blank
  if (region == "") {
    alert("Please provide a region.");
    createAddress = false;
  }

  // Checks if address field is not blank.
  if (address == "") {
    alert("Please provide an address.");
    createAddress = false;
  }

  // Checks if zip field is blank
  if (zip == "") {
    alert("Please provide a zip code.");
    createAddress = false;
  }

  // Checks if all criteria is met
  if (createAddress) {
    // Prepares the data to be pushed to the database
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

    // Pushes the data to the table
    addressesFromLocalStorage.push(data);

    // Updates the addresses table in local storage
    storage.setItem("addresses", JSON.stringify(addressesFromLocalStorage));

    //Redirects the user to order-step2.html
    location.href = `order-step2.html?address_id=${data.id}`;
  }
}
