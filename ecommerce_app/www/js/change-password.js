// Storage variables
var storage = window.localStorage;
var loggedInUser = JSON.parse(storage.getItem("loggedInUser"));

// Event listener when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Checks whether user is logged in
  if (loggedInUser) {
    // Redirects user to home screen if not logged in
    location.href = "index.html";
  }

  // Finds the change password button on the page
  var cpb = document.getElementById("change-password-button");

  // Adds an event handler to the change password button
  if (cpb) {
    cpb.addEventListener("click", changePasswordHandler);
  }
});

// Event handler when change password button is clicked
function changePasswordHandler(element) {
  try {
    // Form values
    var oldPassword = document.getElementById("change-password-old").value;
    var newPassword = document.getElementById("change-password-new").value;
    var confirmNewPassword = document.getElementById("change-password-confirm")
      .value;

    // Fetches the accounts table database
    var accountsFromLocalStorage = JSON.parse(storage.getItem("accounts"));

    // Boolean that will decide whether to be able to edit password or not
    var editPassword = true;

    // Checks if old password is blank
    if (oldPassword == "") {
      alert("Please enter your old password.");
      editPassword = false;
    }

    // Checks if new password is blank
    if (newPassword == "") {
      alert("Please enter your new password.");
      editPassword = false;
    }

    // Checks if confirm password is blank
    if (confirmNewPassword == "") {
      alert("Please enter your new password to confirm.");
      editPassword = false;
    }

    // Checks if password is the same with old password
    if (loggedInUser.password == oldPassword) {
      // Checks if all criteria is met and nothing is blank
      if (editPassword) {
        // Confirms if the new password is the same
        if (newPassword == confirmNewPassword) {
          // Checks whether password is strong or not
          if (StrengthChecker(newPassword)) {
            // Fetches the accounts database
            var accountsFromLocalStorage = JSON.parse(
              storage.getItem("accounts")
            );

            // Iterates through the accounts
            for (let i = 0; i < accountsFromLocalStorage.length; i++) {
              // Temporarily stores current account in loop in a variable
              var account = accountsFromLocalStorage[i];

              // Checks if the account is the same as logged in user
              if (account.id == loggedInUser.id) {
                // Sets the new password
                account.password = newPassword;

                // Replaces current data with new data
                accountsFromLocalStorage[i] = account;

                // Updates the accounts table on local storage
                storage.setItem(
                  "accounts",
                  JSON.stringify(accountsFromLocalStorage)
                );

                //Removes the old data from the accounts table in the local storage
                storage.removeItem("loggedInUser");
                alert(
                  "Successfully changed password. You will now be logged out."
                );

                // Redirects user to login page
                location.href = "login.html";
                break;
              }
            }
          } else {
            // Will display when new password is not strong enough
            alert(
              "Password should be minimum 8 characters and only characters A-Z, a-z and '-' are  acceptable for username."
            );
          }
        } else {
          // Will display when new and confirm password do not match
          alert("Passwords do not match.");
        }
      }
    } else {
      // Will display when old and new password do not match
      alert(
        "Your old password does not match with your current password. Please double check!"
      );
    }
  } catch (e) {
    alert(e);
  }
}

// Regex pattern for strong password
let strongPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);

// Regex pattern for medium password
let mediumPassword = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

// Checks string if it is a medium or strong password and returns a boolean
function StrengthChecker(PasswordParameter) {
  if (strongPassword.test(PasswordParameter)) {
    return true;
  } else if (mediumPassword.test(PasswordParameter)) {
    return true;
  } else {
    return false;
  }
}
